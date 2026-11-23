import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Output,
  Input,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalCodebarreService } from '../modal-codebarre/modal-codebarre.service';

/**
 * Composant de scan continu de codes-barres et de QR codes.
 *
 * Redirigé vers le nouveau service Python `pythonCodeBarReader` (via `ModalCodebarreService`
 * et `GlobalVariables.apiPythonCodeBarReader`) en remplacement de l'ancien lecteur
 * local `@zxing/library`.
 *
 * Toutes les propriétés (`isCameraOpen`, `mediaStream`, `scannerSubscription`,
 * `autoCloseOnScan`) et méthodes (`createMediaStream`, `scanMultipleCodes`,
 * `stopScanner`, `closeScanner`, `handleScanResult`, `playBeep`) sont conservées
 * à l'identique pour ne casser aucun composant parent.
 */
@Component({
  selector: 'app-modal-codebarre-scan-continue',
  templateUrl: './modal-codebarre-scan-continue.component.html',
  styleUrls: ['./modal-codebarre-scan-continue.component.css'],
})
export class ModalCodebarreScanContinueComponent
  implements AfterViewInit, OnDestroy
{
  @ViewChild('video', { static: false }) video!: ElementRef;
  @Input() autoCloseOnScan: boolean = false;
  @Output() close = new EventEmitter<void>();

  // Variables d'état du scanner (noms conservés à l'identique)
  isCameraOpen = false;
  mediaStream: MediaStream | undefined;
  scannerSubscription: Subscription | undefined;
  scannedData: string | undefined;
  scannedDataList: string[] = [];

  // Canvas hors-écran utilisé pour extraire une frame JPEG du flux <video>
  private captureCanvas: HTMLCanvasElement | undefined;
  // Identifiant du temporisateur planifiant la prochaine capture de frame
  private scanTimeoutId: ReturnType<typeof setTimeout> | undefined;

  // Intervalles de capture (en millisecondes)
  private readonly FRAME_POLL_INTERVAL_MS = 300;
  private readonly CONTINUE_SCAN_DELAY_MS = 1500;
  private readonly ERROR_RETRY_DELAY_MS = 1500;

  constructor(private barService: ModalCodebarreService) {}

  ngAfterViewInit(): void {
    // État initial : la caméra reste fermée jusqu'à l'appel de createMediaStream()
  }

  /**
   * Ouvre le flux vidéo de la caméra utilisateur, initialise la session sur
   * l'API `pythonCodeBarReader` puis lance la boucle de lecture continue.
   */
  createMediaStream(): void {
    if (!this.isCameraOpen) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: 'environment' } })
          .then((stream) => {
            this.mediaStream = stream;
            if (this.video && this.video.nativeElement) {
              const videoEl: HTMLVideoElement = this.video.nativeElement;
              videoEl.srcObject = stream;
              videoEl.play().catch(() => {
                // La lecture automatique est déjà gérée par l'attribut HTML autoplay
              });
              this.isCameraOpen = true;

              // Initialise la session de scan côté serveur pythonCodeBarReader
              this.barService
                .createMediaStream(this.autoCloseOnScan, true)
                .subscribe({
                  error: (err) =>
                    console.warn(
                      'Impossible d’initialiser la session pythonCodeBarReader :',
                      err
                    ),
                });

              // Démarre la boucle de scan continu via l'API Python
              this.scanMultipleCodes();
            }
          })
          .catch((err) => {
            console.error('Error accessing camera: ', err);
          });
      }
    }
  }

  /**
   * Capture une frame depuis la balise `<video>` et l'envoie à l'endpoint
   * `/scanMultipleCodes` du service `pythonCodeBarReader`.
   *
   * - Si un code-barre ou QR code est détecté : diffuse le résultat via `handleScanResult`,
   *   joue le bip sonore, puis ferme le scanner (si `autoCloseOnScan`) ou attend 1500 ms
   *   avant le scan suivant.
   * - Si aucun code n'est détecté : capture la frame suivante après 300 ms tant que
   *   `isCameraOpen` est vrai.
   */
  scanMultipleCodes(): void {
    if (!this.isCameraOpen) {
      return;
    }

    const frameBase64 = this.captureVideoFrame();
    if (!frameBase64) {
      // Le flux vidéo n'est pas encore prêt : nouvel essai rapide
      this.scheduleNextScan(this.FRAME_POLL_INTERVAL_MS);
      return;
    }

    // Annule un éventuel appel HTTP précédent encore en cours
    if (this.scannerSubscription) {
      this.scannerSubscription.unsubscribe();
    }

    this.scannerSubscription = this.barService
      .scanMultipleCodes(frameBase64, this.autoCloseOnScan)
      .subscribe({
        next: (result) => {
          // Ignore la réponse si l'utilisateur a fermé la caméra entre-temps
          if (!this.isCameraOpen) {
            return;
          }

          if (result.detected && result.scannedData) {
            // Traitement du résultat scanné par le service Python
            this.scannedData = result.scannedData;
            this.scannedDataList.push(result.scannedData);
            this.handleScanResult(result.scannedData);
            this.playBeep();

            if (this.autoCloseOnScan) {
              this.stopScanner();
            } else if (this.isCameraOpen) {
              // Relance après un court délai (1500 ms) pour le scan continu
              this.scheduleNextScan(this.CONTINUE_SCAN_DELAY_MS);
            }
          } else if (this.isCameraOpen) {
            // Aucun code dans cette frame : analyse la frame suivante
            this.scheduleNextScan(this.FRAME_POLL_INTERVAL_MS);
          }
        },
        error: (err) => {
          console.error(
            'Error while scanning with pythonCodeBarReader:',
            err
          );
          if (this.isCameraOpen) {
            // Patiente avant de réessayer en cas d'indisponibilité temporaire de l'API
            this.scheduleNextScan(this.ERROR_RETRY_DELAY_MS);
          }
        },
      });
  }

  /**
   * Désactive complètement la caméra, annule les requêtes/temporisateurs actifs,
   * notifie l'arrêt au service `pythonCodeBarReader` et masque l'interface de scan.
   */
  stopScanner(): void {
    const wasOpen = this.isCameraOpen;
    this.isCameraOpen = false;

    // Annule toute planification de scan en attente
    if (this.scanTimeoutId !== undefined) {
      clearTimeout(this.scanTimeoutId);
      this.scanTimeoutId = undefined;
    }

    // Annule la requête HTTP de scan en cours si elle existe
    if (this.scannerSubscription) {
      this.scannerSubscription.unsubscribe();
      this.scannerSubscription = undefined;
    }

    // Informe le serveur Python de l'arrêt de la session uniquement si elle était active
    if (wasOpen) {
      this.barService.stopScanner().subscribe({
        error: (err) =>
          console.warn(
            'Erreur lors de l’arrêt du scanner pythonCodeBarReader :',
            err
          ),
      });
    }

    // Arrête toutes les pistes vidéo attachées à l'élément <video>
    const srcObject = this.video?.nativeElement?.srcObject as MediaStream | null;
    const tracks: MediaStreamTrack[] | undefined = srcObject?.getTracks();
    if (tracks) {
      tracks.forEach((track: MediaStreamTrack) => track.stop());
    }

    // Arrête toutes les pistes stockées dans mediaStream
    if (this.mediaStream) {
      this.mediaStream
        .getTracks()
        .forEach((track: MediaStreamTrack) => track.stop());
      this.mediaStream = undefined;
    }

    if (this.video?.nativeElement) {
      this.video.nativeElement.srcObject = null;
    }

    this.close.emit();
  }

  /**
   * Ferme le scanner (alias de `stopScanner`).
   */
  closeScanner(): void {
    this.stopScanner();
  }

  ngOnDestroy(): void {
    this.stopScanner();
  }

  /**
   * Transmet le code-barre / QR code lu à `ModalCodebarreService` afin d'alerter
   * les composants abonnés.
   */
  private handleScanResult(data: string): void {
    this.barService.setCode(data);
  }

  /**
   * Planifie le prochain appel à `scanMultipleCodes()` après `delayMs` millisecondes.
   */
  private scheduleNextScan(delayMs: number): void {
    if (this.scanTimeoutId !== undefined) {
      clearTimeout(this.scanTimeoutId);
    }
    this.scanTimeoutId = setTimeout(() => {
      this.scanTimeoutId = undefined;
      if (this.isCameraOpen) {
        this.scanMultipleCodes();
      }
    }, delayMs);
  }

  /**
   * Capture l'image courante affichée dans la balise `<video>` et la convertit
   * en Data URL JPEG Base64 prête à être envoyée au service `pythonCodeBarReader`.
   */
  private captureVideoFrame(): string | null {
    const videoEl: HTMLVideoElement | undefined = this.video?.nativeElement;
    if (
      !videoEl ||
      videoEl.readyState < 2 ||
      videoEl.videoWidth === 0 ||
      videoEl.videoHeight === 0
    ) {
      return null;
    }

    if (!this.captureCanvas) {
      this.captureCanvas = document.createElement('canvas');
    }

    this.captureCanvas.width = videoEl.videoWidth;
    this.captureCanvas.height = videoEl.videoHeight;

    const context = this.captureCanvas.getContext('2d');
    if (!context) {
      return null;
    }

    context.drawImage(
      videoEl,
      0,
      0,
      this.captureCanvas.width,
      this.captureCanvas.height
    );

    return this.captureCanvas.toDataURL('image/jpeg', 0.85);
  }

  /**
   * Génère un bref signal sonore (bip) pour confirmer la lecture réussie d'un code.
   */
  private playBeep(): void {
    try {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      oscillator.connect(audioContext.destination);
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        audioContext.close().catch(() => {});
      }, 200);
    } catch (e) {
      console.warn('Impossible de jouer le bip sonore :', e);
    }
  }
}

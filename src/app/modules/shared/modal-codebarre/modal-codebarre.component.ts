import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalCodebarreService } from './modal-codebarre.service';

/**
 * Composant modal Angular Material de scan de codes-barres et de QR codes
 * (mode scan unique ou scan multiple).
 *
 * Redirigé vers le service Python `pythonCodeBarReader` (via `ModalCodebarreService`
 * et `GlobalVariables.apiPythonCodeBarReader`) en remplacement de `@zxing/library`.
 */
@Component({
  selector: 'app-modal-codebarre',
  templateUrl: './modal-codebarre.component.html',
  styleUrls: ['./modal-codebarre.component.css'],
})
export class ModalCodebarreComponent implements AfterViewInit, OnDestroy {
  @ViewChild('video', { static: false }) video!: ElementRef;

  // Variables d'état conservées à l'identique
  scannedData: string | undefined = 'Scan';
  scannedDataList: string[] = [];
  isScanning: boolean = false;
  multipleScan: boolean;
  mediaStream: MediaStream | undefined;
  scannerSubscription: Subscription | undefined;

  // Outils internes pour la capture de frames vidéo et la planification des cycles
  private captureCanvas: HTMLCanvasElement | undefined;
  private scanTimeoutId: ReturnType<typeof setTimeout> | undefined;

  private readonly FRAME_POLL_INTERVAL_MS = 300;
  private readonly MULTIPLE_SCAN_DELAY_MS = 1000;
  private readonly ERROR_RETRY_DELAY_MS = 1500;

  constructor(
    private barService: ModalCodebarreService,
    @Inject(MAT_DIALOG_DATA) data: any,
    private dialogRef: MatDialogRef<ModalCodebarreComponent>
  ) {
    this.multipleScan = data?.multipleScan ?? false;
  }

  ngAfterViewInit(): void {
    this.toggleScanner();
  }

  ngOnDestroy(): void {
    this.stopScanner();
  }

  /**
   * Bascule le scanner entre l'état actif et l'état arrêté.
   * À l'activation, ouvre le flux caméra puis démarre `scanMultipleCodes()` ou `scanCode()`.
   */
  toggleScanner(): void {
    this.isScanning = !this.isScanning;
    if (this.isScanning) {
      this.createMediaStream();
    } else {
      this.stopScanner();
    }
  }

  /**
   * Ouvre la caméra du navigateur, initialise la session sur `pythonCodeBarReader`
   * et lance le mode de scan approprié (`multipleScan` ou scan unique).
   */
  createMediaStream(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          if (!this.isScanning) {
            stream.getTracks().forEach((track) => track.stop());
            return;
          }

          this.mediaStream = stream;
          if (this.video && this.video.nativeElement) {
            const videoEl: HTMLVideoElement = this.video.nativeElement;
            videoEl.srcObject = stream;
            videoEl.play().catch(() => {});

            // Initialise la session côté pythonCodeBarReader
            this.barService
              .createMediaStream(!this.multipleScan, this.multipleScan)
              .subscribe({
                error: (err) =>
                  console.warn(
                    'Impossible d’initialiser la session pythonCodeBarReader :',
                    err
                  ),
              });

            if (this.multipleScan) {
              this.scanMultipleCodes();
            } else {
              this.scanCode();
            }
          }
        })
        .catch((err) => {
          console.error('Error accessing camera: ', err);
          this.isScanning = false;
        });
    } else {
      console.error('MediaDevices API non disponible dans ce navigateur.');
      this.isScanning = false;
    }
  }

  /**
   * Mode scan unique : capture des frames vidéo et interroge `/scanCode` sur
   * `pythonCodeBarReader` jusqu'à lecture d'un code, puis ferme la fenêtre modale.
   */
  scanCode(): void {
    if (!this.isScanning) {
      return;
    }

    const frameBase64 = this.captureVideoFrame();
    if (!frameBase64) {
      this.scheduleNextSingleScan(this.FRAME_POLL_INTERVAL_MS);
      return;
    }

    if (this.scannerSubscription) {
      this.scannerSubscription.unsubscribe();
    }

    this.scannerSubscription = this.barService.scanCode(frameBase64).subscribe({
      next: (result) => {
        if (!this.isScanning) {
          return;
        }

        if (result.detected && result.scannedData) {
          this.scannedData = result.scannedData;
          this.handleScanResult(result.scannedData);
          this.playBeep(); // Joue un bip sonore après le scan
          this.stopScanner();
          this.dialogRef.close(); // Ferme la fenêtre modale
        } else if (this.isScanning) {
          this.scheduleNextSingleScan(this.FRAME_POLL_INTERVAL_MS);
        }
      },
      error: (err) => {
        console.error(
          'Error while scanning with pythonCodeBarReader: ',
          err
        );
        if (this.isScanning) {
          this.scheduleNextSingleScan(this.ERROR_RETRY_DELAY_MS);
        }
      },
    });
  }

  /**
   * Mode scan multiple : capture des frames vidéo et interroge `/scanMultipleCodes`
   * sur `pythonCodeBarReader` en continu, avec un délai entre chaque code lu.
   */
  scanMultipleCodes(): void {
    if (!this.isScanning) {
      return;
    }

    const frameBase64 = this.captureVideoFrame();
    if (!frameBase64) {
      this.scheduleNextMultipleScan(this.FRAME_POLL_INTERVAL_MS);
      return;
    }

    if (this.scannerSubscription) {
      this.scannerSubscription.unsubscribe();
    }

    this.scannerSubscription = this.barService
      .scanMultipleCodes(frameBase64, false)
      .subscribe({
        next: (result) => {
          if (!this.isScanning) {
            return;
          }

          if (result.detected && result.scannedData) {
            this.scannedData = result.scannedData;
            this.handleScanResult(result.scannedData);
            this.scannedDataList.push(result.scannedData);
            this.playBeep();
            this.stopScannerForDelay();
          } else if (this.isScanning) {
            this.scheduleNextMultipleScan(this.FRAME_POLL_INTERVAL_MS);
          }
        },
        error: (err) => {
          console.error(
            'Error while scanning with pythonCodeBarReader: ',
            err
          );
          if (this.isScanning) {
            this.scheduleNextMultipleScan(this.ERROR_RETRY_DELAY_MS);
          }
        },
      });
  }

  /**
   * Attend un court délai (1000 ms) avant de relancer la détection en mode multiple.
   */
  stopScannerForDelay(): void {
    this.scheduleNextMultipleScan(this.MULTIPLE_SCAN_DELAY_MS);
  }

  /**
   * Arrête le scanner, libère les pistes vidéo de la caméra et informe `pythonCodeBarReader`.
   */
  stopScanner(): void {
    const wasScanning = this.isScanning;
    this.isScanning = false;

    if (this.scanTimeoutId !== undefined) {
      clearTimeout(this.scanTimeoutId);
      this.scanTimeoutId = undefined;
    }

    if (this.scannerSubscription) {
      this.scannerSubscription.unsubscribe();
      this.scannerSubscription = undefined;
    }

    if (wasScanning) {
      this.barService.stopScanner().subscribe({
        error: (err) =>
          console.warn(
            'Erreur lors de l’arrêt du scanner pythonCodeBarReader :',
            err
          ),
      });
    }

    const srcObject = this.video?.nativeElement?.srcObject as MediaStream | null;
    const tracks: MediaStreamTrack[] | undefined = srcObject?.getTracks();
    if (tracks) {
      tracks.forEach((track: MediaStreamTrack) => track.stop());
    }

    if (this.mediaStream) {
      this.mediaStream
        .getTracks()
        .forEach((track: MediaStreamTrack) => track.stop());
      this.mediaStream = undefined;
    }

    if (this.video?.nativeElement) {
      this.video.nativeElement.srcObject = null;
    }
  }

  /**
   * Transmet le code scanné à `ModalCodebarreService`.
   */
  handleScanResult(scannedData: string): void {
    this.barService.setCode(scannedData);
  }

  /**
   * Génère un bip sonore de confirmation à l'aide de la Web Audio API.
   */
  playBeep(): void {
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

  /**
   * Arrête le scanner et ferme la boîte de dialogue Angular Material.
   */
  closeModal(): void {
    this.stopScanner();
    this.dialogRef.close();
  }

  /**
   * Planifie le prochain cycle de scan unique.
   */
  private scheduleNextSingleScan(delayMs: number): void {
    if (this.scanTimeoutId !== undefined) {
      clearTimeout(this.scanTimeoutId);
    }
    this.scanTimeoutId = setTimeout(() => {
      this.scanTimeoutId = undefined;
      if (this.isScanning) {
        this.scanCode();
      }
    }, delayMs);
  }

  /**
   * Planifie le prochain cycle de scan multiple.
   */
  private scheduleNextMultipleScan(delayMs: number): void {
    if (this.scanTimeoutId !== undefined) {
      clearTimeout(this.scanTimeoutId);
    }
    this.scanTimeoutId = setTimeout(() => {
      this.scanTimeoutId = undefined;
      if (this.isScanning) {
        this.scanMultipleCodes();
      }
    }, delayMs);
  }

  /**
   * Capture une frame depuis la balise `<video>` en Base64 JPEG pour l'API Python.
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
}

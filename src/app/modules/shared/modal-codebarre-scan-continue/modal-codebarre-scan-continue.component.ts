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
import { BrowserMultiFormatReader, DecodeHintType } from '@zxing/library';
import { Subscription } from 'rxjs';
import { ModalCodebarreService } from '../modal-codebarre/modal-codebarre.service';

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

  isCameraOpen = false;
  mediaStream: MediaStream | undefined;
  scannerSubscription: Subscription | undefined;
  private codeReader: BrowserMultiFormatReader = new BrowserMultiFormatReader(undefined, 500);

  constructor(private barService: ModalCodebarreService) {}

  ngAfterViewInit(): void {
    // Initial state: camera is closed until createMediaStream() is called
  }

  // Ouvre le flux vidéo et lance la lecture des codes-barres
  createMediaStream(): void {
    if (!this.isCameraOpen) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: { facingMode: 'environment' } })
          .then((stream) => {
            this.mediaStream = stream;
            if (this.video && this.video.nativeElement) {
              this.video.nativeElement.srcObject = stream;
              this.isCameraOpen = true;
              this.scanMultipleCodes();
            }
          })
          .catch((err) => {
            console.error('Error accessing camera: ', err);
          });
      }
    }
  }

  scanMultipleCodes(): void {
    const hints = new Map<DecodeHintType, any[]>();
    hints.set(DecodeHintType.TRY_HARDER, [true]);
    this.codeReader.hints = hints;

    this.codeReader
      .decodeFromInputVideoDevice(undefined, this.video.nativeElement)
      .then((result) => {
        // Traitement du résultat scanné
        this.handleScanResult(result.getText());
        this.playBeep();
        if (this.autoCloseOnScan) {
          this.stopScanner();
        } else if (this.isCameraOpen) {
          // Relance après un court délai pour scan continu
          setTimeout(() => {
            if (this.isCameraOpen) {
              this.scanMultipleCodes();
            }
          }, 1500);
        }
      })
      .catch((err) => {
        console.error('Error while scanning:', err);
      });
  }

  // Désactive complètement la caméra et masque l'interface de scan
  stopScanner(): void {
    this.isCameraOpen = false;
    if (this.codeReader) {
      try {
        this.codeReader.reset();
      } catch (e) {
        console.warn('Error resetting codeReader', e);
      }
    }
    const tracks: MediaStreamTrack[] | null =
      this.video?.nativeElement?.srcObject?.getTracks();
    if (tracks) {
      tracks.forEach((track: MediaStreamTrack) => track.stop());
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      this.mediaStream = undefined;
    }
    if (this.video?.nativeElement) {
      this.video.nativeElement.srcObject = null;
    }
    this.close.emit();
  }

  closeScanner(): void {
    this.stopScanner();
  }

  ngOnDestroy(): void {
    this.stopScanner();
  }

  private handleScanResult(data: string): void {
    this.barService.setCode(data);
  }

  private playBeep(): void {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.connect(audioContext.destination);
    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
    }, 200);
  }
}

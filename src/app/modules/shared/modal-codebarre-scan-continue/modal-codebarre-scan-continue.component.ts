import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/library';
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
  scannedData: string | undefined = 'Scan';
  isCameraOpen: boolean = false;
  mediaStream: MediaStream | undefined;
  scannerSubscription: Subscription | undefined;

  constructor(private barService: ModalCodebarreService) {}

  ngAfterViewInit(): void {
    console.log('helllllloooo');
  }

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
    const codeReader = new BrowserMultiFormatReader();
    codeReader
      .decodeFromInputVideoDevice(undefined, this.video.nativeElement)
      .then((result) => {
        this.handleScanResult(result.getText());
        this.playBeep();
        setTimeout(() => {
          this.scanMultipleCodes();
        }, 3000);
      })
      .catch((err) => {
        console.error('Error while scanning: ', err);
        setTimeout(() => {
          this.scanMultipleCodes();
        }, 3000);
      });
  }

  stopScanner(): void {
    this.isCameraOpen = false;
  }

  ngOnDestroy(): void {
    // Unsubscribe from the scanner when the component is destroyed
    this.stopScanner();
  }

  handleScanResult(data: string): void {
    this.scannedData = data;
    // You can use this.scannedData as needed in your application

    this.barService.setCode(this.scannedData);
    console.log('Scaaaaan', this.scannedData);
  }
  playBeep(): void {
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

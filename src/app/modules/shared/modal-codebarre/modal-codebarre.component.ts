import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
  Inject,
} from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/library';
import { ModalCodebarreService } from './modal-codebarre.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-codebarre',
  templateUrl: './modal-codebarre.component.html',
  styleUrls: ['./modal-codebarre.component.css'],
})
export class ModalCodebarreComponent implements AfterViewInit {
  @ViewChild('video', { static: false }) video!: ElementRef;
  multiple_scan: boolean = false;
  scannedData: string | undefined = 'Scan';
  isScanning: boolean = false;

  constructor(private barService: ModalCodebarreService) {
    //@Inject(MAT_DIALOG_DATA) data:any ) {
    //this.multiple_scan= data.useFirstLogic;
  }

  private scannerActivated: boolean = false;

  ngAfterViewInit(): void {
    this.toggleScanner();
  }

  ngOnInit(): void {
    const tmp = this.barService.getCode().subscribe((dt) => {
      this.scannedData = dt || 'Scan';
      console.log('hell');
    });
  }

  toggleScanner(): void {
    this.isScanning = !this.isScanning;

    if (this.isScanning) {
      this.scanCode();
    } else {
      this.stopScanner();
    }
  }

  startScanner(): void {
    if (!this.scannerActivated) {
      this.scannerActivated = true;
      this.toggleScanner();
    }
  }

  scanCode(): void {
    const codeReader = new BrowserMultiFormatReader();
    codeReader
      .decodeFromInputVideoDevice(undefined, this.video.nativeElement)
      .then((result) => {
        this.handleScanResult(result.getText());
        this.playBeep(); // Play beep sound after each scan
        this.isScanning = true;
      })
      .catch((err) => {
        console.error('Error while scanning: ', err);
        this.isScanning = false;
        // setTimeout(() => {}, 1000);
      });

    if (this.multiple_scan) {
      this.scanCode();
    }
  }

  stopScanner(): void {
    // Implement any logic needed to stop the current scanner
    // For now, just toggle the scanning state
    this.isScanning = false;
  }

  handleScanResult(scannedData: string): void {
    //this.scannedData = data;
    this.barService.setCode(scannedData);
    console.log('Scaaaaan', scannedData);
  }

  playBeep(): void {
    // Create an audio context
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    // Create an oscillator
    const oscillator = audioContext.createOscillator();

    // Connect the oscillator to the audio context's destination (speakers)
    oscillator.connect(audioContext.destination);

    // Start the oscillator (sound)
    oscillator.start();

    // Stop the oscillator after a short duration (adjust as needed)
    setTimeout(() => {
      oscillator.stop();
    }, 200); // 200 milliseconds
  }

  ring() {
    alert('ringing,,,');
  }
}

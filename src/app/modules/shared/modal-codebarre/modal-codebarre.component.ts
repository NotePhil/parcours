import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/library';
import { ModalCodebarreService } from './modal-codebarre.service';


@Component({
  selector: 'app-modal-codebarre',
  templateUrl: './modal-codebarre.component.html',
  styleUrls: ['./modal-codebarre.component.css']
})
export class ModalCodebarreComponent {
  @ViewChild('video', { static: false }) video!: ElementRef;
  scannedData: string|undefined="Scan";
  isScanning: boolean = false;

  constructor(private barService:ModalCodebarreService) {}

  ngAfterViewInit(): void {
    // Scanner initialization can be moved here if needed
  }
  
  ngOnInit(): void {
    const tmp = this.barService.getCode().subscribe(dt=>{ this.scannedData=dt||"Scan"; console.log("hell") ;
    })
  }

  toggleScanner(): void {
    this.isScanning = !this.isScanning;

    if (this.isScanning) {
      const codeReader = new BrowserMultiFormatReader();
      codeReader.decodeFromInputVideoDevice(undefined, this.video.nativeElement)
      .then((result) => {
        this.handleScanResult(result.getText());
        this.isScanning=!this.isScanning
      })
      .catch((err) => {
        console.error('Error while scanning: ', err);
      });
    }
  }


  startScanner(): void {
    //this.isScannerActive = true;


    // Ensure that the video element is available in the DOM
    //if (this.isScannerActive) {
    if (this.video && this.isScanning) {
      const codeReader = new BrowserMultiFormatReader();
      codeReader
        .decodeFromInputVideoDevice(undefined, this.video.nativeElement)
        .then((result) => {
          this.handleScanResult(result.getText());
          this.toggleScanner();
        })
        .catch((err) => {
          console.error('Error while scanning: ', err);
          this.toggleScanner();
        });

        
    }
  }


  handleScanResult(scannedData: string): void {
    //this.scannedData = data;
    this.barService.setCode(scannedData)
    console.log("Scaaaaan",scannedData);
    
  }

  ring(){
    alert("ringing,,,")
  }

}

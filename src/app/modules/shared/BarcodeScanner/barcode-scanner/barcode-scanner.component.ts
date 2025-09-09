// import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { Html5Qrcode } from 'html5-qrcode';

// @Component({
//   selector: 'app-barcode-scanner',
//   standalone: true,
//   imports: [],
//   templateUrl: './barcode-scanner.component.html',
//   styleUrl: './barcode-scanner.component.scss'
// })
// export class BarcodeScannerComponent implements OnInit, OnDestroy {
//   @ViewChild('reader', { static: true }) readerElem!: ElementRef;
//   html5QrCode!: Html5Qrcode;
//   result = '';

//   ngOnInit() {
//     this.html5QrCode = new Html5Qrcode(this.readerElem.nativeElement.id);
//     this.html5QrCode.start(
//       { facingMode: 'environment' },
//       { fps: 10, qrbox: 250 },
//       (decodedText, decodedResult) => {
//         this.result = decodedText;
//         this.playBeep();
//       },
//       (error) => {
//         // Ignore decode errors
//       }
//     );
//   }

//   stop() {
//     this.html5QrCode?.stop().then(() => this.html5QrCode.clear());
//   }

//   playBeep() {
//     new Audio('assets/beep.mp3').play();
//   }

//   ngOnDestroy() {
//     this.stop();
//   }
// }

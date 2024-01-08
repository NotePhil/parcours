import { Component } from '@angular/core';
import { ModalCodebarreComponent } from '../modal-codebarre/modal-codebarre.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-codebarre-dialog',
  templateUrl: './modal-codebarre-dialog.component.html',
  styleUrls: ['./modal-codebarre-dialog.component.css'],
})
export class ModalCodebarreDialogComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(ModalCodebarreComponent, {
      height: '380px',
      width: '500px',
    });
  }
}

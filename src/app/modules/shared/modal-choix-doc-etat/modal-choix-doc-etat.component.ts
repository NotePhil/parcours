import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Import MatDialogRef
import { IDocument } from 'src/app/modele/document';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal-choix-doc-etat',
  templateUrl: './modal-choix-doc-etat.component.html',
  styleUrls: ['./modal-choix-doc-etat.component.css'],
})
export class ModalChoixDocEtatComponent {
  checkedCount: number = 0;
  formeDocument: FormGroup;
  @Output() saveChanges: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { documentChoisi: IDocument },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalChoixDocEtatComponent> // Inject MatDialogRef
  ) {
    this.formeDocument = this.fb.group({});
  }

  onCheckboxChange(event: any, etat: any): void {
    etat.checked = event.checked;
    if (event.checked) {
      this.checkedCount++;
    } else {
      this.checkedCount--;
    }
  }

  isCheckboxDisabled(etat: any): boolean {
    return this.checkedCount === 1 && !etat.checked;
  }

  onCancel(): void {
    this.formeDocument.reset();
    this.data.documentChoisi.DocEtats.forEach((etat: any) => {
      etat.checked = false;
    });
    this.dialogRef.close();
  }

  onSave(): void {
    const selectedEtat = this.data.documentChoisi.DocEtats.find(
      (etat: any) => etat.checked
    );
    if (selectedEtat) {
      this.data.documentChoisi.DocEtats = [selectedEtat];
      console.log('update', selectedEtat);

      // Emitting the updated document with only the selected etat
      this.saveChanges.emit([selectedEtat.etat.libelle]);
    }
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data.documentChoisi);
  }
}

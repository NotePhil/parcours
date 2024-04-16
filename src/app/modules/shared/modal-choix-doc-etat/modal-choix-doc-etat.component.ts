import { Component, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDocument } from 'src/app/modele/document';
import { FormBuilder, FormGroup } from '@angular/forms';

interface DialogData {
  documentChoisi: IDocument;
  selectedEtat?: string;
}

@Component({
  selector: 'app-modal-choix-doc-etat',
  templateUrl: './modal-choix-doc-etat.component.html',
  styleUrls: ['./modal-choix-doc-etat.component.css'],
})
export class ModalChoixDocEtatComponent {
  selectedEtatsMap: { [key: string]: string } = {};
  checkedCount: number = 0;
  formeDocument: FormGroup;
  selectedEtat: string = '';
  @Output() saveChanges: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Input() previouslySelectedEtat: string | undefined; // Input to receive the previously selected etat

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalChoixDocEtatComponent>
  ) {
    this.formeDocument = this.fb.group({});
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

  onSave(documentId: string): void {
    const selectedEtat = this.selectedEtatsMap[documentId];

    if (selectedEtat) {
      this.saveChanges.emit([selectedEtat]);
    }
    this.dialogRef.close();
  }

  onRadioChange(etat: any, documentId: string): void {
    // Uncheck all etats first
    this.data.documentChoisi.DocEtats.forEach((etat: any) => {
      etat.checked = false;
    });

    // Check the selected etat
    etat.checked = true;
    this.selectedEtatsMap[documentId] = etat.etat.libelle;
  }

  ngOnInit(): void {
    this.selectedEtat = this.previouslySelectedEtat || ''; // Set the selected etat when component initializes
  }
}

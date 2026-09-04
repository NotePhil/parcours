import { Component, Inject, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDocument } from 'src/app/modele/document';
import { IDocEtats } from 'src/app/modele/doc-etats';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { DocumentService } from 'src/app/services/documents/document.service';

interface DialogData {
  EtatsChoisi?: IDocEtats[];
  documentChoisi: IDocument;
  selectedEtat?: IDocEtats;
}

@Component({
  selector: 'app-modal-choix-doc-etat',
  templateUrl: './modal-choix-doc-etat.component.html',
  styleUrls: ['./modal-choix-doc-etat.component.scss'],
})
export class ModalChoixDocEtatComponent implements OnInit {
  selectedEtatsMap: IDocEtats | undefined;
  formeEtat: FormGroup;
  selectedEtat: string | undefined;
  previouslySelectedEtat: IDocEtats | undefined; // Input pour recevoir les etats pre-selectionees

  // Liste des etats selectionnes pour alimenter le deuxieme tableau des resultats
  selectedEtatsList: IDocEtats[] = [];
  // Liste des etats disponibles du document pour le premier tableau
  etatsChoisiList: IDocEtats[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private servicedonneechange: DonneesEchangeService,
    private documentService: DocumentService, // Inject DocumentService
    public dialogRef: MatDialogRef<ModalChoixDocEtatComponent>
  ) {
    this.formeEtat = this.fb.group({});
  }

  onCancel(): void {
    this.formeEtat.reset();
    this.dialogRef.close();
  }

  /**
   * Enregistre l'etat selectionne dans le service d'echange et ferme la modale en retournant l'objet selectionne
   */
  onSave(): void {
    let selectedEtat = this.selectedEtatsMap;

    if (selectedEtat) {
      this.servicedonneechange.saveEtatModal(selectedEtat);
    }
    // Fermeture de la modale en renvoyant l'objet etat selectionne a la modale appelante
    this.dialogRef.close(selectedEtat);
  }

  /**
   * Action declenchee lors du choix d'un etat via bouton radio dans le 1er tableau
   * Met a jour l'etat selectionne et alimente le deuxieme tableau des resultats
   */
  onRadioChange(etat: IDocEtats): void {
    this.selectedEtatsMap = etat;
    // Mise a jour de la liste des etats selectionnes a afficher dans le 2eme tableau
    this.selectedEtatsList = [etat];
  }

  ngOnInit(): void {
    // Initialisation de la liste des etats disponibles depuis les donnees passees a la modale ou depuis le document choisi
    this.etatsChoisiList = this.data.EtatsChoisi || this.data.documentChoisi?.docEtats || [];

    // Charge l'état précédemment sélectionné depuis DocumentService si disponible
    if (this.data.documentChoisi && this.data.documentChoisi.idDocument) {
      this.selectedEtat = this.documentService.getSelectedEtat(
        this.data.documentChoisi.idDocument!
      );
    }

    // Si un etat est passe initialement ou pre-selectionne, alimenter le 2eme tableau
    if (this.data.selectedEtat) {
      this.selectedEtatsMap = this.data.selectedEtat;
      this.selectedEtatsList = [this.data.selectedEtat];
    } else if (this.etatsChoisiList.length > 0 && this.selectedEtat) {
      // Recherche de l'etat correspondant au libelle pre-enregistre
      const found = this.etatsChoisiList.find(e => e.etat && e.etat.libelle === this.selectedEtat);
      if (found) {
        this.selectedEtatsMap = found;
        this.selectedEtatsList = [found];
      }
    }
  }
}
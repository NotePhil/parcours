import { Component, Inject, Output, EventEmitter, Input, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDocument } from 'src/app/modele/document';
import { IDocEtats } from 'src/app/modele/doc-etats';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { DocumentService } from 'src/app/services/documents/document.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
export class ModalChoixDocEtatComponent implements OnInit, AfterViewInit {
  selectedEtatsMap: IDocEtats | undefined;
  formeEtat: FormGroup;
  selectedEtat: string | undefined;
  previouslySelectedEtat: IDocEtats | undefined; // Input pour recevoir les etats pre-selectionees

  @ViewChildren(MatPaginator) paginators!: QueryList<MatPaginator>;

  // Liste des etats selectionnes pour alimenter le deuxieme tableau des resultats
  selectedEtatsList = new MatTableDataSource<IDocEtats>();
  // Liste des etats disponibles du document pour le premier tableau
  etatsChoisiList = new MatTableDataSource<IDocEtats>();

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
    this.selectedEtatsList.data = [etat];
  }

  ngOnInit(): void {
    // Initialisation de la liste des etats disponibles depuis les donnees passees a la modale ou depuis le document choisi
    this.etatsChoisiList.data = this.data.EtatsChoisi || this.data.documentChoisi?.docEtats || [];

    const docId = (this.data as any).documentId || this.data.documentChoisi?.idDocument || this.data.documentChoisi?.id;

    // Si les états ne sont pas encore chargés dans l'objet document, chargement via DocumentService
    if ((!this.etatsChoisiList.data || this.etatsChoisiList.data.length === 0) && docId) {
      this.documentService.getDocumentById(docId).subscribe(doc => {
        if (doc && doc.docEtats) {
          this.etatsChoisiList.data = doc.docEtats;
          this.checkPreselectedEtat();
        }
      });
    }

    // Charge l'état précédemment sélectionné depuis DocumentService si disponible
    if (docId) {
      this.selectedEtat = this.documentService.getSelectedEtat(docId);
    }

    this.checkPreselectedEtat();
  }

  private checkPreselectedEtat() {
    if (this.data?.selectedEtat) {
      this.selectedEtatsMap = this.data.selectedEtat;
      this.selectedEtatsList.data = [this.data.selectedEtat];
    } else if (this.etatsChoisiList.data.length > 0 && this.selectedEtat) {
      const found = this.etatsChoisiList.data.find(e => e.etat && e.etat.libelle === this.selectedEtat);
      if (found) {
        this.selectedEtatsMap = found;
        this.selectedEtatsList.data = [found];
      }
    }
  }

  ngAfterViewInit() {
    this.paginators.changes.subscribe(() => this.assignPaginators());
    this.assignPaginators();
  }

  private assignPaginators() {
    const paginatorArray = this.paginators.toArray();
    if (paginatorArray.length > 0) {
      this.etatsChoisiList.paginator = paginatorArray[0];
    }
  }
}
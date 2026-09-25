import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IDocument } from 'src/app/modele/document';
import { IDocumentsAssocies } from 'src/app/modele/documents-associes';
import { IEtats } from 'src/app/modele/etats';
import { DocumentService } from 'src/app/services/documents/document.service';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { ModalChoixDocEtatComponent } from '../modal-choix-doc-etat/modal-choix-doc-etat.component';
import { Observable, mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-modal-choix-sous-document',
  templateUrl: './modal-choix-sous-document.component.html',
  styleUrls: ['./modal-choix-sous-document.component.scss'],
})
export class ModalChoixSousDocumentComponent implements OnInit {
  formeDocument: FormGroup;
  // MODIFICATION: Stockage des etats associes sous forme d'objet IEtats par ID de document
  associedEtatsMap: { [documentId: string]: IEtats } = {};
  // Stockage du libelle de l'etat pour affichage dans la colonne etat du tableau
  selectedEtatsMap: { [documentId: string]: string } = {};
  myControl = new FormControl<string | IDocument>('');
  ELEMENTS_TABLE_DOCUMENTS: IDocument[] = [];
  ELEMENTS_TABLE_DOCUMENTS_TEMP: IDocument[] = []; // Stockage temporaire pour la selection des documents
  filteredOptions: IDocument[] | undefined;
  displayedDocumentsColumns: string[] = ['actions', 'titre', 'description'];
  documentIds: string[];
  displayedDocumentsColumnsOnSelect: string[] = ['actions', 'titre', 'description', 'etat'];

  dataSourceDocument = new MatTableDataSource<IDocument>(this.ELEMENTS_TABLE_DOCUMENTS);
  dataSourceDocumentResultat = new MatTableDataSource<IDocument>();
  idDocument!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private serviceDocument: DocumentService,
    private dialogRef: MatDialogRef<ModalChoixSousDocumentComponent>,
    private donneeDocCatService: DonneesEchangeService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formeDocument = this.formBuilder.group({});
    this.documentIds = this.data?.documentIds ?? [];
  }

  // Annuler et fermer la boîte de dialogue
  onCancel() {
    this.ELEMENTS_TABLE_DOCUMENTS = [];
    this.ELEMENTS_TABLE_DOCUMENTS_TEMP = [];
    this.dialogRef.close();
  }

  /**
   * MODIFICATION: Ouvrir le modal pour choisir l'état d'un sous-document
   * Transmet le document choisi et la liste de ses etats.
   * Utilise panelClass 'modal-choix-doc-etat-pane' pour que la modale d'etat s'ouvre au premier plan.
   */
  openModal(documentChoisi: IDocument) {
    const docId = documentChoisi.idDocument || documentChoisi.id;
    const dialogRef = this.dialog.open(ModalChoixDocEtatComponent, {
      width: '600px',
      panelClass: 'modal-choix-doc-etat-pane', // Positionne la modale d'etat au-dessus de la modale de choix de document
      hasBackdrop: true,
      data: {
        documentChoisi: documentChoisi,
        EtatsChoisi: documentChoisi.docEtats || [], // Transmission des etats du sous-document
        documentId: docId,
        selectedEtat: docId && this.associedEtatsMap[docId] ? { etat: this.associedEtatsMap[docId] } : undefined
      },
    });

    dialogRef.afterClosed().subscribe((selectedEtat: any) => {
      if (selectedEtat) {
        if (docId) {
          // MODIFICATION: Affectation de l'objet IEtats au document selectionne
          const iEtat: IEtats | undefined = selectedEtat.etat ? selectedEtat.etat : (selectedEtat.libelle ? selectedEtat : undefined);
          if (iEtat) {
            this.associedEtatsMap[docId] = iEtat;
            this.selectedEtatsMap[docId] = iEtat.libelle || '';
          } else if (typeof selectedEtat === 'string') {
            this.selectedEtatsMap[docId] = selectedEtat;
            this.associedEtatsMap[docId] = { libelle: selectedEtat, description: '', dateCreation: new Date() };
          }
          this.serviceDocument.setSelectedEtat(docId, this.selectedEtatsMap[docId]);
        }

        // Sauvegarde de l'etat selectionne dans le service de donnees d'echange
        this.donneeDocCatService.saveEtatModal(selectedEtat);
      }
      this.populateSelectedEtatsMap();
    });
  }

  ngOnInit(): void {
    this.getAllDocument().subscribe((valeurs) => {
      this.dataSourceDocument.data = valeurs;
      this.filteredOptions = valeurs;
    });

    // MODIFICATION: Chargement des documents associes preexistants a partir de dataDocumentRessourcesAttributs / dataDocumentDocumentsAssocies
    const sourceAssoc = this.donneeDocCatService.dataDocumentRessourcesAttributs || this.donneeDocCatService.dataDocumentDocumentsAssocies;
    if (sourceAssoc && Array.isArray(sourceAssoc)) {
      this.ELEMENTS_TABLE_DOCUMENTS_TEMP = [];
      sourceAssoc.forEach((item: any) => {
        // Extraction du document (compatibilite objet IDocumentsAssocies ou IDocument direct)
        const doc: IDocument = item.document ? item.document : item;
        const docId = doc?.idDocument || doc?.id || item.id;
        if (doc && docId) {
          const exists = this.ELEMENTS_TABLE_DOCUMENTS_TEMP.some(d => (d.idDocument || d.id) === docId);
          if (!exists) {
            this.ELEMENTS_TABLE_DOCUMENTS_TEMP.push(doc);
          }
          // Stockage de l'etat associe preexistant
          if (item.etat) {
            const etatObj: IEtats = item.etat.etat ? item.etat.etat : item.etat;
            this.associedEtatsMap[docId] = etatObj;
            this.selectedEtatsMap[docId] = etatObj.libelle || '';
          }
        }
      });
    } else {
      this.ELEMENTS_TABLE_DOCUMENTS_TEMP = [];
    }

    this.dataSourceDocumentResultat.data = [...this.ELEMENTS_TABLE_DOCUMENTS_TEMP];
    this.populateSelectedEtatsMap();

    if (this.documentIds && this.documentIds.length > 0) {
      this.loadDocuments(this.documentIds);
    }
  }

  // Charger les documents par leurs IDs
  loadDocuments(documentIds: string[]) {
    const documentObservables: Observable<IDocument>[] = documentIds.map((idDocument) =>
      this.serviceDocument.getDocumentById(idDocument)
    );
    of(...documentObservables)
      .pipe(mergeMap((obs) => obs))
      .subscribe((document) => {
        if (document) {
          const docId = document.idDocument || document.id;
          // MODIFICATION: Ajout dans ELEMENTS_TABLE_DOCUMENTS_TEMP si absent pour ne pas perdre la sélection
          const exists = this.ELEMENTS_TABLE_DOCUMENTS_TEMP.some(d => (d.idDocument || d.id) === docId);
          if (!exists) {
            this.ELEMENTS_TABLE_DOCUMENTS_TEMP.push(document);
          }
          this.ELEMENTS_TABLE_DOCUMENTS = [...this.ELEMENTS_TABLE_DOCUMENTS_TEMP];
          this.dataSourceDocumentResultat.data = [...this.ELEMENTS_TABLE_DOCUMENTS_TEMP];
          this.populateSelectedEtatsMap();
        }
      });
  }

  // Remplir la carte des états sélectionnés
  private populateSelectedEtatsMap() {
    this.dataSourceDocumentResultat.data.forEach((element: IDocument) => {
      const docId = element.idDocument || element.id;
      if (docId) {
        if (this.associedEtatsMap[docId] && this.associedEtatsMap[docId].libelle) {
          this.selectedEtatsMap[docId] = this.associedEtatsMap[docId].libelle;
        } else {
          const etat = this.serviceDocument.getSelectedEtat(docId);
          if (etat) {
            this.selectedEtatsMap[docId] = etat;
          }
        }
      }
    });
  }

  // Gérer le changement de sélection de document
  onCheckDocumentChange(event: any) {
    let listidDocumentTemp: string[] = [];
    let positionsDocument = new Map();
    let indexDocumentCourant: number = 0;
    this.ELEMENTS_TABLE_DOCUMENTS_TEMP.forEach((element: IDocument) => {
      const docId = element.idDocument || element.id;
      if (docId) {
        listidDocumentTemp.push(docId);
        positionsDocument.set(docId, indexDocumentCourant++);
      }
    });
    if (event.target.checked) {
      if (this.idDocument && !listidDocumentTemp.includes(this.idDocument)) {
        this.ajoutSelectionDocument(this.idDocument);
      }
    } else {
      if (this.idDocument && listidDocumentTemp.includes(this.idDocument)) {
        const index = positionsDocument.get(this.idDocument);
        if (index !== undefined) {
          this.retirerSelectionDocument(index);
        }
      }
    }
  }

  // Obtenir l'ID du document sélectionné
  getDocumentId(idDocument: string) {
    this.idDocument = idDocument;
  }

  // Ajouter un document à la sélection
  ajoutSelectionDocument(idDocument: string) {
    this.serviceDocument.getDocumentById(idDocument).subscribe((val) => {
      if (val) {
        this.ELEMENTS_TABLE_DOCUMENTS_TEMP.push(val);
        this.dataSourceDocumentResultat.data = [...this.ELEMENTS_TABLE_DOCUMENTS_TEMP];
      }
    });
  }

  // Retirer un document de la sélection
  retirerSelectionDocument(index: number) {
    const docRetire = this.ELEMENTS_TABLE_DOCUMENTS_TEMP[index];
    if (docRetire) {
      const docId = docRetire.idDocument || docRetire.id;
      if (docId) {
        delete this.associedEtatsMap[docId];
        delete this.selectedEtatsMap[docId];
      }
    }
    this.ELEMENTS_TABLE_DOCUMENTS_TEMP.splice(index, 1);
    this.dataSourceDocumentResultat.data = [...this.ELEMENTS_TABLE_DOCUMENTS_TEMP];
  }

  // Obtenir tous les documents
  private getAllDocument() {
    return this.serviceDocument.getAllDocuments();
  }

  // Fonction pour afficher le titre du document dans l'autocomplete
  displayFn(preco: IDocument): string {
    return preco && preco.titre ? preco.titre : '';
  }

  ngAfterViewInit() {
    this.dataSourceDocument.paginator = this.paginator;
    this.dataSourceDocument.sort = this.sort;
  }

  // Rechercher des documents par titre
  public rechercherListingDocuments(option: IDocument) {
    this.serviceDocument
      .getDocumentByTitre(option.titre.toLowerCase())
      .subscribe((valeurs) => {
        this.dataSourceDocument.data = valeurs;
      });
  }

  // Annoncer le changement de tri
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      // Annonce de changement de tri
    } else {
      // Annonce de tri réinitialisé
    }
  }

  // Vérifier si un document est sélectionné
  isDocumentSelected(documentId: string): boolean {
    if (!documentId) return false;
    // MODIFICATION: Vérification flexible par idDocument ou id
    return this.ELEMENTS_TABLE_DOCUMENTS_TEMP.some((doc) => (doc.idDocument || doc.id) === documentId);
  }

  /**
   * MODIFICATION: Sauvegarder les changements: forme les objets IDocumentsAssocies avec le document et l'etat choisi,
   * puis affecte le tableau resultat a dataDocumentRessourcesAttributs qui sera utilise dans le formulaire de document.
   */
  onSave() {
    // MODIFICATION: Construction du tableau d'objets IDocumentsAssocies
    const resultDocumentsAssocies: IDocumentsAssocies[] = this.ELEMENTS_TABLE_DOCUMENTS_TEMP.map((doc) => {
      const docId = doc.idDocument || doc.id || '';
      const etatAssocie = this.associedEtatsMap[docId];
      return {
        id: docId,
        document: doc,
        etat: etatAssocie
      };
    });

    // MODIFICATION: Affectation du resultat du tableau final a dataDocumentRessourcesAttributs et dataDocumentDocumentsAssocies
    this.donneeDocCatService.dataDocumentRessourcesAttributs = resultDocumentsAssocies;
    this.donneeDocCatService.dataDocumentDocumentsAssocies = resultDocumentsAssocies;

    // Fermeture de la modale en renvoyant le tableau des documents associes
    this.dialogRef.close(resultDocumentsAssocies);
  }
}


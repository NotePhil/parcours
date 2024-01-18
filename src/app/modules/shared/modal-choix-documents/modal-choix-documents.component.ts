import { Component,Inject, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { IDocument } from 'src/app/modele/document';
import { DocumentService } from 'src/app/services/documents/document.service';


@Component({
  selector: 'app-modal-choix-documents',
  templateUrl: './modal-choix-documents.component.html',
  styleUrls: ['./modal-choix-documents.component.scss']
})
export class ModalChoixDocumentsComponent implements OnInit {

  // variables attributs, pour afficher le tableau d'attributs sur l'IHM
  formeDocument: FormGroup;
  myControl = new FormControl<string | IDocument>('');
  ELEMENTS_TABLE_DOCUMENTS: IDocument[] = [];
  filteredOptions: IDocument[] | undefined;
  displayedDocumentsColumns: string[] = [
    'actions',
    'titre',
    'etat'
  ]; // structure du tableau presentant les attributs
  dataSourceDocument = new MatTableDataSource<IDocument>(
    this.ELEMENTS_TABLE_DOCUMENTS
  );
  dataSourceDocumentResultat = new MatTableDataSource<IDocument>();
  idDocument: string = '';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private infosPath: ActivatedRoute,
    private serviceDocument: DocumentService,
    private _liveAnnouncer: LiveAnnouncer,
    private donneeEtapCatService:DonneesEchangeService,
    private dialogDef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.formeDocument= this.formBuilder.group({});
    }


    ngOnInit(): void {
      this.getAllDocuments().subscribe((valeurs) => {
        this.dataSourceDocument.data = valeurs;
      });
      this.dataSourceDocumentResultat.data = this.donneeEtapCatService.dataEtapeDocuments
      this.myControl.valueChanges.subscribe((value) => {
        const titre = typeof value === 'string' ? value : value?.titre;
        if (titre!= undefined && titre?.length > 0) {
          this.serviceDocument
            .getDocumentByTitre(titre.toLowerCase() as string)
            .subscribe((reponse) => {
              this.filteredOptions = reponse;
            });
        } else {
          this.filteredOptions = [];
        }
      });
    }


    onCheckDocumentChange(event: any) {
      let listIdDocTemp : string[] = []
      let positionsDocu = new Map()
      let indexDocuCourant : number = 0
      this.donneeEtapCatService.dataEtapeDocuments.forEach(
        (element: IDocument) => {
          listIdDocTemp.push(element.id)
          positionsDocu.set(element.id, indexDocuCourant++)
      });
      if (event.target.checked) {
        if (!listIdDocTemp.includes(this.idDocument)) {
          this.ajoutSelectionDocument(this.idDocument);
        }
      } else {
        if (listIdDocTemp.includes(this.idDocument)) {
          const index = positionsDocu.get(this.idDocument)
          this.retirerSelectionDocument(index);
        }
      }
    }

    getDocumentId(idDocument: string) {
      this.idDocument = idDocument;
    }

    ajoutSelectionDocument(idDocument: string) {
      this.serviceDocument.getDocumentById(idDocument).subscribe((val) => {
        this.ELEMENTS_TABLE_DOCUMENTS= this.dataSourceDocumentResultat.data;
        this.ELEMENTS_TABLE_DOCUMENTS.push(val);
        this.dataSourceDocumentResultat.data = this.ELEMENTS_TABLE_DOCUMENTS;
        this.donneeEtapCatService.dataEtapeDocuments = this.ELEMENTS_TABLE_DOCUMENTS;
      });
    }

    retirerSelectionDocument(index: number) {
      this.ELEMENTS_TABLE_DOCUMENTS = this.dataSourceDocumentResultat.data;
      this.ELEMENTS_TABLE_DOCUMENTS.splice(index, 1); // je supprime un seul element du tableau a la position 'index'
      this.dataSourceDocumentResultat.data = this.ELEMENTS_TABLE_DOCUMENTS;
      this.donneeEtapCatService.dataEtapeDocuments = this.ELEMENTS_TABLE_DOCUMENTS;
    }
    private getAllDocuments() {
      return this.serviceDocument.getAllDocuments();
    }
    displayFn(documen: IDocument): string {
      return documen && documen.titre ? documen.titre : '';
    }

    ngAfterViewInit() {
      this.dataSourceDocument.paginator = this.paginator;
      this.dataSourceDocument.sort = this.sort;
    }

    public rechercherListingDocument(option: IDocument) {
      this.serviceDocument
        .getDocumentByTitre(option.titre.toLowerCase())
        .subscribe((valeurs) => {
          this.dataSourceDocument.data = valeurs;
        });
    }

    announceSortChange(sortState: Sort) {
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }

  }



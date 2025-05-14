import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { IEtape } from 'src/app/modele/etape';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { EtapesService } from 'src/app/services/etapes/etapes.service';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { IDocument } from 'src/app/modele/document';
import { ModalChoixSousDocumentComponent } from '../../shared/modal-choix-sous-document/modal-choix-sous-document.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalEtapesPreorsuivParcoursComponent } from '../../shared/modal-etapes-preorsuiv-parcours/modal-etapes-preorsuiv-parcours.component';
import { IParours } from 'src/app/modele/parours';

@Component({
  selector: 'app-new-etape',
  templateUrl: './new-etape.component.html',
  styleUrls: ['./new-etape.component.scss'],
})
export class NewEtapeComponent implements OnInit {
[x: string]: any;
  // : IEtape |undefined;
  forme: FormGroup;
  btnLibelle: string = 'Ajouter';
  submitted: boolean = false;
  titre: string = '';
  documents: IDocument[] = [];
  etapes: IEtape[] = [];
  documentId: string[] = [];
  etapeId: string[] | undefined = [];

  etape: IEtape = {
    id: '',
    libelle: '',
    etat: false,
    document: [],
    etapeprecedant: []
  };
      etapeControl = new FormControl<string | IEtape>('');
      filteredOptions: IEtape[] | undefined;
      ELEMENTS_TABLE_PAR_ETAPES: IEtape[] | undefined = [];
      localElementTableParEtapes: IEtape[] = []; // Local variable to hold the changes
  // variables Document, pour afficher le tableau d'Document sur l'IHM
  ELEMENTS_TABLE_DOCUMENTS: IDocument[] = [];
  dataSourceDocument = new MatTableDataSource<IDocument>(
    this.ELEMENTS_TABLE_DOCUMENTS
  );
  dataSourceDocumentResultat = new MatTableDataSource<IDocument>();

  ELEMENTS_TABLE_CATEGORIES: IDocument[] = []; //tableau de listing des Document a affecter a chaque categorie

  //tableau contenent les sous documents
  ELEMENTS_TABLE_SOUS_DOCUMENTS: IDocument[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private formBuilder: FormBuilder,
    private etapeService: EtapesService,
    private router: Router,
    private infosPath: ActivatedRoute,
    private datePipe: DatePipe,
    private dialogDef: MatDialog,
    private donneeDocCatService: DonneesEchangeService,
    private dialogRef: MatDialogRef<NewEtapeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.forme = this.formBuilder.group({
      libelle: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ],
      ],
      etat: [true],
      documents: [[]],
      etapesprecedant: new FormControl<string | IEtape[]>(''),
    });
  }

  closeDialog() {
    this.dialogRef.close(); // close the dialog
  }

  ngOnInit() {
    let idEtape = this.data?.idEtape;
    let parcour : IParours = this.data.parcours;
    this.etapeService.getAllEtapes().subscribe(
      (resultat) => {
        this.filteredOptions = resultat;
      }
    );
    this.ELEMENTS_TABLE_PAR_ETAPES = parcour?.etape;
    this.localElementTableParEtapes = [...this.ELEMENTS_TABLE_PAR_ETAPES]; // Initialize the local variable with the existing data

    if (idEtape != null && idEtape !== '') {
      this.btnLibelle = 'Modifier';

      //trouver un autre moyen d'initialiser avec des valeurs
      this.etapeService.getEtapeById(idEtape).subscribe((x) => {
        console.log('x', x);

        this.etape = x;
        this.documents = this.etape.document;
        this.etapes = this.etape.etapeprecedant!;
        this.donneeDocCatService.dataParcoursEtapes = this.etape.etapeprecedant!;

        this.forme.patchValue({
          libelle: this.etape.libelle,
          etat: this.etape.etat,
          etapePrecedant: this.etape.etapeprecedant
        });
        this.forme.controls['etapesprecedant'].setValue(this.etape.etapeprecedant);
        this.etapeId = this.etape.etapeprecedant?.map((etape) => etape.id);
        this.documentId = this.etape.document.map((doc) => doc.idDocument);
      });
    } else {
      this.donneeDocCatService.dataParcoursEtapes = [];
    }
  }

  get f() {
    return this.forme.controls;
  }

  compareItem(etape1: IEtape, etape2: IEtape) {
      return etape2 && etape1
        ? etape2.id === etape1.id
        : etape2 === etape1;
    }

  effaceEtapeCourrant(etape: IEtape): IEtape[] {
    let etapesFinal: IEtape[] = [];
    this.localElementTableParEtapes.forEach(
      element => {
        if (etape.libelle != element.libelle) {
          etapesFinal.push(element);
        }
      }
    );
    return etapesFinal;
  }

  /**
   * Methode permettant d'ouvrir la modal permettant d'associer des sous documents au document
   */
  openSousDocumentDialog() {
    const dialogConfig = new MatDialogConfig();

    if (this.documentId.length > 0) {
      dialogConfig.data = { documentIds: this.documentId };
    }
    console.log('Preparing to open dialog with document IDs:', this.documentId);

      (dialogConfig.width = '90%'),
      (dialogConfig.height = '90%'),
      (dialogConfig.enterAnimationDuration = '1000ms'),
      (dialogConfig.exitAnimationDuration = '1000ms');

    const dialogRef = this.dialogDef.open(
      ModalChoixSousDocumentComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.documents = this.donneeDocCatService.dataDocumentSousDocuments;

      if (this.documents.length > 0) {
        this.documentId = this.documents.map((doc) => doc.idDocument);
      }
    });
  }

  /**
   * Methode permettant d'ouvrir la modal permettant d'associer des sous documents au document
   */
  openEtapePrecedantDialog() {
    const dialogConfig = new MatDialogConfig();

    (dialogConfig.width = '80%'),
    (dialogConfig.height = '80%'),
    (dialogConfig.enterAnimationDuration = '1000ms'),
    (dialogConfig.exitAnimationDuration = '1000ms');

    const dialogRef = this.dialogDef.open(
      ModalEtapesPreorsuivParcoursComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.etapes = this.donneeDocCatService.dataParcoursEtapes;

      if (this.etapes.length > 0) {
        this.etapeId = this.etapes.map((etape) => etape.id);
      }
    });
  }

  closeModal() {
    // Reset document selection array
    this.dialogRef.close();
  }

  onSubmit() {
    this.submitted = true;
    // Validate form
    if (this.forme.invalid) return;

    // Create etape object
    const etapeTemp = {
      id: uuidv4(),
      libelle: this.f['libelle'].value,
      etat: this.f['etat'].value,
      document: this.documents,
      etapeprecedant: this.f['etapesprecedant'].value
    };

    // If updating existing etape, set its id
    if (this.etape.id != '') {
      etapeTemp.id = this.etape.id;
    }
    console.log('etapeTemp', etapeTemp);

    this.etapeService.ajouterEtape(etapeTemp).subscribe(() => {
      this.dialogRef.close(etapeTemp);
    });
  }
}

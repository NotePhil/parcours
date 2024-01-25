import { DatePipe } from '@angular/common';
import { Component, OnInit , ViewChild} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Observable, EMPTY } from 'rxjs';
import { IEtape } from 'src/app/modele/etape';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { EtapesService } from 'src/app/services/etapes/etapes.service';
import {v4 as uuidv4} from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentService } from 'src/app/services/documents/document.service';
import { ModalChoixDocumentsComponent } from '../../shared/modal-choix-documents/modal-choix-documents.component';
import { IDocument } from 'src/app/modele/document';
import { ModalChoixSousDocumentComponent } from '../../shared/modal-choix-sous-document/modal-choix-sous-document.component';

@Component({
  selector: 'app-new-etape',
  templateUrl: './new-etape.component.html',
  styleUrls: ['./new-etape.component.scss']
})
export class NewEtapeComponent implements OnInit {
  // : IEtape |undefined;
  forme: FormGroup;
  btnLibelle: string="Ajouter";
  submitted: boolean=false;
  titre:string=''

  etape : IEtape = {
    id: '',
    libelle: '',
    etat: false,
    document: [],

  };
   // variables Document, pour afficher le tableau d'Document sur l'IHM
   ELEMENTS_TABLE_DOCUMENTS: IDocument[] = [];
   dataSourceDocument = new MatTableDataSource<IDocument>(this.ELEMENTS_TABLE_DOCUMENTS);
   dataSourceDocumentResultat = new MatTableDataSource<IDocument>();

  ELEMENTS_TABLE_CATEGORIES: IDocument[] = []; //tableau de listing des Document a affecter a chaque categorie

   //tableau contenent les sous documents
   ELEMENTS_TABLE_SOUS_DOCUMENTS: IDocument[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private formBuilder:FormBuilder, private etapeService:EtapesService,private dataEnteteMenuService:DonneesEchangeService,private router:Router, private infosPath:ActivatedRoute, private datePipe: DatePipe,
    private serviceDocument:DocumentService,private dialogDef : MatDialog,private donneeDocCatService:DonneesEchangeService,) {
    this.forme = this.formBuilder.group({
      libelle: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      etat: [true],
      _documents :  new FormArray([]),
    })
  }

  ngOnInit() {
    let idEtape= this.infosPath.snapshot.paramMap.get('idEtape');
    if((idEtape != null) && idEtape!==''){

      this.btnLibelle="Modifier";


      //trouver un autre moyen d'initialiser avec des valeurs
      this.etapeService.getEtapeById(idEtape).subscribe(x =>
      {
        this.etape = x;
        this.forme.setValue({
          libelle: this.etape.libelle,
          etat:this.etape. etat,
          _documents: []
        })

        // Initialisation du tableau d'attributs du document
        this.ELEMENTS_TABLE_DOCUMENTS = this.etape.document

      });
    }
    this.titre=this.dataEnteteMenuService.dataEnteteMenu
  }


  get f(){
    return this.forme.controls;
  }

 /**
   * Methode permettant d'ouvrir la modal permettant d'associer des sous documents au document
   */
 openSousDocumentDialog(){

  const dialogRef = this.dialogDef.open(ModalChoixSousDocumentComponent,
  {
    maxWidth: '100vw',
    maxHeight: '100vh',
    width:'100%',
    height:'100%',
    enterAnimationDuration:'1000ms',
    exitAnimationDuration:'1000ms',
    data:{}
  }
  )

  dialogRef.afterClosed().subscribe(result => {
    this.ELEMENTS_TABLE_SOUS_DOCUMENTS = this.donneeDocCatService.dataDocumentSousDocuments
  });
}


  onSubmit(etapeInput:any){
    this.submitted=true;
    //Todo la validation d'element non conforme passe
    if(this.forme.invalid) return;

    let etapeTemp : IEtape={
      id: uuidv4(),
      libelle:etapeInput.libelle,
      etat:etapeInput.etat,
      document: [],
    }

    if(this.etape.id != ""){
      etapeTemp.id = this.etape.id
    }

    this.ELEMENTS_TABLE_DOCUMENTS.forEach(
      d => etapeTemp.document.push(d)
    )
   /* if(this.etape != undefined){
      etapeTemp.id = this.etape.id
    }*/
    this.etapeService.ajouterEtape(etapeTemp).subscribe(
      object => {
        this.router.navigate(['/list-etapes']);
      }
    )
    this.donneeDocCatService.dataDocumentDocuments = []
  }

}

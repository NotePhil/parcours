import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEtape } from 'src/app/modele/etape';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { EtapesService } from 'src/app/services/etapes/etapes.service';
import {v4 as uuidv4} from 'uuid';
import { MatDialog } from '@angular/material/dialog';
import { IMission } from 'src/app/modele/mission';
import { MatTableDataSource } from '@angular/material/table';
import { MissionsService } from 'src/app/services/missions/missions.service';
import { DocumentService } from 'src/app/services/documents/document.service';
import { ModalChoixDocumentsComponent } from '../../shared/modal-choix-documents/modal-choix-documents.component';
import { IDocument } from 'src/app/modele/document';

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
        //this.ELEMENTS_TABLE_DOCUMENTS = this.etape.document

      });
    }
    this.titre=this.dataEnteteMenuService.dataEnteteMenu
  }


  get f(){
    return this.forme.controls;
  }

  openDocumentDialog(){
    const dialogRef = this.dialogDef.open(ModalChoixDocumentsComponent,
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

    /*dialogRef.afterClosed().subscribe(result => {
      this.ELEMENTS_TABLE_MISSION =  this.donneeDocCatService.dataEtapeMissions
    });*/
  }




  /**
   * methode qui permet de fusionner les categories en fontion du meme nom tout en regroupant leurs attributs
   * ceci permet de former le tableau d'objets ICategoriesAttriut qui sera rattache au document lors de l'enregistrement
   */
  /*syntheseCategorieAttribut(){
    let tmpCatAtt = new Map();
    let categorieAttributsFinal : ICategoriesAttributs[] = [];

    //récupération des données du service
    this.TABLE_CATEGORIE_AFFICHAGE_TEMPO = this.donneeDocCatService.dataDocumentCategorie;
    this.TABLE_CATEGORIE_AFFICHAGE_TEMPO.forEach(
      objet => {
        let categorieAttributTemp : ICategoriesAttributs = {
          id: '',
          nom: '',
          ordre: 0,
          listAttributsParCategories: []
        }
          //si la map ne contient pas la catégorie courante
          if(tmpCatAtt.get(objet.nom)== null){
            categorieAttributTemp.id = objet.id;
            categorieAttributTemp.nom = objet.nom;
            categorieAttributTemp.ordre = objet.ordre;
            categorieAttributTemp.listAttributsParCategories.push(objet.attributCategories);

            // sauvegarde de l'indice de l'élément enregistré
            let index : number  = categorieAttributsFinal.push(categorieAttributTemp);
            tmpCatAtt.set(objet.nom, index-1);
          }
          else{
            //si la valeur est trouvée dans la map
            let index : number = tmpCatAtt.get(objet.nom); // récuperation de l'indice de l'élément enregistré
            categorieAttributTemp = categorieAttributsFinal[index];
            categorieAttributTemp.listAttributsParCategories.push(objet.attributCategories);
            categorieAttributsFinal[index] = categorieAttributTemp;
          }
        }
    );
      this.TABLE_CATEGORIE_AFFICHAGE_TEMP = categorieAttributsFinal;
  }*/

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

    /*this.ELEMENTS_TABLE_MISSION.forEach(
      m => etapeTemp.missions.push(m)
    )*vrai/
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

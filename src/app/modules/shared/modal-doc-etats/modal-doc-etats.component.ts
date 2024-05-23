import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IDocEtats } from 'src/app/modele/doc-etats';
import { IEtats } from 'src/app/modele/etats';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { EtatService } from 'src/app/services/etats/etats.service';
import { ModalRoleValidationComponent } from '../modal-role-validation/modal-role-validation.component';
import { IValidation } from 'src/app/modele/validation';

@Component({
  selector: 'app-modal-doc-etats',
  templateUrl: './modal-doc-etats.component.html',
  styleUrls: ['./modal-doc-etats.component.scss']
})
export class ModalDocEtatsComponent implements OnInit{
  formeDocEtats: FormGroup;
  etatControl = new FormControl<string | IEtats>('');
  filteredOptions: IEtats[] | undefined;
  ELEMENTS_TABLE_DOC_ETATS: IDocEtats[] = [];
  dataSourceDocEtats = new MatTableDataSource<IDocEtats>(this.ELEMENTS_TABLE_DOC_ETATS);
  displayedDocEtatsColumns: string[] = [
    'actions',
    'libelle',
    'ordre',
    'validation',
    'EtatPrecedant'
  ]; // structure du tableau presentant les doc etats
  selected: boolean=false;
  changeOrdreValeur: boolean=false;
  ordreExiste: boolean=false;
  etatExiste: boolean=false;
  idDOCEtat : string = ""
  plusPetitOrdre : number = 0
  
  constructor(
    private serviceEtat: EtatService,
    private _liveAnnouncer: LiveAnnouncer,
    private formBuilder: FormBuilder,
    private donneeDocEtatService:DonneesEchangeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router:Router, private dialogDef : MatDialog
  ) {
      this.formeDocEtats = this.formBuilder.group({
        ordreDocEtats: ['', [Validators.required, Validators.minLength(1)]],
      });
    }

  ngOnInit(): void {
    this.serviceEtat.getAllEtats().subscribe(
      (resultat) =>{
        this.filteredOptions = resultat
      }
    )
    this.ELEMENTS_TABLE_DOC_ETATS = this.donneeDocEtatService.dataDocumentEtats;
    this.dataSourceDocEtats.data = this.ELEMENTS_TABLE_DOC_ETATS;
    
    if (this.ELEMENTS_TABLE_DOC_ETATS.length > 0) {
      this.recherchePPO(this.ELEMENTS_TABLE_DOC_ETATS)
    }

    this.etatControl.valueChanges.subscribe((value) => {
      const libelle = typeof value === 'string' ? value : value?.libelle;
      if (libelle != undefined && libelle?.length > 0) {
        this.serviceEtat
          .getEtatByLibelle(libelle.toLowerCase() as string)
          .subscribe((reponse) => {
            this.filteredOptions = reponse;
          });
      } else {
        this.filteredOptions = [];
        this.serviceEtat.getAllEtats().subscribe(
          (resultat) =>{
            this.filteredOptions = resultat
          }
        )
      }
    });
  }

  public rechercherListingEtat(option: IEtats) {
    this.selected = true;
    this.ordreExiste = false;
    this.etatExiste = false;
    let tabIdEtats : string[] = []
    this.ELEMENTS_TABLE_DOC_ETATS.forEach(
      docEtat => {
        if ((docEtat.etat.id == option.id) ) {
          tabIdEtats.push(docEtat.etat.id)
        }
    });
    let ordre : number = this.formeDocEtats.controls["ordreDocEtats"].value

    for (let index = 0; index < this.ELEMENTS_TABLE_DOC_ETATS.length; index++) {
      const element = this.ELEMENTS_TABLE_DOC_ETATS[index];
      if (element.ordre == ordre) {
        this.ordreExiste = true;
        break
      }
      if (element.etat.id == option.id) {
        this.etatExiste = true;
        break
      }
    }
    if ((!tabIdEtats.includes(option.id) && !this.ordreExiste) && (ordre != undefined && ordre != 0 && ordre > 0 )) {
      let docEtat : IDocEtats = {
        id: option.id,
        etat: option,
        ordre: ordre,
        dateCreation: new Date()
      }
      this.ELEMENTS_TABLE_DOC_ETATS.push(docEtat)
      this.dataSourceDocEtats.data = this.ELEMENTS_TABLE_DOC_ETATS
      this.selected=false;
      this.recherchePPO(this.ELEMENTS_TABLE_DOC_ETATS)
    }
  }

  public verificationChangementOrdre(option: IDocEtats, event: any, cpt:number) {
    this.changeOrdreValeur = true;
    this.ordreExiste = false
    let oldVal = option.ordre;
    for (let index = 0; index < this.ELEMENTS_TABLE_DOC_ETATS.length; index++) {
      if (cpt!=index && this.ELEMENTS_TABLE_DOC_ETATS[index].ordre == event.target.value) {
        this.ordreExiste = true;
        break
      }
    }

    if(this.ordreExiste) {
      event.target.value= oldVal;
    }else
      option.ordre = event.target.value;
  }

  get f(){
    return this.formeDocEtats.controls;
  }

  getIdDocEtat(idDocEtat : string){
    this.idDOCEtat = idDocEtat
  }

  displayFn(preco: IEtats): string {
    return preco && preco.libelle ? preco.libelle : '';
  }

  retirerSelectionEtat(index: number) {
    this.ELEMENTS_TABLE_DOC_ETATS = this.dataSourceDocEtats.data;
    this.ELEMENTS_TABLE_DOC_ETATS.splice(index, 1); // je supprime un seul element du tableau a la position 'index'
    this.dataSourceDocEtats.data = this.ELEMENTS_TABLE_DOC_ETATS;
    this.recherchePPO(this.ELEMENTS_TABLE_DOC_ETATS)
  }

  /**
   * Methode qui permet d'effacer la valeur des controls etat et ordre lorsqu'on a
   * déjà choisi l'etat en cliquant dessus
   */
  reinitialliseRessourceControl(){
    this.serviceEtat.getAllEtats().subscribe(
      (resultat) =>{
        this.filteredOptions = resultat
      }
    )
    this.etatControl.reset()
    this.formeDocEtats.controls["ordreDocEtats"].reset()
  }
  /**
   * Methode permettant d'ouvrir la modal de manipullation des etats du document
   */
  openRoleValidationDialog(){

    const dialogRef = this.dialogDef.open(ModalRoleValidationComponent,
    {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      enterAnimationDuration:'1000ms',
      exitAnimationDuration:'1000ms',
      data:{}
    }
    )

    dialogRef.afterClosed().subscribe(result => {
      for (let index = 0; index < this.ELEMENTS_TABLE_DOC_ETATS.length; index++) {
        const element = this.ELEMENTS_TABLE_DOC_ETATS[index];
        
        if (element.id == this.idDOCEtat) {
          element.validation = this.donneeDocEtatService.dataRoleValidation
          this.dataSourceDocEtats.data = this.ELEMENTS_TABLE_DOC_ETATS
          break
        }
      }
    });
  }
  /**
   * Methode qui permet d'injecter une donnée du service de sorte à initialiser
   * le control de choix de validation de la modale avec la valeur de la validation du docEtat
   * sur lequel on clique
   * @param validation valeur à injecter au service
   */
  initialiseValidationControl(validation : IValidation){
    this.donneeDocEtatService.dataRoleValidation = validation
  }
  /**
   * Methode permettant de parcourir le tableau de docEtats et de ressortir le plus petit ordre (PPO) du tableau
   * @param docEtat tableau de docEtats de la modale
   */
  recherchePPO(docEtat : IDocEtats[]){
    this.plusPetitOrdre = docEtat[0].ordre
    docEtat.forEach(
      element => {
        let ordre = element.ordre
        if (ordre < this.plusPetitOrdre) {
          this.plusPetitOrdre = ordre
        }
    });
  }
  /**
   * Methode permettant de ressportir le tableau des etats ayant supprimé l'etat courrant de sorte à ne pas le 
   * choisir en tant que état précédant
   * @param index index de l'etat courrant 
   */
  effaceEtatCourrant(etats : IDocEtats) : IDocEtats[] {
    let etatsFinal : IDocEtats[] = []
    this.ELEMENTS_TABLE_DOC_ETATS.forEach(
      element => {
        if (etats.etat.libelle != element.etat.libelle) {
          etatsFinal.push(element)
        }
    });
    return etatsFinal
  }
  compareItem(docEtat1: IDocEtats, docEtat2: IDocEtats) {
    return docEtat2.etat && docEtat1.etat ? docEtat2.etat.id === docEtat1.etat.id : docEtat2.etat === docEtat1.etat;
  }
}

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { IAttributs } from 'src/app/modele/attributs';
import { ICategorieAffichage } from 'src/app/modele/categorie-affichage';
import { ICategoriesAttributs } from 'src/app/modele/categories-attributs';
import { AttributService } from 'src/app/services/attributs/attribut.service';
import { CategorieAttributService } from 'src/app/services/categorie-attribut/categorie-attribut.service';
import { DocumentService } from 'src/app/services/documents/document.service';
import { TypeTicket } from "src/app/modele/type-ticket";
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-modal-categories',
  templateUrl: './modal-categories.component.html',
  styleUrls: ['./modal-categories.component.scss']
})
export class ModalCategoriesComponent implements OnInit {

  myControl = new FormControl<string | IAttributs>('');
  formeCategorieAttribut: FormGroup;
  btnLibelle: string="Ajouter";
  titre: string="Ajouter une categorie";
  submitted: boolean=false;
  validation: boolean=false;
  ELEMENTS_TABLE_CATEGORIES: IAttributs[] = []; //tableau de listing des attributs a affecter a chaque categorie
  filteredOptions: IAttributs[] | undefined;
  displayedCategoriesAttributsColumns: string[] = ['actions','nomCategorie', 'ordreCat', 'libelleAttribut', 'ordreAtrParCat']; // structure du tableau presentant les categories creees avec leurs attributs
  displayedCategoriesColumns: string[] = ['actions','titre', 'description', 'type', 'ordreAtrParCat'];  // structure du tableau presentant les choix des attributs lors de la creation des categories
  idAttribut : string = ""
  conteur : any = 0
  
  // variables pour la gestion des categories
  dataSourceCategorieAttribut = new MatTableDataSource<IAttributs>(this.ELEMENTS_TABLE_CATEGORIES);
  categorieAttributs : ICategoriesAttributs = {
    id: '',
    nom: '',
    ordre: 0,
    listAttributs: []
  }
  attributTemp : IAttributs = {
    id: '',
    titre: '',
    description: '',
    etat: false,
    dateCreation: new Date,
    dateModification: new Date,
    ordre: 0,
    obligatoire: false,
    valeursParDefaut: '',
    type: TypeTicket.Int
  }
  // categorieAttributsTemp : ICategorieAffichage | undefined

  ELEMENTS_TABLE_CATEGORIE_ATTRIBUTS: ICategoriesAttributs[] = [];
  ELEMENTS_TABLE_CATEGORIE_AFFICHAGE: ICategorieAffichage[] = [];
  tableResultatsCategoriesAttributs  = new MatTableDataSource<ICategoriesAttributs>(this.ELEMENTS_TABLE_CATEGORIE_ATTRIBUTS);
  tableResultatsCategoriesAffichage  = new MatTableDataSource<ICategorieAffichage>(this.ELEMENTS_TABLE_CATEGORIE_AFFICHAGE);
  tableFinaleCategoriesAttributs: ICategoriesAttributs[] = [];
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private router:Router, private formBuilder: FormBuilder, private infosPath:ActivatedRoute, private serviceDocument:DocumentService, private serviceCategorieAttribut:CategorieAttributService, private serviceAttribut:AttributService,  private _liveAnnouncer: LiveAnnouncer,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.formeCategorieAttribut = this.formBuilder.group({
        _ordreAttribut: this.formBuilder.array([
        ]),
        ordreCategorie: ['', [Validators.required, Validators.minLength(1)]],
        nomCategorie: ['', [Validators.required, Validators.minLength(1)]]
      });
    }
    AttributsTableau : IAttributs[] = []
    AttributsTableauTemp : IAttributs[] = []
    
  ngOnInit(): void {
    console.log(this.data.name)
    console.log(this.diffSymetriqueTableau())
    
    this.dataSourceCategorieAttribut.data = this.data.dataSourceCategorieAttribut.data
    this.AttributsTableau = this.dataSourceCategorieAttribut.data
    
    this.getAllAttributs()
    this.creerCategorie()
    this.myControl.valueChanges.subscribe(
      value => {
        const titre = typeof value === 'string' ? value : value?.titre;
        if(titre != undefined && titre?.length >0){
          this.serviceAttribut.getAttributsByTitre(titre.toLowerCase() as string).subscribe(
            reponse => { 
              this.filteredOptions = reponse;
            }
          )
        }
        else{
          this.filteredOptions = [];
        }
      }
    );
  }

  getIdAttribut(idAttribut : string){
    this.idAttribut = idAttribut
  }

  ValiderCategorie(categorieAttributInput:any, index : number, event: any){

    this.validation = true
    if(this.formeCategorieAttribut.invalid) return;
    
    if (event.target.checked) {
      const _ordreAttribut = (this.formeCategorieAttribut.controls['_ordreAttribut'] as FormArray);

      this.serviceAttribut.getAttributById(this.idAttribut).subscribe(
        objet => {
          this.attributTemp = objet
          this.attributTemp.ordre = _ordreAttribut.value[index]

        const categorieAttributsTemp : ICategorieAffichage ={
          id: uuidv4(),
          nom: categorieAttributInput.nomCategorie,
          ordre: categorieAttributInput.ordreCategorie,
          attribut: this.attributTemp
        }

      this.ELEMENTS_TABLE_CATEGORIE_AFFICHAGE.push(categorieAttributsTemp)
      this.AttributsTableauTemp.push(categorieAttributsTemp.attribut)
      //this.ELEMENTS_TABLE_CATEGORIE_ATTRIBUTS.push(this.categorieAttributs)
      console.log("categorieAttributsTemp :  ", categorieAttributsTemp)
        }
      )
      
    } else {
      this.retirerSelectionCategorieAttribut(index)
      this.AttributsTableauTemp.splice(index, 1)
    }

    console.log( 'Voici le tableau avant validation : ' , this.tableResultatsCategoriesAttributs.data)
    console.log( 'Voici le second tableau avant validation : ' , this.tableResultatsCategoriesAffichage.data)
  }
  
  AjouterCategorieTemp() {
    this.tableResultatsCategoriesAffichage.data = this.ELEMENTS_TABLE_CATEGORIE_AFFICHAGE
    let index : number = 0
    this.data.dataSourceCategorieAttribut.data.forEach(
      (element: IAttributs) => {

        this.tableResultatsCategoriesAffichage.data.forEach(
          attribut => {
            if (element.titre == attribut.attribut.titre) {
              this.dataSourceCategorieAttribut.data.splice(index, 1)
            }
            index++
        });
    });
  }

  diffSymetriqueTableau(): IAttributs[]{
    const diffSymTableau = this.AttributsTableau
                          .filter(x => !this.AttributsTableauTemp.includes(x))
                          .concat(this.AttributsTableauTemp.filter(y => !this.AttributsTableau.includes(y)))
    return diffSymTableau
  }

  validerCategorieAttribut(){
    this.categorieAttributs  = {
      id: '',
      nom: '',
      ordre: 0,
      listAttributs: []
    }

    this.tableResultatsCategoriesAffichage.data.forEach(
      categorieAttributsTemp => {

            this.ELEMENTS_TABLE_CATEGORIE_ATTRIBUTS.forEach(
              element => {
                if (categorieAttributsTemp.nom == element.nom) {
                    element.listAttributs.push(categorieAttributsTemp.attribut)
                }
            });

            if (categorieAttributsTemp.nom != this.categorieAttributs.nom) {

              this.categorieAttributs  = {
                id: '',
                nom: '',
                ordre: 0,
                listAttributs: []
              }
              this.categorieAttributs.nom = categorieAttributsTemp.nom,
              this.categorieAttributs.ordre = categorieAttributsTemp.ordre,
              this.categorieAttributs.listAttributs.push(categorieAttributsTemp.attribut)
              this.categorieAttributs.id = categorieAttributsTemp.id 
              this.ELEMENTS_TABLE_CATEGORIE_ATTRIBUTS.push(this.categorieAttributs)
            }
 
      }
    );
      console.log('liste des catAttr finaux : ', this.ELEMENTS_TABLE_CATEGORIE_ATTRIBUTS)
          //alert('ok')
          //this.ELEMENTS_TABLE_CATEGORIE_ATTRIBUTS.push(this.categorieAttributs)
  }

  retirerSelectionCategorieAttribut(index: number){
    this.ELEMENTS_TABLE_CATEGORIE_AFFICHAGE.splice(index, 1)
    //this.ELEMENTS_TABLE_CATEGORIE_ATTRIBUTS.splice(index, 1)
  }

  ajoutInputOrdre() {
    this._ordreAttribut.push(this.formBuilder.control(''));
  }
  get _ordreAttribut() {
    return this.formeCategorieAttribut.get('_ordreAttribut') as FormArray;
  }

  creerCategorie(){
    this.dataSourceCategorieAttribut.data = this.data.dataSourceCategorieAttribut.data
    this.dataSourceCategorieAttribut.data.forEach(
      attribut => {
        this.ajoutInputOrdre()
    });
  }

  get f(){
    return this.formeCategorieAttribut.controls;
  }
  private getAllAttributs(){
    return this.serviceAttribut.getAllAttributs();
  }
  displayFn(attribue: IAttributs): string {
    return attribue && attribue.titre ? attribue.titre : '';
  }

  ngAfterViewInit() {
    this.dataSourceCategorieAttribut.paginator = this.paginator;
    this.dataSourceCategorieAttribut.sort = this.sort;
  }

  public rechercherListingAttribut(option: IAttributs){
    this.serviceAttribut.getAttributsByTitre(option.titre.toLowerCase()).subscribe(
        valeurs => {this.dataSourceCategorieAttribut.data = valeurs;}
    )
  }
  
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  
  retirerSelectionAttribut(index : number) {
    
  }

  onSubmit(categorieAttributInput:any){

  }
}



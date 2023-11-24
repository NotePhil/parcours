import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  Router,
  ActivatedRoute,
} from '@angular/router';
import { IAssociationCategorieAttributs } from 'src/app/modele/association-categorie-attributs';
import { IAttributs } from 'src/app/modele/attributs';
import { IDistributeur } from 'src/app/modele/distributeur';
import { IDocument } from 'src/app/modele/document';
import { IExemplaireDocument } from 'src/app/modele/exemplaire-document';
import { IMouvement } from 'src/app/modele/mouvement';
import { ObjetCleValeur } from 'src/app/modele/objet-cle-valeur';
import { IPrecoMvt } from 'src/app/modele/precomvt';
import { IRessource } from 'src/app/modele/ressource';
import { TypeTicket } from 'src/app/modele/type-ticket';
import { AttributService } from 'src/app/services/attributs/attribut.service';
import { DistributeursService } from 'src/app/services/distributeurs/distributeurs.service';
import { DocumentService } from 'src/app/services/documents/document.service';
import { ExemplaireDocumentService } from 'src/app/services/exemplaire-document/exemplaire-document.service';
import { RessourcesService } from 'src/app/services/ressources/ressources.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-exemplaire',
  templateUrl: './new-exemplaire.component.html',
  styleUrls: ['./new-exemplaire.component.scss'],
})
export class NewExemplaireComponent implements OnInit {
  exemplaire: IExemplaireDocument = {
    id: '',
    idDocument: '',
    titre: '',
    description: '',
    etat: false,
    missions: [],
    attributs: [],
    objetEnregistre: [],
    categories: [],
    preconisations: [],
    mouvements: [],
    affichagePrix: false,
    contientRessources: false
  };
  
  document: IDocument = {
    id: '',
    titre: '',
    description: '',
    etat: false,
    missions: [],
    attributs: [],
    categories: [],
    preconisations: [],
    affichagePrix: false,
    contientRessources: false
  };

  attribut: IAttributs = {
    id: '',
    titre: '',
    description: '',
    etat: false,
    dateCreation: new Date(),
    dateModification: new Date(),
    valeursParDefaut: '',
    type: TypeTicket.Int,
  };

  formeExemplaire: FormGroup;
  btnLibelle: string = 'Ajouter';
  titre: string = 'Ajouter un nouvel exemplaire de document';
  submitted: boolean = false;
  controlExemplaire = new FormControl();
  typeAttribut: string = '';
  idDocument: string | null = '';
  idExemplaire: string | null = '';
  idPatientCourant: string | null = '';
  nomPatientCourant: string | null = '';

  typeInt = TypeTicket.Int;
  typeString = TypeTicket.String;
  typeDouble = TypeTicket.Double;
  typeFloat = TypeTicket.Float;
  typeBoolean = TypeTicket.Boolean;
  typeDate = TypeTicket.Date;
  TypeBoolean = TypeTicket.Boolean;
  TypeRadio = TypeTicket.Radio;

  compteur: number = -1;
  totalAttribut: number = 0;
  numerateur: number = -1;
  totalAttributSupprime: number = 0.;
  objetCleValeurSupprime: ObjetCleValeur[] = [];
  tableauAttributsSupprime: IAttributs[] = [];

  tempAttributsCpt = new Map()
  tempAttributsObbligatoires = new Map()
  estValide : boolean = true
  eValvalide : string = "";
  
  ressourceControl = new FormControl<string | IRessource>('');
  distributeurControl = new FormControl<string | IDistributeur>('');
  idRessource : string = "";
  ELEMENTS_TABLE_MOUVEMENTS: IMouvement[] = [];
  dataSourceMouvements = new MatTableDataSource<IMouvement>(this.ELEMENTS_TABLE_MOUVEMENTS);
  filteredOptionsRessource: IRessource[] | undefined;
  filteredDistributeurOptions: IDistributeur[] | undefined;
  displayedRessourcesColumns: string[] = [
    'actions',
    'libelle',
    'quantite',
    'unite',
    'description',
    'distributeur'
  ]; // structure du tableau presentant les Ressources
  TABLE_PRECONISATION_RESSOURCES: IPrecoMvt[] = [];
  montantTotal : number = 0;
  soustotal : number = 0;
  distributeur : IDistributeur | undefined

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private infosPath: ActivatedRoute,
    private serviceRessource: RessourcesService,
    private serviceDistributeur: DistributeursService,
    private serviceDocument: DocumentService,
    private _liveAnnouncer: LiveAnnouncer,
    private serviceExemplaire: ExemplaireDocumentService,
    private datePipe: DatePipe
  ) {
    this.formeExemplaire = this.formBuilder.group({
      _exemplaireDocument: new FormArray([]),
      _controlsSupprime: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.nomPatientCourant = sessionStorage.getItem('nomPatientCourant');
    this.compteur = -1;

    // recuperation de l'id de l'exemplaire
    this.idExemplaire = this.infosPath.snapshot.paramMap.get('idExemplaire');

    // recuperation de l'id du document
    this.idDocument = this.infosPath.snapshot.paramMap.get('idDocument');

    this.initialiseFormExemplaire();
    
    this.ressourceControl.valueChanges.subscribe((value) => {
      const libelle = typeof value === 'string' ? value : value?.libelle;
      if (libelle != undefined && libelle?.length > 0) {
        this.serviceRessource
          .getRessourcesByLibelle(libelle.toLowerCase() as string)
          .subscribe((resultat) => {
            this.filteredOptionsRessource = resultat;
          });
      } else {
        this.serviceRessource.getAllRessources().subscribe(
          (resultat) =>{
            this.filteredOptionsRessource = resultat
          }
        )
      }
    });
    
    this.distributeurControl.valueChanges.subscribe((value) => {
      const raisonSocial = typeof value === 'string' ? value : value?.raisonSocial;
      if (raisonSocial != undefined && raisonSocial?.length > 0) {
        this.serviceDistributeur
          .getDistributeursByraisonSocial(raisonSocial.toLowerCase() as string)
          .subscribe((reponse) => {
            this.filteredDistributeurOptions = reponse;
          });
      } else {
        this.serviceDistributeur.getAllDistributeurs().subscribe(
          (reponse) =>{
            this.filteredDistributeurOptions=reponse
          }
        )
      }
    });
  }

  /**
   * Methode pour l'initialisation d'un control avec une valeur
   * @param valParDefaut valeur recuperer dans objetEnregistre et qui servira de valeur du control cree
   */
  addAttributs(valParDefaut: any, obligatoire : Boolean) {
    if (valParDefaut != '' && valParDefaut != 'PARCOURS_NOT_FOUND_404'){
      if (obligatoire == true) {
        this._exemplaireDocument.push(this.formBuilder.control(valParDefaut, Validators.required));
      } else {
        this._exemplaireDocument.push(this.formBuilder.control(valParDefaut));
      }
    }
    else{
      if (obligatoire == true) {
        this._exemplaireDocument.push(this.formBuilder.control('', Validators.required));
      } else {
        this._exemplaireDocument.push(this.formBuilder.control(''));
      }
    } 
  }
  
  /**
   * Methode pour l'initialisation d'un control avec une valeur
   * @param valParDefaut valeur recuperer dans objetEnregistre et qui servira de valeur du control cree
   */
  ajouterDisabledAttributs(valParDefaut: any) {
    if (valParDefaut != '' && valParDefaut != 'PARCOURS_NOT_FOUND_404') {
      this._controlsSupprime.push(this.formBuilder.control(valParDefaut));
    } else this._controlsSupprime.push(this.formBuilder.control(''));
  }

  /**
   * methode permettant de rechercher les attributs absents dans le model de document/exemplaire
   * et les placer dans un tableau
   */
  rechercherAttributsAbsants() {
    this.objetCleValeurSupprime = [];

    for (
      let index = 0;
      index < this.exemplaire.objetEnregistre.length;
      index++
    ) {
      const keyVal = this.exemplaire.objetEnregistre[index];
      let flag: boolean = false;

      for (let index = 0; index < this.exemplaire.attributs.length; index++) {
        const attribut = this.exemplaire.attributs[index];
        if (keyVal.key.id == attribut.id) {
          flag = true;
          break;
        }
      }
      if (flag == false) {
        this.objetCleValeurSupprime.push(keyVal);
        this.totalAttributSupprime = this.objetCleValeurSupprime.length-1
      }
    }
  }
  initialiseFormExemplaire() {
    if (this.idExemplaire != null && this.idExemplaire !== '') {
      this.btnLibelle = 'Modifier';
      this.titre = 'Document à Modifier';

      this.serviceExemplaire
        .getExemplaireDocumentById(this.idExemplaire)
        .subscribe((x) => {
          this.exemplaire = x;
          this.document = x;
          if (this.exemplaire.mouvements != undefined) {
            this.ELEMENTS_TABLE_MOUVEMENTS = this.exemplaire.mouvements;
          }
          this.dataSourceMouvements.data = this.ELEMENTS_TABLE_MOUVEMENTS;
          this.totalAttribut = x.attributs.length - 1;
          this.rechercherAttributsAbsants();
          this.formerEnteteTableauMissions()
          this.modifierMouvementExemplaire(x.idDocument)
        });
    }
    if (this.idDocument != null && this.idDocument !== '') {
      this.serviceDocument
        .getDocumentById(this.idDocument)
        .subscribe((document) => {
          this.document = document;
          this.totalAttribut = document.attributs.length - 1;
          this.formerEnteteTableauMissions()
        });
    }
  }
/**
 * Methode permettant de former la nouvelle structure du tableau de mouvement de l'exemplaire
 * si les données affiche prix et affiche ressourse sont modifiées dans le document initial 
 * @param document est le model de document inital duquel l'exemplaire a été tiré
 */
  modifierMouvementExemplaire(idDocument:string){
    this.serviceDocument.getDocumentById(idDocument).subscribe(
      value=>{
        this.document.affichagePrix = value.affichagePrix
        this.document.contientRessources = value.contientRessources
        if (this.document.affichagePrix==false) {
          this.displayedRessourcesColumns.splice(6,2)
        }
      })
  }

  /**
   * Methode qui permet de rajouter les colones de prix et montants si affichePrix a la valeur true
   */
  formerEnteteTableauMissions(){
    if ((this.document.affichagePrix == true)) {
      let prix : string = "prix"
      let montant : string = "montant total"
      this.displayedRessourcesColumns.push(prix)
      this.displayedRessourcesColumns.push(montant)
    }
  }
  /**
   * methode permettant de renvoyer la valeur de l'attribut
   */
  rechercherValeurParIdAttribut(idAttribut: string): string {
    for (
      let index = 0;
      index < this.exemplaire.objetEnregistre.length;
      index++
    ) {
      const element = this.exemplaire.objetEnregistre[index];
      if (element.key.id == idAttribut) {
        return element.value;
      }
    }
    return 'PARCOURS_NOT_FOUND_404';
  }

  /**
   * methode permettant de renvoyer la valeur de l'attribut
   */
  rechercherValeurParIdAttributSupprime(idAttribut: string): string {
    for (
      let index = 0;
      index < this.objetCleValeurSupprime.length;
      index++
    ) {
      const element = this.objetCleValeurSupprime[index];
      if (element.key.id == idAttribut) {
        return element.value;
      }
    }
    return 'PARCOURS_NOT_FOUND_404';
  }

  /**
   * Methode qui permet d'enregistrer les valeurs du formulaire dans un objet de type ObjetCleValeur
   * C'est set objet qui nous permettra de preremplir le formulaire lors de la modification
   */
  enregistrerObjet() {
    const exemplaireDocument = this._exemplaireDocument;
    this.exemplaire.objetEnregistre = [];
    this.document.attributs.forEach((a) => {
      const objetCleValeur: ObjetCleValeur = {
        key: '',
        value: '',
      };
      let index = this.tempAttributsCpt.get(a.id);
      objetCleValeur.key = a;
      objetCleValeur.value = exemplaireDocument.controls[index].value;
      this.exemplaire.objetEnregistre.push(objetCleValeur);
    });
  }
  /**
   * recuperation du formArray qui servira pour l'enregistrement des donnees
   */
  get _exemplaireDocument(): FormArray {
    return this.formeExemplaire.get('_exemplaireDocument') as FormArray;
  }

  /**
   * recuperation du formArray qui contiendra les controls qui ont ete supprime dans
   * le mpdel de document et existent encore dans exemplaire deje ennregistre
   */
  get _controlsSupprime(): FormArray {
    return this.formeExemplaire.get('_controlsSupprime') as FormArray;
  }

  /**
   * recuperation du formArray qui servira à initialiser les controls d'autocompletion des didtributeurs.
   */
  get _controlsAutocomplateDistributeur(): FormArray {
    return this.formeExemplaire.get('_controlsAutocomplateDistributeur') as FormArray;
  }

  /**
   * Permet d'incrémenter les index des différents inputs contenus dans les formControl
   * ainsi que de les initialiser à une valeur par défaut
   * @param cpt valeur courante du compteur
   * @param idAttribut id attribut à afficher
   * @returns valeur courante + 1
   */
  incrementeCompteur(cpt: number, attributCategories: IAssociationCategorieAttributs): number {
    if (this.compteur > -1 && this.compteur >= this.totalAttribut){
      return cpt;
    }

    let valAttribut = this.rechercherValeurParIdAttribut(attributCategories.attribut.id);
    this.tempAttributsCpt.set(attributCategories.attribut.id, cpt+1)
    this.tempAttributsObbligatoires.set(cpt+1, attributCategories.attribut.titre)
    if (attributCategories.attribut.type == TypeTicket.Date && valAttribut != null) {
      // si le type de l'attribut est Date et que la valeur de valAttribut n'est pas vide
      let dateAtt = new Date();
      if(valAttribut != "PARCOURS_NOT_FOUND_404")
         dateAtt = new Date(valAttribut); // creatoion d'une nouvelle date avec la valeur de valAttribut
      
      let dateReduite = this.datePipe.transform(dateAtt, 'yyyy-MM-dd'); // changer le format de la date de naissance pour pouvoir l'afficher dans mon input type date
      this.addAttributs(dateReduite, attributCategories.obligatoire);
    } else {
      this.addAttributs(valAttribut, attributCategories.obligatoire);
    }
    this.compteur = this.compteur + 1;
    return this.compteur;
  }
  incrementeNumerateur(num: number, attribut: IAttributs): number {
    if (
      this.numerateur >= -1 &&
      this.numerateur >= this.totalAttributSupprime
    )
      return num;

    let valAttribut = this.rechercherValeurParIdAttribut(attribut.id);
    if (attribut.type == TypeTicket.Date && valAttribut != null) {
      let date = new Date(valAttribut);
      let dateReduite = this.datePipe.transform(date, 'yyyy-MM-dd');
      this.ajouterDisabledAttributs(dateReduite);
    } else {
      this.ajouterDisabledAttributs(valAttribut);
    }
    this.numerateur = this.numerateur + 1;
    this._controlsSupprime.disable();
    return this.numerateur;
  }
  /**
   * Methode qui permet de parcourir le formulaire lors de la validation et de repérer les chapms obligatoires non remplis
   * @returns le titre du premier attribut obligatoire non remplis
   */
  evaluation():string{
    
    this.estValide = true
    for (let index = 0; index < this.tempAttributsObbligatoires.size; index++) {
      if (this.f.controls[index].errors) {
        this.estValide = false
        this.eValvalide = this.tempAttributsObbligatoires.get(index)
        break
      }
    }
      return this.eValvalide
  }

  get f(){
    return this.formeExemplaire.get('_exemplaireDocument') as FormArray;
  }

  /**
   * Methodr qui permet de faire la somme des montants du tableau de mouvements
   * pour afficher le resultat dans la case montant total
   */
  sommeMontants():number{
    this.montantTotal = 0;
    this.ELEMENTS_TABLE_MOUVEMENTS.forEach(
      mouvement => {
        if (mouvement.ressource != undefined && mouvement.quantite!=null && mouvement.prix!=null) {
          this.montantTotal += mouvement.prix*mouvement.quantite;
        }
    });
    return this.montantTotal
  }

  /**
   * methode de validation du formulaire (enregistrement des donnees du formulaire)
   */
  onSubmit() {
    const exemplaireDocument = this._exemplaireDocument;
    this.submitted = true;
    this.enregistrerObjet()
    this.evaluation()
    if (this.formeExemplaire.invalid) return;

    let exemplaireTemp: IExemplaireDocument = {
      id: uuidv4(),
      idDocument: this.document.id,
      titre: this.document.titre,
      description: this.document.description,
      missions: this.document.missions,
      attributs: this.document.attributs,
      objetEnregistre: this.exemplaire.objetEnregistre,
      categories: this.document.categories,
      preconisations: this.document.preconisations,
      mouvements: this.ELEMENTS_TABLE_MOUVEMENTS,
      etat: this.document.etat,
      affichagePrix: this.document.affichagePrix,
      contientRessources: this.document.contientRessources
    };

    if (this.exemplaire.id != '') {
      exemplaireTemp.id = this.exemplaire.id;
    }

    this.serviceExemplaire
      .ajouterExemplaireDocument(exemplaireTemp)
      .subscribe((object) => {
        this.router.navigate(['/list-exemplaire']);
      });
  }

  /**
   * Methode permettant de récupérer un distributeur dans le template et de l'assicier à 
   * une ressource avant de la mettre dans le tablau de mouvement
   * @param distributeur valeur du distributeur récupéré dans l'autocomplate distributeur sur le template
   */
  public associerDistributeur(distributeur : IDistributeur){
    this.distributeur = distributeur
  }
  public rechercherListingRessources(option: IRessource) {
    let tabIdRessource : string[] = []
    this.ELEMENTS_TABLE_MOUVEMENTS.forEach(
      mouvement => {
        if (mouvement.ressource != undefined) {
          tabIdRessource.push(mouvement.ressource.id)
        }
    });
    if (!tabIdRessource.includes(option.id)) {
      let mvt : IMouvement = {
        id: '',
        description: '',
        quantite: option.quantite,
        prix: option.prix,
        dateCreation: new Date(),
        datePeremption:  new Date(),
        ressource: option
      }
      if(this.distributeur != undefined){
        mvt.distributeur = this.distributeur
      }
      this.ELEMENTS_TABLE_MOUVEMENTS.unshift(mvt)
      this.dataSourceMouvements.data = this.ELEMENTS_TABLE_MOUVEMENTS
      
      // On reinitialise le distributeur
      this.distributeur = undefined
    }
  }

  displayFn(Ressource: IRessource): string {
    return Ressource && Ressource.libelle ? Ressource.libelle : '';
  }

  displayDistributeurFn(distributeur: IDistributeur): string {
    return distributeur && distributeur.raisonSocial ? distributeur.raisonSocial : '';
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getRessourceId(idRessource: string) {
    this.idRessource = idRessource;
  }

  retirerSelectionRessource(index: number) {
    this.ELEMENTS_TABLE_MOUVEMENTS = this.dataSourceMouvements.data;
    this.ELEMENTS_TABLE_MOUVEMENTS.splice(index, 1); // je supprime un seul element du tableau a la position 'index'
    this.dataSourceMouvements.data = this.ELEMENTS_TABLE_MOUVEMENTS;
  }
}

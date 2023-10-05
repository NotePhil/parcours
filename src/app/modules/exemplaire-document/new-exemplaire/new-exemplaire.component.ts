import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Router,
  ActivatedRoute,
  withDisabledInitialNavigation,
} from '@angular/router';
import { IAttributs } from 'src/app/modele/attributs';
import { IDocument } from 'src/app/modele/document';
import { IExemplaireDocument } from 'src/app/modele/exemplaire-document';
import { ObjetCleValeur } from 'src/app/modele/objet-cle-valeur';
import { TypeTicket } from 'src/app/modele/type-ticket';
import { AttributService } from 'src/app/services/attributs/attribut.service';
import { DocumentService } from 'src/app/services/documents/document.service';
import { ExemplaireDocumentService } from 'src/app/services/exemplaire-document/exemplaire-document.service';
import { MissionsService } from 'src/app/services/missions/missions.service';
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
    missions: [],
    attributs: [],
    objetEnregistre: [],
    categories: [],
    preconisations: []
  };
  document: IDocument = {
    id: '',
    titre: '',
    description: '',
    missions: [],
    attributs: [],
    categories: [],
    preconisations: []
  };

  attribut: IAttributs = {
    id: '',
    titre: '',
    description: '',
    etat: false,
    dateCreation: new Date(),
    dateModification: new Date(),
    ordre: 0,
    obligatoire: false,
    valeursParDefaut: '',
    type: TypeTicket.Int,
  };

  formeExemplaire: FormGroup;
  btnLibelle: string="Ajouter";
  titre: string="Ajouter un nouvel exemplaire de document";
  submitted: boolean=false;
  //_exemplaireDocument :  FormArray | undefined;
  controlExemplaire = new FormControl;
  typeAttribut : string = "";
  idDocument : string | null = "";
  idExemplaire : string | null = "";
  idPatientCourant: string | null= "";
  nomPatientCourant: string | null = "";

  // tableau de type map pour enregistrer les index
  // et valeurs des controls du formulaire
  tmpIndexValeursControls : Map<string, number> = new Map();

  typeInt = TypeTicket.Int;
  typeString = TypeTicket.String;
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

  constructor(private router:Router, private formBuilder: FormBuilder, private infosPath:ActivatedRoute, private serviceDocument:DocumentService, private serviceExemplaire : ExemplaireDocumentService, private serviceMission:MissionsService, private serviceAttribut:AttributService) {
    this.formeExemplaire = this.formBuilder.group({
      _exemplaireDocument: new FormArray([]),
      _controlsSupprime: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.nomPatientCourant = sessionStorage.getItem('nomPatientCourant');
    this.compteur = -1;

    // recuperation de l'id de l'exemplaire
    this.idExemplaire = this.infosPath.snapshot.paramMap.get('idExemplaire');

    // recuperation de l'id du document
    this.idDocument = this.infosPath.snapshot.paramMap.get('idDocument'); console.log("l'id du document", this.idDocument);

    this.initialiseFormExemplaire()
  }

  addAttributs() {
   this._exemplaireDocument.push(this.formBuilder.control(''));
   //this.tableauIndex.push(this.incrementeCompteur())
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

          this.serviceDocument.getDocumentById(this.exemplaire.idDocument).subscribe(
            document =>{
              this.document = document
              document.attributs.forEach(
                x => {
                  this.addAttributs()

                  const indice = exemplaireDocument.length;

                  exemplaireDocument.controls[0].setValue("ok")
                  console.log("le resultat est : ", exemplaireDocument.controls[0].value)
                  //creer la map avec id et indice
                  this.tmpIndexValeursControls.set(x.id, indice - 1);
                }
              )
            }
          )
          this.remplissageFormulaire()
          console.log("le tablesu : " , this.tmpIndexValeursControls)
      });
    }
    if (this.idDocument) {
      this.serviceDocument
        .getDocumentById(this.idDocument)
        .subscribe((document) => {
          this.document = document;
          this.totalAttribut = document.attributs.length - 1;
        });
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
  enregistrerObjet(){
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
   * methode qui permet d'extraire le premier element d'une chaine de caractere
   * Elle permettra d'afficher les valeurs par defaut des attributs un a un
   * @param chaine
   */
  incrementeCompteur(cpt: number, attribut: IAttributs): number {
    if (this.compteur > -1 && this.compteur >= this.totalAttribut){
      return cpt;
    }

    let valAttribut = this.rechercherValeurParIdAttribut(attribut.id);
    this.tempAttributsCpt.set(attribut.id, cpt+1)
    if (attribut.type == TypeTicket.Date && valAttribut != null) {
      // si le type de l'attribut est Date et que la valeur de valAttribut n'est pas vide
      let dateAtt = new Date();
      if(valAttribut != "PARCOURS_NOT_FOUND_404")
         dateAtt = new Date(valAttribut); // creatoion d'une nouvelle date avec la valeur de valAttribut

      let dateReduite = this.datePipe.transform(dateAtt, 'yyyy-MM-dd'); // changer le format de la date de naissance pour pouvoir l'afficher dans mon input type date
      this.addAttributs(dateReduite);
    } else {
      this.addAttributs(valAttribut);
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
   * methode de validation du formulaire (enregistrement des donnees du formulaire)
   */
  onSubmit() {
    const exemplaireDocument = this._exemplaireDocument;
    this.submitted = true;
    if (this.formeExemplaire.invalid) return;

    let exemplaireTemp: IExemplaireDocument = {
      id: uuidv4(),
      idDocument: this.document.id,
      titre: this.document.titre,
      description: this.document.description,
      missions: this.document.missions,
      attributs: this.document.attributs,
      objetEnregistre: [],
      categories: this.document.categories,
      preconisations: this.document.preconisations
    };
    exemplaireTemp.objetEnregistre = this.exemplaire.objetEnregistre;

    if (this.exemplaire.id != '') {
      exemplaireTemp.id = this.exemplaire.id;
    }
    exemplaireTemp.objetEnregistre = this.exemplaire.objetEnregistre

    console.log("les objets cles-valeur : " + exemplaireTemp.objetEnregistre)
    console.log("this._exemplaireDocument : ", this._exemplaireDocument.value)
    this.serviceExemplaire.ajouterExemplaireDocument(exemplaireTemp).subscribe(
      object => {
        this.router.navigate(['/list-exemplaire']);
      });
  }
}

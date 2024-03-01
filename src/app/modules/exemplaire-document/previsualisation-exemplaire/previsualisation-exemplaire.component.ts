import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { StringUtils } from '@zxing/library';
import { IExemplaireDocument } from 'src/app/modele/exemplaire-document';
import { IExemplairesDePersonne } from 'src/app/modele/exemplaires-de-personne';
import { IMouvement } from 'src/app/modele/mouvement';
import { IType } from 'src/app/modele/type';
import { TypeMouvement } from 'src/app/modele/typeMouvement';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { ExemplaireDocumentService } from 'src/app/services/exemplaire-document/exemplaire-document.service';

@Component({
  selector: 'app-previsualisation-exemplaire',
  templateUrl: './previsualisation-exemplaire.component.html',
  styleUrls: ['./previsualisation-exemplaire.component.scss']
})
export class PrevisualisationExemplaireComponent  implements OnInit {

  nomPatientCourant: string | null = '';
  exemplaire : IExemplaireDocument = {
    id: '',
    titre: '',
    description: '',
    missions: [],
    attributs: [],
    idDocument: '',
    objetEnregistre: [],
    categories: [],
    preconisations: [],
    mouvements: [],
    etat: false,
    affichagePrix: false,
    contientRessources: false,
    contientDistributeurs: false,
    typeMouvement: TypeMouvement.Neutre,
    DocEtats: []
  };
  titre:string='';
  mouvements : IMouvement[] = []
  typeNeutre : string = TypeMouvement.Neutre
  typeAjout : string = TypeMouvement.Ajout
  typeReduire : string = TypeMouvement.Reduire
  montantTotal: number = 0;
  displayedRessourcesColumns: string[] = [
    'libelle',
    'quantite',
    'unite',
    'description'
  ]; // structure du tableau presentant les Ressources
  dataSourceMouvements = new MatTableDataSource<IMouvement>();
  dataSourceAutresExemplaires = new MatTableDataSource<IExemplaireDocument>();
  filteredOptions: IExemplaireDocument[] | undefined;
  displayedColumns: string[] = ['titre'];
  @ViewChild(MatSort) sort!: MatSort;
  exemplairesDePersonne : IExemplairesDePersonne[] = []

  constructor(
    private router:Router, 
    private infosPath:ActivatedRoute,
    private dataEnteteMenuService:DonneesEchangeService, 
    private serviceExemplaire:ExemplaireDocumentService,
    private datePipe: DatePipe,
    private serviceExemplaireDocument: ExemplaireDocumentService,
    private _liveAnnouncer: LiveAnnouncer
    ) {}

  ngOnInit(): void {
    this.getAllExemplaires().subscribe(valeurs => {
      this.dataSourceAutresExemplaires.data = valeurs;
      this.filteredOptions = valeurs
      this.regrouperExemplairesParType()
    });

    let idExemplaire = this.infosPath.snapshot.paramMap.get('idExemplaire');
    if((idExemplaire != null) && idExemplaire!==''){
      this.serviceExemplaire.getExemplaireDocumentById(idExemplaire).subscribe(
        x =>{
          this.exemplaire = x;
          if (this.exemplaire.mouvements != undefined) {
            this.mouvements = this.exemplaire.mouvements
          }
          if (this.exemplaire.mouvements != undefined) {
            this.dataSourceMouvements.data = this.exemplaire.mouvements
          }
          this.formerEnteteTableauMissions();
        });
    }
    this.titre=this.dataEnteteMenuService.dataEnteteMenu
    this.nomPatientCourant = sessionStorage.getItem('nomPatientCourant');
  }

  /**
   * methode permettant de renvoyer la valeur de l'attribut
   */
  rechercherValeurParIdAttribut(idAttribut: string, typeAttribut: IType): string {
    for (
      let index = 0;
      index < this.exemplaire.objetEnregistre.length;
      index++
    ) {
      const element = this.exemplaire.objetEnregistre[index];
      if (element.key.id == idAttribut) {
        if (typeAttribut == IType.Date && element.value != undefined) {  // si le type de l'attribut est Date et que la valeur n'est pas vide
          let dateAtt = new Date();
          dateAtt = new Date(element.value); // creatoion d'une nouvelle date avec la valeur de valAttribut

          let dateReduite = this.datePipe.transform(dateAtt, 'dd-MM-yyyy'); // changer le format de la date de naissance pour pouvoir l'afficher dans mon input type date

          return dateReduite!
        }
        return element.value;
      }
    }
    return '';
  }
  
  /**
   * Methodr qui permet de faire la somme des montants du tableau de mouvements
   * pour afficher le resultat dans la case montant total
   */
  sommeMontants(): number {
    this.montantTotal = 0;
    this.exemplaire.mouvements?.forEach((mouvement) => {
      if (
        mouvement.ressource != undefined &&
        mouvement.quantite != null &&
        mouvement.prix != null
      ) {
        this.montantTotal += mouvement.prix * mouvement.quantite;
      }
    });
    return this.montantTotal;
  }
  /**
   * Methode qui permet de rajouter les colones de prix et montants si affichePrix a la valeur true
   */
  formerEnteteTableauMissions(){
    if (this.exemplaire.contientDistributeurs == true) {
      let distributeur : string = "distributeur"
      this.displayedRessourcesColumns.push(distributeur)
    }
    if ((this.exemplaire.affichagePrix == true)) {
      let prix : string = "prix"
      let montant : string = "montant total"
      if (this.exemplaire.typeMouvement == TypeMouvement.Reduire) {
        prix = "prixDeSortie"
      } else if (this.exemplaire.typeMouvement == TypeMouvement.Ajout){
        prix = "prixEntrée"
      }else{
        prix = "prix"
      }
      this.displayedRessourcesColumns.push(prix)
      this.displayedRessourcesColumns.push(montant)
    }
  }
  private getAllExemplaires(){
    return this.serviceExemplaireDocument.getAllExemplaireDocuments();
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  regrouperExemplairesParType(){
    this.exemplairesDePersonne = [];
    let tmpTabExemplaireTrier = new Map();
    for (let index = 0; index < this.dataSourceAutresExemplaires.data.length; index++) {
      const element = this.dataSourceAutresExemplaires.data[index];
      let cle : string =   element.titre;
      if (!tmpTabExemplaireTrier.has(cle)) {
        let tabEltTraite : IExemplaireDocument[] = [];
        tabEltTraite.push(element);
        tmpTabExemplaireTrier.set(cle,tabEltTraite);
      }else{
        let tabEltTraite : IExemplaireDocument[] = tmpTabExemplaireTrier.get(cle);
        tabEltTraite.push(element);
        tmpTabExemplaireTrier.set(cle,tabEltTraite);
      }
    }
    tmpTabExemplaireTrier.forEach((value, key) => {
      let elt : IExemplairesDePersonne = {titre :key, exemplaires:value};
      this.exemplairesDePersonne.push(elt);        
    });
  }
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TypeMvt } from 'src/app/modele/type-mvt';
import { TypeValidation } from 'src/app/modele/type-validation';
import { FormatCode } from 'src/app/modele/format-code';
import { IDocEtats } from 'src/app/modele/doc-etats';
import { IEtape } from 'src/app/modele/etape';

@Injectable({
  providedIn: 'root',
})
export class DonneesEchangeService {
  dataDocumentCategorie: any;
  dataDocumentPrecoMvts: any;
  dataDocumentAttributs: any;
  dataDocumentRessourcesAttributs : any;
  dataDocumentCodebarre: any;
  dataEtatSelectionner : any;
  dataDocumentSousDocuments: any;
  dataDocumentSousExemplaireDocuments: any;
  dataDocumentEtats: any;
  dataParcoursEtapes: any;
  dataRoleValidation: any;
  dataEtapeDocuments: any;
  dataDocumentDocuments: any;
  dataExemplairePersonneRatachee: any;
  dataUrlExemplaireDePersonne: any;
  private _dataEnteteMenu: string = '';
  dataMouvementsExemplaire: any
  dataPromoMouvementCourant: any
  dataRessourceMouvementCourant: any
  constructor(private http: HttpClient) {
    const storedDataEnteteMenu = sessionStorage.getItem('dataEnteteMenu');
    if (storedDataEnteteMenu) {
      this._dataEnteteMenu = storedDataEnteteMenu;
    } else {
      this._dataEnteteMenu = '';
    }
  }

  get dataEnteteMenu(): string {
    return this._dataEnteteMenu;
  }

  set dataEnteteMenu(value: string) {
    this._dataEnteteMenu = value;
    sessionStorage.setItem('dataEnteteMenu', value);
  }

  getTypeMvt(): Observable<TypeMvt> {
    return this.http.get<TypeMvt>('api/typeMvt');
  }

  getTypeValidation(): Observable<TypeValidation> {
    return this.http.get<TypeValidation>('api/typeValidation');
  }

  getFormatCode(): Observable<FormatCode> {
    return this.http.get<FormatCode>('api/formatCode');
  }

  saveEtatModal(value: any) {
    this.dataEtatSelectionner = value;
  }

  getsaveEtatModal(){
    return this.dataEtatSelectionner;
  }

  saveMouvementsExemplaire(value: any) {
    this.dataMouvementsExemplaire = value;
  }

  getMouvementsExemplaire(){
    return this.dataMouvementsExemplaire;
  }

  /**
   * Méthode permettant d'affecter une valeur au libellé qui servera à former
   * une url de redirection à partir de la modale choix de personne
   * @param value nouvelle valeur du libelle qui servera à former une url de redirection
   */
  setUrlSource(value: any) {
    this.dataUrlExemplaireDePersonne = value;
    if (value == 'Exécuter' || value == 'Historique des documents') {
      sessionStorage.setItem('urlSource', value);
    }
  }
  /**
   * Méthode permettant de recupérer la valeur au libellé qui servera à former
   * une url de redirection à partir de la modale choix de personne
   * @returns la valeur du libellé
   */
  getUrlSource() {
    this.dataUrlExemplaireDePersonne = sessionStorage.getItem('urlSource');
    return this.dataUrlExemplaireDePersonne;
  }

  /**
   * Méthode permettant de stocker la personne sélectionnée dans la modale choix personne
   * @param nouvelle valeur
   */
  setExemplairePersonneRatachee(value: any) {
    this.dataExemplairePersonneRatachee = value;
    sessionStorage.setItem('personneRatachee', value.id);
  }
  /**
   * Méthode permettant de recupérer la personne stockée dans le setExemplairePersonneRatachee()
   * @returns la valeur de la personne
   */
  getExemplairePersonneRatachee() {
    this.dataExemplairePersonneRatachee =
      sessionStorage.getItem('personneRatachee');
    return this.dataExemplairePersonneRatachee;
  }

  genratedgraphe(etats?: IDocEtats[], etapes?: IEtape[]): string {
    let line = `graph TB;`;

        if (etats) {
          for (let i = 0; i < etats.length; i++) {
            if (etats[i].etat.etatPrecedant != null && etats[i].etat.etatPrecedant!.length > 0) {
              for (let j = 0; j < etats[i].etat.etatPrecedant!.length; j++) {
  
                line =
                  line +
                  `${etats[i].etat.etatPrecedant![j].id}[${etats[i].etat.etatPrecedant![j].libelle}]-->${etats[i].etat.id}[${etats[i].etat.libelle}];`;
              }
            }
            if (etats[i].etat.etatSuivant != null && etats[i].etat.etatSuivant!.length > 0) {
              for (let j = 0; j < etats[i].etat.etatSuivant!.length; j++) {
                line =
                  line +
                  `${etats[i].etat.id}[${etats[i].etat.libelle}]-->${etats[i].etat.etatSuivant![j].id}[${etats[i].etat.etatSuivant![j].libelle}];`;
              }
            }
          }
        } 
        if(etapes) {
          for (let i = 0; i < etapes.length; i++) {
          if (etapes[i].etapeprecedant != null && etapes[i].etapeprecedant!.length > 0) {
            for (let j = 0; j < etapes[i].etapeprecedant!.length; j++) {

              line =
                line +
                `${etapes[i].etapeprecedant![j].id}[${etapes[i].etapeprecedant![j].libelle}]-->${etapes[i].id}[${etapes[i].libelle}];`;
            }
          }
          if (etapes[i].etapesuivant != null && etapes[i].etapesuivant!.length > 0) {
            for (let j = 0; j < etapes[i].etapesuivant!.length; j++) {
              line =
                line +
                `${etapes[i].id}[${etapes[i].libelle}]-->${etapes[i].etapesuivant![j].id}[${etapes[i].etapesuivant![j].libelle}];`;
            }
          }
        }
        }
    return line;
  }
}

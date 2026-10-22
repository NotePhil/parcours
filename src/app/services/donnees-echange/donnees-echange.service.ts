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
  dataDocumentRessourcesAttributs: any;
  dataEtatSelectionner: any;
  // Stocke le tableau d'objets IDocumentsAssocies (document + etat) pour l'échange entre formulaires et modales
  dataDocumentDocumentsAssocies: any;
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

  getsaveEtatModal() {
    return this.dataEtatSelectionner;
  }

  saveMouvementsExemplaire(value: any) {
    this.dataMouvementsExemplaire = value;
  }

  getMouvementsExemplaire() {
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
    const escapeDocs = (libelle: string, docs?: { titre: string }[]) => {
      const docLines = docs?.map(doc => `- ${doc.titre}`).join('<br>'); // une seule fois \\n
      return docLines ? `${libelle}<br>${docLines}` : libelle;
    };

    let line = `graph TB;\n`;

    if (etats && etats.length > 0) {
      let hasTransitions = false;

      // Créer uniquement les transitions depuis les prédécesseurs vers l'état courant
      for (let i = 0; i < etats.length; i++) {
        const current = etats[i];
        const currentEtat = current.etat;
        if (!currentEtat) continue;

        const currentId = currentEtat.id || `etat_${i}`;
        const currentCleanId = 'node_' + currentId.replace(/[^a-zA-Z0-9_]/g, '_');
        const currentCleanLibelle = (currentEtat.libelle || '').replace(/"/g, "'");

        if (current.predecesseurDocEtat && current.predecesseurDocEtat.length > 0) {
          for (let j = 0; j < current.predecesseurDocEtat.length; j++) {
            const pred: any = current.predecesseurDocEtat[j];
            const predEtat = pred.etat ? pred.etat : pred;
            if (predEtat) {
              const predId = predEtat.id || `pred_${j}`;
              const predCleanId = 'node_' + predId.replace(/[^a-zA-Z0-9_]/g, '_');
              const predCleanLibelle = (predEtat.libelle || '').replace(/"/g, "'");
              line += `${predCleanId}["${predCleanLibelle}"]-->${currentCleanId}["${currentCleanLibelle}"];\n`;
              hasTransitions = true;
            }
          }
        }
      }

      // S'il n'y a aucune transition définie (aucun prédécesseur), aucun graphe ne doit être affiché
      if (!hasTransitions) {
        return '';
      }
    }
    if (etapes && etapes.length > 0) {
      let hasEtapeTransitions = false;
      for (let i = 0; i < etapes.length; i++) {
        const curr = etapes[i];
        const currId = 'etape_' + (curr.id || `curr_${i}`).replace(/[^a-zA-Z0-9_]/g, '_');
        const currLabel = escapeDocs(curr.libelle, curr.document).replace(/"/g, "'");

        if (curr.etapeprecedant != null && curr.etapeprecedant.length > 0) {
          for (let j = 0; j < curr.etapeprecedant.length; j++) {
            const pred = curr.etapeprecedant[j];
            const predId = 'etape_' + (pred.id || `pred_${j}`).replace(/[^a-zA-Z0-9_]/g, '_');
            const predLabel = escapeDocs(pred.libelle, pred.document).replace(/"/g, "'");
            line += `${predId}["${predLabel}"]-->${currId}["${currLabel}"];\n`;
            hasEtapeTransitions = true;
          }
        }
        if (curr.etapesuivant != null && curr.etapesuivant.length > 0) {
          for (let j = 0; j < curr.etapesuivant.length; j++) {
            const suiv = curr.etapesuivant[j];
            const suivId = 'etape_' + (suiv.id || `suiv_${j}`).replace(/[^a-zA-Z0-9_]/g, '_');
            const suivLabel = escapeDocs(suiv.libelle, suiv.document).replace(/"/g, "'");
            line += `${currId}["${currLabel}"]-->${suivId}["${suivLabel}"];\n`;
            hasEtapeTransitions = true;
          }
        }
      }
      if (!hasEtapeTransitions) {
        return '';
      }
    }
    return line;
  }
}

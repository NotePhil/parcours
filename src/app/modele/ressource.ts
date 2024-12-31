import { ModalCodebarreService } from "../modules/shared/modal-codebarre/modal-codebarre.service";
import { IAttributs } from "./attributs";
import { IFamille } from "./famille";


export interface IRessource {
    id:string,
    libelle:string,
    etat:boolean,
    seuil:number,
    quantite:number,
    prixEntree:number,
    prixDeSortie:number,
    unite:string,
    famille:IFamille,
    caracteristiques? :
    [
        {
            attribut : IAttributs,
            Valeur: any
        }
    ]
    scanBarCode?: any,
   /* dateCreation:Date,
    dateModification:Date,*/
}

import { IAttributs } from "./attributs";
import { IFamille } from "./famille";


export interface IRessource {
    id:string,
    libelle:string,
    etat:boolean,
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
   /* dateCreation:Date,
    dateModification:Date,*/
}

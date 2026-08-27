import { IAttributs } from "./attributs";
import { IFamille } from "./famille";


export interface IRessource {
    id?: string,
    libelle:string,
    dscription?:string,
    etat:boolean,
    seuilAlerte:number,
    quantite:number,
    prixEntree:number,
    prixSortie:number,
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
   dateCreation?:Date,
    dateModification?:Date,
    version?: string
}

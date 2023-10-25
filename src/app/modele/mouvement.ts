import { IDistributeur } from "./distributeur";
import { IRessource } from "./ressource";

export interface IMouvement {
    id:string,
    description:string,
    quantite:number,
    prix:number,
    dateCreation:Date,
    datePeremption:Date,
    ressource?:IRessource,
    distributeur?:IDistributeur,
}

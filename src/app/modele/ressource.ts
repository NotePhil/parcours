import { ModalCodebarreService } from "../modules/shared/modal-codebarre/modal-codebarre.service";
import { IDistributeur } from "./distributeur";
import { IFamille } from "./famille";
import { Unites } from "./unites";


export interface IRessource {
    id:string,
    libelle:string,
    etat:boolean,
    quantite:number,
    prix:number,
    unite:Unites,
    famille:IFamille,
    caracteristique:string,
    scanBarCode?: any,
   /* dateCreation:Date,
    dateModification:Date,*/
}

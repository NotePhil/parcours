import { IType } from "./type";


export interface IAttributs {
    id:string,
    titre:string,
    description:string,
    etat:boolean,
    dateCreation?:Date,
    dateModification?:Date,
    valeurParDefaut: string,
    type_attribut:IType
}
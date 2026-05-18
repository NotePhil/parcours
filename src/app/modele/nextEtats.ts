import { IEtats } from "./etats";
export interface NextEtats {
     id?: string, 
     ordre: number, 
     etat: IEtats,
     dateCreation: Date 
    }
import { IEtape } from "./etape";

export interface IParcours {
  id:string,
  libelle:string,
  dateCreation?:Date,
  etape:IEtape[]
}

import { IMission } from "./mission"
import { IValidation } from "./validation"

export interface IRole {
  id:string,
  titre:string,
  description:string,
  etat:boolean,
  dateCreation?:Date,
  validations?: IValidation[],
  missions?: {
    mission: IMission,
    etat: boolean,
    dateDebut: Date,
    dateFin?: Date,
    droitAjouter: boolean,
    droitModifier: boolean,
    droitDeValider: boolean,
    droitConsulter: boolean
  }[]
}

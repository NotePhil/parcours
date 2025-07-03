import { IGroupes } from "./groupes";
import { IMenu } from "./menu";
import { IPersonnel } from "./personnel";

export interface IUtilisateurs {
    id: string,
    login: string,
    mdp: string,
    menu?: IMenu,
    groupe?: IGroupes,
    user: IPersonnel,
    roles?: string,
    token?: string,
    dateCreation?: Date,
    dateModification?: Date,
}
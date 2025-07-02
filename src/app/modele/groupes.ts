import { IMenu } from "./menu";

export interface IGroupes {
    id: string;
    etat: string,
    libelle: string,
    menu: IMenu[],
    dateCreation?: Date;
    dateModification?: Date;
}
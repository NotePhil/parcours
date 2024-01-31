import { IRole } from "./role";

export interface IValidation {
    id: string,
    libelle: string,
    code: string,
    roleValidation: IRole,
    dateCreation: Date
}

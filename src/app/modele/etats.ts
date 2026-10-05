import { IDocEtats } from "./doc-etats"

export interface IEtats {
    id?: string,
    libelle: string,
    description: string,
    dateCreation: Date
    docEtats?: IDocEtats[]
}

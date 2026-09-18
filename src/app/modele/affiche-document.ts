import { IDocument } from "./document";

export interface IAfficheDocument extends IDocument {
    listeMissions: string,
    listAttributs: string,
    listCategories: string,
    listPrecoMouvements: string
    listDocumentsAssocies: string
    listDocEtats: string
}

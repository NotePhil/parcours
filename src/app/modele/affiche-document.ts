import { IDocument } from "./document";

export interface IAfficheDocument extends IDocument {
    listeMissions : string,
    listAttributs : string,
    listCategories : string,
    listPrecoMouvements : string
    listSousDocuments : string
    listDocEtats : string
}

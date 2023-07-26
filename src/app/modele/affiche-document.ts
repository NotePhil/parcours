import { IAttributs } from "./attributs";
import { IDocument } from "./document";
import { IMission } from "./mission";

export interface IAfficheDocument extends IDocument {
    id:string,
    titre:string,
    description:string,
    missions : IMission[],
    attributs : IAttributs[],
    listeMissions : string,
    listAttributs : string
}
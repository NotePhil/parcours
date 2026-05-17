import { IDocument } from "./document";


export interface IEtape {
  id?: string,
  etat:boolean,
  libelle:string,
  document: IDocument[],
  etapesuivant?: IEtape[],
  etapeprecedant?: IEtape[]
}

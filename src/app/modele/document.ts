import { IAttributs } from "./attributs";
import { ICategoriesAttributs } from "./categories-attributs";
import { IMission } from "./mission";
import { IPrecoMvt } from "./precomvt";

export interface IDocument {
    id:string,
    titre:string,
    description:string,
    etat:boolean,
    missions : IMission[],
    attributs : IAttributs[],
    categories : ICategoriesAttributs[]
    preconisations : IPrecoMvt[]
}

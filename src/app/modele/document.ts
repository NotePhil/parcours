import { IAttributs } from "./attributs";
import { ICategoriesAttributs } from "./categories-attributs";
import { IMission } from "./mission";
import { IPrecoMvt } from "./precomvt";
import { TypeMvt } from "./type-mvt";

export interface IDocument {
    id:string,
    titre:string,
    description:string,
    etat:boolean,
    typeMouvement: TypeMvt
    affichagePrix:boolean,
    contientRessources:boolean,
    contientDistributeurs:boolean,
    missions : IMission[],
    attributs : IAttributs[],
    categories : ICategoriesAttributs[]
    preconisations : IPrecoMvt[]
    sousDocuments? : IDocument[]
}

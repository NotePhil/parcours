import { IAttributs } from "./attributs";
import { ICategoriesAttributs } from "./categories-attributs";
import { IDocEtats } from "./doc-etats";
import { IMission } from "./mission";
import { IPrecoMvt } from "./precomvt";

export interface IDocument {
    id? : string
    idDocument:string,
    titre:string,
    description:string,
    etat:boolean,
    typeMouvement: string,
    afficherPrix:boolean,
    contientRessources:boolean,
    afficherDistributeur:boolean,
    beneficiaireObligatoire:boolean,
    estencaissable: boolean
    missions : IMission[],
    attributs : IAttributs[],
    categories : ICategoriesAttributs[],
    precoMouvements : IPrecoMvt[],
    sousDocuments? : IDocument[],
    docEtats : IDocEtats[],
    formatCode : string,
}

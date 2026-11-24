import { IAttributs } from "./attributs";
import { ICategoriesAttributs } from "./categories-attributs";
import { IDocEtats } from "./doc-etats";
import { IDocumentsAssocies } from "./documents-associes";
import { IMission } from "./mission";
import { IPrecoMvt } from "./precomvt";

export interface IDocument {
    id?: string
    idDocument?: string,
    titre: string,
    description: string,
    etat: boolean,
    typeMouvement: string,
    afficherPrix: boolean,
    prixEditable: boolean,
    contientRessources: boolean,
    afficherDistributeur: boolean,
    beneficiaireObligatoire: boolean,
    estencaissable: boolean
    missions: IMission[],
    attributs: IAttributs[],
    categories: ICategoriesAttributs[],
    precoMouvements: IPrecoMvt[],
    documentsAssocies?: IDocumentsAssocies[],
    docEtats: IDocEtats[],
    formatCode: string,
}

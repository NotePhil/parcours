import { IAssociationCategorieAttributs } from "./association-categorie-attributs";

export interface ICategoriesAttributs {
    id:string,
    libelle:string,
    ordre : number,
    attributs : IAssociationCategorieAttributs[]
}

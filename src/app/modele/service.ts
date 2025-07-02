export interface IService {
    id:string,
    libelle:string,
    etat:boolean,
    codeUnique?: string,
    dateDerniereModification?: Date,
    dateAttribution?: Date,
    dateFin?: Date,
    nombreTotalAttributions?:number,
    localisation:string,
    description:string,
}

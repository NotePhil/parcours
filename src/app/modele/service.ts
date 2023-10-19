export interface IService {
    id:string,
    libelle:string,
    etat:boolean,
    dateDerniereModification?: Date,
    dateAttribution?: Date,
    dateFin?: Date,
    nombreTotalAttributions?:number,
    description:string,
    localisation:string,
}

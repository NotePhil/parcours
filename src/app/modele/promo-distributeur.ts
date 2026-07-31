import {IDistributeur} from './distributeur'
import { IFamille } from './famille';
import { IRessource } from './ressource';


export interface IPromo {
    distributeur: IDistributeur;
    id?: string;
    dateDebut: Date;
    dateFin: Date;
    codeUnique: string;
    montantRemise: number;
    pourcentageRemise: number;
    dateCreation: Date;
    familles?: IFamille[];
    ressources?: IRessource[];
  }
  
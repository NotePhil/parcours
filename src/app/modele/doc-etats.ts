import { IEtats } from './etats';
import { IValidation } from './validation';
import { IEtape } from './etape';
import { IDocument } from './document';

export interface IDocEtats {
  id?: string;
  etat: IEtats;
  ordre: number;
  dateCreation: Date;
  validation?: IValidation;
  etape?: IEtape;
  document?: IDocument;
  predecesseurDocEtats?: IDocEtats[];
  checked?: boolean;
}

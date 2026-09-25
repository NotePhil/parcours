import { IDocument } from './document';
import { IEtats } from './etats';

/**
 * Interface représentant un document associé et son état rattaché à un document parent.
 * Inclut l'index signature pour la rétrocompatibilité avec la base de données mock.
 */
export interface IDocumentsAssocies {
  id?: string;
  document?: IDocument;
  etat?: IEtats | any;
}

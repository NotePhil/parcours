import { IEtape } from "./etape";

export interface IAfficheEtape extends IEtape {
  listDocumentsAssocies: string,
  listEtapeprecedantes: string
}

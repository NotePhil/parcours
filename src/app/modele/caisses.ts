// Define an interface for the expected structure
export interface DetailsJson {
  x10000?: number;
  x5000?: number;
  x2000?: number;
  x1000?: number;
  x500?: number;
  x500B?: number;
  x100?: number;
  x50?: number;
  x25?: number;
  x10?: number;
  x5?: number;
  x2?: number;
  x1?: number;
  // add other properties as needed
}

export interface ICaisses {
  id?: string,
    type: string,
    etat:boolean,
    solde: number,
    libelle: string,
    detailsJson?: DetailsJson,
    version?: string
}
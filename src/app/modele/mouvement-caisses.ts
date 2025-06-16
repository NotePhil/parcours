import { float } from "@zxing/library/esm/customTypings";
import { DetailsJson, ICaisses } from "./caisses";
import { IComptes } from "./comptes";
import { IExemplaireDocument } from "./exemplaire-document";
import { IPatient } from "./Patient";

export interface IMouvementCaisses {
    id: string,
    etat: boolean,
    montant: float,
    libelle: string,
    typeMvt: string,
    dateCreation: Date,
    detailJson?: DetailsJson,
    moyenPaiement: ICaisses,
    isMultipaiement?: string,
    referencePaiement: string,
    compte?: IComptes,
    personnel?: IPatient,
    exemplaire?: IExemplaireDocument
}

export interface MoyenPaiement {
    moyen: ICaisses,
    montant: float,
    reference: string
}
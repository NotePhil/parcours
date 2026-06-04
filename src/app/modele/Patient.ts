export interface IPatient {
  id?: string;
  nom: string;
  raisonSociale?: string;
  prenom?: string;
  sexe?: string;
  dateNaissance?: Date;
  adresse: string;
  mail: string;
  telephone: string;
  type: string;
  qrCodeValue: string;
  personnesRatachees?: IPatient[];
}

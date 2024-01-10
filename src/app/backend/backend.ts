
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IAttributs } from '../modele/attributs';
import { IDocument } from '../modele/document';
import { IFonctionnalites } from '../modele/fonctionnalites';
import { IMenus } from '../modele/menus';
import { IMission } from '../modele/mission';
import { IPatient } from '../modele/Patient';
import { IService } from '../modele/service';
import { StatutTicket } from '../modele/statut-ticket';
import { ITicket } from '../modele/ticket';
import { IType } from '../modele/type';
import { IExemplaireDocument } from '../modele/exemplaire-document';
import { IFamille } from '../modele/famille';
import { IRessource } from '../modele/ressource';
import { IPrecoMvt } from "../modele/precomvt";
import { IDistributeur } from "../modele/distributeur";
import { IRole } from '../modele/role';
import { IPersonnel } from '../modele/personnel';
import { TypeAttribut } from '../modele/type-attributs';
import { TypeUnite } from '../modele/type-unite';
import { TypeMvt } from '../modele/type-mvt';

export class InMemDBService implements InMemoryDbService {

  createDb() {
    let patients: IPatient[] = [
      {
        id: '1',
        nom: 'NGONGANG',
        prenom: 'Philippe',
        sexe: 'M',
        adresse: 'Yaoundé',
        telephone: '090999090',
        mail: 'ngong@yad.fr',
        dateNaissance: new Date('07/07/1989'),
      },
      {
        id: '2',
        nom: 'Ouandji',
        prenom: 'tre',
        sexe: 'F',
        adresse: 'Douala',
        telephone: '090999091',
        mail: 'ouang@yad.fr',
        dateNaissance: new Date('07/03/1990'),
      },
      {
        id: '3',
        nom: 'Oum',
        prenom: 'tre',
        sexe: 'F',
        adresse: 'Douala',
        telephone: '090999091',
        mail: 'ouang@yad.fr',
        dateNaissance: new Date('07/03/1990'),
      },
      {
        id: '4',
        nom: 'Oubian',
        prenom: 'tre',
        sexe: 'F',
        adresse: 'Douala',
        telephone: '090999091',
        mail: 'ouang@yad.fr',
        dateNaissance: new Date('07/03/1990'),
      },
      {
        id: '5',
        nom: 'Oum',
        prenom: 'boy',
        sexe: 'F',
        adresse: 'Douala',
        telephone: '090999091',
        mail: 'ouang@yad.fr',
        dateNaissance: new Date('07/03/1990'),
      },
      {
        id: '6',
        nom: 'Oubian',
        prenom: 'junior',
        sexe: 'F',
        adresse: 'Douala',
        telephone: '090999091',
        mail: 'ouang@yad.fr',
        dateNaissance: new Date('07/03/1990'),
      },
      {
        id: '7',
        nom: 'Oubian',
        prenom: 'senior',
        sexe: 'F',
        adresse: 'Douala',
        telephone: '090999091',
        mail: 'ouang@yad.fr',
        dateNaissance: new Date('07/03/1990'),
      },
      {
        id: '8',
        nom: 'Oubian',
        prenom: 'midelle',
        sexe: 'F',
        adresse: 'Douala',
        telephone: '090999091',
        mail: 'ouang@yad.fr',
        dateNaissance: new Date('07/03/1990'),
      },
      {
        id: '9',
        nom: 'Oubian',
        prenom: 'tresor',
        sexe: 'F',
        adresse: 'Douala',
        telephone: '090999091',
        mail: 'ouang@yad.fr',
        dateNaissance: new Date('07/03/1990'),
      },
    ];
    let services: IService[] = [
      {
        id: '1',
        libelle: 'Pharmacie',
        etat: true,
        dateDerniereModification: new Date('07/03/2000'),
        dateAttribution: new Date('07/03/1990'),
        dateFin: new Date('07/03/1990'),
        nombreTotalAttributions: 6,
        localisation:'douala',
        description:'bien',
      },
      {
        id: '2',
        libelle: 'Laboratoire',
        etat: true,
        dateDerniereModification: new Date('06/08/1990'),
        dateAttribution: new Date('07/03/1990'),
        dateFin: new Date('07/03/1990'),
        nombreTotalAttributions: 20,
        localisation:'douala',
        description:'bien',
      },
      {
        id: '3',
        libelle: 'Consultation',
        etat: true,
        dateDerniereModification: new Date('12/06/1972'),
        dateAttribution: new Date('07/03/1990'),
        dateFin: new Date('07/03/1990'),
        nombreTotalAttributions: 50,
        localisation:'douala',
        description:'bien',
      },
    ];
    let tickets: ITicket[] = [
      {
        id: '1',
        idUnique: '20221206S1A01',
        date_heure: new Date('01/13/2022'),
        idFileAttente: 'S1A01',
        idPersonne: '1',
        statut: StatutTicket.traite,
      },
      {
        id: '2',
        idUnique: '20221206S1A02',
        date_heure: new Date('01/12/2021'),
        idFileAttente: 'S1A01',
        idPersonne: '2',
        statut: StatutTicket.actif,
      },
      {
        id: '3',
        idUnique: '20221206S1A01',
        date_heure: new Date('01/11/2020'),
        idFileAttente: 'S1A02',
        idPersonne: '1',
        statut: StatutTicket.actif,
      },
      {
        id: '4',
        idUnique: '20221206S1A02',
        date_heure: new Date('01/14/2023'),
        idFileAttente: 'S1A02',
        idPersonne: '2',
        statut: StatutTicket.traite,
      },
      {
        id: '5',
        idUnique: '20221206S1A03',
        date_heure: new Date('01/11/2019'),
        idFileAttente: 'S1A03',
        idPersonne: '1',
        statut: StatutTicket.actif,
      },
      {
        id: '6',
        idUnique: '20221206S1A04',
        date_heure: new Date('01/14/2018'),
        idFileAttente: 'S1A04',
        idPersonne: '2',
        statut: StatutTicket.actif,
      },
      {
        id: '7',
        idUnique: '20221206S1A03',
        date_heure: new Date('01/11/2018'),
        idFileAttente: 'S1A03',
        idPersonne: '1',
        statut: StatutTicket.actif,
      },
      {
        id: '8',
        idUnique: '20221206S1A04',
        date_heure: new Date('01/14/2017'),
        idFileAttente: 'S1A04',
        idPersonne: '2',
        statut: StatutTicket.actif,
      },
      {
        id: '9',
        idUnique: '20221206S1A05',
        date_heure: new Date('01/11/2017'),
        idFileAttente: 'S1A05',
        idPersonne: '1',
        statut: StatutTicket.actif,
      },
      {
        id: '10',
        idUnique: '20221206S1A06',
        date_heure: new Date('01/14/2016'),
        idFileAttente: 'S1A06',
        idPersonne: '2',
        statut: StatutTicket.actif,
      },
    ];
    let menus: IMenus[] = [
      {
        idUser: 'phil',
        langue: 'fr',
        fonctionnalites: [
          {
            fonction:'Personne',
            icone: 'fas fa-user-cog',
            actif: 'menu-close',
            elements: [
              { nom: 'Créer', lien: 'patient-nouveau', bouton: 'false' },
              { nom: 'Rechercher', lien: 'list-patients', bouton: 'false' },
            ],
          },
          {
            fonction: 'Personnel',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              { nom: 'Créer', lien: './nouveau-personnel', bouton: 'false' },
              { nom: 'Rechercher', lien: './list-personnels', bouton: 'false' },
            ],
          },
          {
            fonction: 'Service',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              { nom: 'Créer', lien: './service-nouveau', bouton: 'false' },
              { nom: 'Rechercher', lien: './list-services', bouton: 'false' },
            ],
          },
          {
            fonction: 'Ticket',
            icone: 'fas fa-chart-pie',
            actif: '',
            elements: [
              { nom: 'Rechercher', lien: 'list-tickets', bouton: 'false' },
              {
                nom: 'Afficher le panneau',
                lien: 'panneau-tickets',
                bouton: 'false',
              },
            ],
          },
          {
            fonction: 'Attribut',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              { nom: 'Créer', lien: './attribut-nouveau', bouton: 'false' },
              { nom: 'Rechercher', lien: './list-attributs', bouton: 'false' },
            ],
          },
          {
            fonction: 'Mission',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              { nom: 'Créer', lien: './mission-nouveau', bouton: 'false' },
              { nom: 'Rechercher', lien: './list-missions', bouton: 'false' },
              { nom: 'Exécuter', lien: './executer-missions', bouton: 'false' },
            ],
          },
          {
            fonction: 'Documents',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              {
                nom: 'Créer model documents',
                lien: './document-nouveau',
                bouton: 'false',
              },
              { nom: 'Rechercher', lien: './list-documents', bouton: 'false' },
              {
                nom: 'Creer un exemplaire',
                lien: 'exemplaire-nouveau/1',
                bouton: 'false',
              },
              {
                nom: 'liste des exemplaires',
                lien: './list-exemplaire',
                bouton: 'false',
              },
            ],
          },
          {
            fonction: 'Famille',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              { nom: 'Créer', lien: 'famille-nouvelle', bouton: 'false' },
              { nom: 'Rechercher', lien: './list-familles', bouton: 'false' },
            ],
          },
          {"fonction":"Role", "icone":"fas fa-user-cog", "actif":"", "elements":[{"nom":"Créer", "lien":"role-nouveau", "bouton":"false"},{"nom":"Rechercher", "lien":"./list-roles", "bouton":"false"}]},
          {
            fonction: 'Ressource',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              { nom: 'Créer', lien: 'ressource-nouvelle', bouton: 'false' },
              { nom: 'Rechercher', lien: './list-ressources', bouton: 'false' },
            ],
          },
          {
            fonction: 'Préconisations',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              { nom: 'Créer', lien: 'precomvt-nouvelle', bouton: 'false' },
              { nom: 'Rechercher', lien: './list-precomvts', bouton: 'false' },
            ],
          },
          {
            fonction: 'Distributeur',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              { nom: 'Créer', lien: 'distributeur-nouveau', bouton: 'false' },
              {
                nom: 'Rechercher',
                lien: './list-distributeurs',
                bouton: 'false',
              },
            ],
          }
        ]
      },
      {
        idUser: 'phil',
        langue: 'en',
        fonctionnalites: [
          {
            fonction: 'People',
            icone: 'fas fa-user-cog',
            actif: 'menu-close',
            elements: [
              { nom: 'New', lien: 'patient-nouveau', bouton: 'false' },
              { nom: 'Search', lien: 'list-patients', bouton: 'false' },
            ],
          },
          {
            fonction: 'Service',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              { nom: 'New', lien: './service-nouveau', bouton: 'false' },
              { nom: 'Search', lien: './list-services', bouton: 'false' },
            ],
          },
          {
            fonction: 'Ticket',
            icone: 'fas fa-chart-pie',
            actif: '',
            elements: [
              { nom: 'Search', lien: 'list-tickets', bouton: 'false' },
              { nom: 'View panel', lien: 'panneau-tickets', bouton: 'false' },
            ],
          },
          {
            fonction: 'Attribut',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              { nom: 'New', lien: './attribut-nouveau', bouton: 'false' },
              { nom: 'Search', lien: './list-attributs', bouton: 'false' },
            ],
          },
          {
            fonction: 'Mission',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              { nom: 'New', lien: './mission-nouveau', bouton: 'false' },
              { nom: 'Search', lien: './list-missions', bouton: 'false' },
              { nom: 'Execute', lien: './executer-missions', bouton: 'false' },
            ],
          },
          {
            fonction: 'Documents',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              {
                nom: "New document's model",
                lien: './document-nouveau',
                bouton: 'false',
              },
              { nom: 'Search', lien: './list-documents', bouton: 'false' },
              {
                nom: 'Creat an exemplaire',
                lien: 'exemplaire-nouveau/1',
                bouton: 'false',
              },
              {
                nom: 'list of exemplaires',
                lien: './list-exemplaire',
                bouton: 'false',
              },
            ],
          },
          {
            fonction: 'Famille',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              { nom: 'new', lien: 'famille-nouvelle', bouton: 'false' },
              { nom: 'Search', lien: './list-familles', bouton: 'false' },
            ],
          },
         {"fonction":"Role", "icone":"fas fa-user-cog", "actif":"", "elements":[{"nom":"Créer", "lien":"role-nouveau", "bouton":"false"},{"nom":"search", "lien":"./list-roles", "bouton":"false"}]},
          {
            fonction: 'Ressource',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              { nom: 'Créer', lien: 'ressource-nouvelle', bouton: 'false' },
              { nom: 'Search', lien: './list-ressources', bouton: 'false' },
            ],
          },
          {
            fonction: 'Préconisations',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              { nom: 'Créer', lien: 'precomvt-nouvelle', bouton: 'false' },
              { nom: 'Search', lien: './list-precomvts', bouton: 'false' },
            ],
          },
          {
            fonction: 'Distributeur',
            icone: 'fas fa-user-cog',
            actif: '',
            elements: [
              { nom: 'Créer', lien: 'distributeur-nouveau', bouton: 'false' },
              { nom: 'search', lien: './list-distributeurs', bouton: 'false' },
            ],
          }
        ]
      },
    ];
    let missions: IMission[] = [
      {
        id: '1',
        libelle: 'Consultation',
        description: 'Consultation faite par une infirmière',
        etat: true,
        dateCreation: new Date('07/03/2000'),
        dateModification: new Date('07/03/1990'),
        idLogin: 'admin',
        service: {
          id: '1',
          libelle: 'Pharmacie',
          etat: true,
          dateDerniereModification: new Date('07/03/2000'),
          dateAttribution: new Date('07/03/1990'),
          dateFin: new Date('07/03/1990'),
          nombreTotalAttributions: 6,
          localisation:'douala',
          description:'bien',
        },
      },
      {
        id: '2',
        libelle: 'Consultation Spécialiste',
        description: 'Consultation faite par un médecin',
        etat: true,
        dateCreation: new Date('07/03/2000'),
        dateModification: new Date('07/03/1990'),
        idLogin: 'admin',
        service: {
          id: '2',
          libelle: 'Laboratoire',
          etat: true,
          dateDerniereModification: new Date('06/08/1990'),
          dateAttribution: new Date('07/03/1990'),
          dateFin: new Date('07/03/1990'),
          nombreTotalAttributions: 20,
          localisation:'douala',
          description:'bien',
        },
      },
      {
        id: '3',
        libelle: 'Prelevement Labo',
        description: 'Prélévement fait par laboratoire',
        etat: true,
        dateCreation: new Date('07/03/2000'),
        dateModification: new Date('07/03/1990'),
        idLogin: 'admin',
        service: {
          id: '3',
          libelle: 'Consultation',
          etat: true,
          dateDerniereModification: new Date('12/06/1972'),
          dateAttribution: new Date('07/03/1990'),
          dateFin: new Date('07/03/1990'),
          nombreTotalAttributions: 50,
          localisation:'douala',
          description:'bien',
        },
      },
      {
        id: '4',
        libelle: 'Encaissement',
        description: 'recu de paiement lié à une mission',
        etat: true,
        dateCreation: new Date('07/03/2000'),
        dateModification: new Date('07/03/1990'),
        idLogin: 'admin',
        service: {
          id: '1',
          libelle: 'Pharmacie',
          etat: true,
          dateDerniereModification: new Date('07/03/2000'),
          dateAttribution: new Date('07/03/1990'),
          dateFin: new Date('07/03/1990'),
          nombreTotalAttributions: 6,
          localisation:'douala',
          description:'bien',
        },
      },
      {
        id: '5',
        libelle: 'Resultat Labo',
        description: 'Communiquer les résultats du labo aux patients',
        etat: true,
        dateCreation: new Date('07/03/2000'),
        dateModification: new Date('07/03/1990'),
        idLogin: 'admin',
        service: {
          id: '3',
          libelle: 'Consultation',
          etat: true,
          dateDerniereModification: new Date('12/06/1972'),
          dateAttribution: new Date('07/03/1990'),
          dateFin: new Date('07/03/1990'),
          nombreTotalAttributions: 50,
          localisation:'douala',
          description:'bien',
        },
      },
      {
        id: '6',
        libelle: 'Hospitalisation',
        description: "bon d'entrée et de sortie est une mission",
        etat: true,
        dateCreation: new Date('07/03/2000'),
        dateModification: new Date('07/03/1990'),
        idLogin: 'admin',
        service: {
          id: '1',
          libelle: 'Pharmacie',
          etat: true,
          dateDerniereModification: new Date('07/03/2000'),
          dateAttribution: new Date('07/03/1990'),
          dateFin: new Date('07/03/1990'),
          nombreTotalAttributions: 6,
          localisation:'douala',
          description:'bien',
        },
      },
    ];
    let attributs: IAttributs[] = [
      { id: '1', titre: 'taille',description: "taille de l'individu",etat: true,dateCreation: new Date('07/03/2000'),dateModification: new Date('07/03/1990'),type: IType.String, valeursParDefaut: '',},
      {id: '2',titre: 'poids',description: "poids de l'individu",etat: true,dateCreation: new Date('07/03/2000'),dateModification: new Date('07/03/1990'),type: IType.Double, valeursParDefaut: '',},
      {id: '3', titre: 'sexe',description: "sexe de l'individu", etat: true, dateCreation: new Date('07/03/2000'), dateModification: new Date('07/03/1990'),type: IType.Boolean,valeursParDefaut: 'Homme, Femme, Autre',},
      {id: '4',titre: 'age',description: "age de l'individu",etat: true,dateCreation: new Date('07/03/2000'),dateModification: new Date('07/03/1990'),type: IType.Double, valeursParDefaut: '',},
      { id: '5', titre: 'allergies',description: "allergies de l'individu",etat: true,dateCreation: new Date('07/03/2000'),dateModification: new Date('07/03/1990'),type: IType.String,valeursParDefaut: '',},
      { id: '6', titre: 'teint',description: "teint de l'individu",etat: true,dateCreation: new Date('07/03/2000'), dateModification: new Date('07/03/1990'),type: IType.String, valeursParDefaut: '',},
      {id: '7', titre: 'Groupe sangin', description: "Groupe sangin de l'individu",etat: true,dateCreation: new Date('07/03/2000'), dateModification: new Date('07/03/1990'),type: IType.Boolean,valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',},
      { id: '8',titre: 'cicatrice',description: "cicatrice de l'individu",etat: true,dateCreation: new Date('07/03/2000'),dateModification: new Date('07/03/1990'),type: IType.Boolean, valeursParDefaut: 'oui, non',},
      {id: '9', titre: 'date admission', description: "date admission de l'individu",etat: true,dateCreation: new Date('07/03/2000'),dateModification: new Date('07/03/1990'),type: IType.Date,valeursParDefaut: '',},
      {id: '10', titre: 'date decharge', description: 'date decharge',etat: true,dateCreation: new Date('07/03/2000'), dateModification: new Date('07/03/1990'),type: IType.Date,valeursParDefaut: '',},
      {id: '11', titre: 'date prochain rendez-vous',description: "date prochain rendez-vous de l'individu",etat: true,dateCreation: new Date('07/03/2000'),dateModification: new Date('07/03/1990'),type: IType.Date, valeursParDefaut: '',},
      { id: '12', titre: 'aprobation du medecin', description: 'aprobation du medecin', etat: true,dateCreation: new Date('07/03/2000'), dateModification: new Date('07/03/1990'),type: IType.Boolean, valeursParDefaut: 'oui, non',},
      {id: '13',titre: 'motif de la decharge',description: 'motif de la decharge ',etat: true,dateCreation: new Date('07/03/2000'),dateModification: new Date('07/03/1990'),type: IType.Textarea,valeursParDefaut: '',},
      {id: '14',titre: 'nom',description: "nom de l'individu", etat: true,dateCreation: new Date('07/03/2000'),dateModification: new Date('07/03/1990'),type: IType.String, valeursParDefaut: '',},
    ];
    let documents: IDocument[] = [
      {
        id: '1',
        titre: 'Note intervention',
        description:
          "Document delivre par le medecin ou un infirmier de l'etablissement",
        typeMouvement: 'Ajout',
        etat:true,
        affichagePrix:true,
        contientRessources:true,
        contientDistributeurs:true,
        missions: [
          {
            id: '1',
            libelle: 'Consultation',
            description: 'Consultation faite par une infirmière',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '1',
              libelle: 'Pharmacie',
              etat: true,
              dateDerniereModification: new Date('07/03/2000'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 6,
              localisation:'douala',
              description:'bien',
            },
          },
          {
            id: '2',
            libelle: 'Consultation Spécialiste',
            description: 'Consultation faite par un médecin',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '2',
              libelle: 'Laboratoire',
              etat: true,
              dateDerniereModification: new Date('06/08/1990'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 20,
              localisation:'douala',
              description:'bien',
            },
          },
          {
            id: '3',
            libelle: 'Prelevement Labo',
            description: 'Prélévement fait par laboratoire',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '3',
              libelle: 'Consultation',
              etat: true,
              dateDerniereModification: new Date('12/06/1972'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 50,
              localisation:'douala',
              description:'bien',
            },
          },
        ],
        attributs: [
          {
            id: '1',
            titre: 'taille',
            description: "taille de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.String,
            valeursParDefaut: '',

          },
          {
            id: '4',
            titre: 'age',
            description: "age de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Double,
            valeursParDefaut: '',

          },
          {
            id: '5',
            titre: 'allergies',
            description: "allergies de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.String,
            valeursParDefaut: '',

          },
          {
            id: '6',
            titre: 'teint',
            description: "teint de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.String,
            valeursParDefaut: '',

          },
          {
            id: '7',
            titre: 'Groupe sangin',
            description: "Groupe sangin de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            type: IType.Boolean,
            valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
          },
          {
            id: '8',
            titre: 'cicatrice',
            description: "cicatrice de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            type: IType.Boolean,
            valeursParDefaut: 'oui, non',
          },
        ],
        categories: [
          {
            id: '1',
            nom: 'informations personelles',
            ordre: 1,
            listAttributsParCategories: [
              {
                id: '1',
                ordre: 11,
                obligatoire: false,
                attribut:{
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

                }
              },
              {

                id: '1',
                ordre: 12,
                obligatoire: false,
                attribut:{id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Int,
                valeursParDefaut: '',}

              },
              {
                id: '1',
                ordre: 13,
                obligatoire: false,
                attribut:{id: '6',
                titre: 'teint',
                description: "teint de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',}

              },
            ],
          },
          {
            id: '2',
            nom: 'informations de sante',
            ordre: 2,
            listAttributsParCategories: [
              {
                id: '1',
                ordre: 1,
                obligatoire: false,
                attribut:{id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',}

              },
              {
                id: '1',
                ordre: 2,
                obligatoire: false,
                attribut:{id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut:
                  'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
              },
              {
                id: '1',
                ordre: 3,
                obligatoire: false,
                attribut:{id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',}
              },
            ],
          },
        ],
        preconisations:[
          {
            id: '1',
            libelle: 'rachat',
            etat:true,
            type: 'Neutre',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 10,
                quantiteMax: 20,
                montantMin: 1000,
                montantMax: 7000,
                ressource: {
                  id: '1',
                  libelle: 'transfusion',
                  etat: true,
                  quantite: 10,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                },
              },
              {
                id: '2',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
              },
              {
                id: '3',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                ressource:
                {
                  id: '3',
                  libelle: 'pediatrie',
                  etat: true,
                  quantite: 30,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                }
              },
              {
                id: '4',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                ressource:
                {
                    id: '2',
                    libelle: 'Medical',
                    etat: true,
                    quantite: 20,
                    prixEntree: 2000,
                    prixDeSortie: 2050,
                    unite: 'Litre',
                    
                    caracteristique: 'souple',
                    famille: {
                      id: '3',
                      libelle: 'pediatrie',
                      description: 'enfant',
                      etat: true,
                    },
                  },
              },
            ],
          },
          {
            id: '2',
            libelle: 'vente',
            etat:true,
            type: 'Reduire',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
              },
            ],
          },
          {
            id: '3',
            libelle: 'vente',
            etat:true,
            type: 'Reduire',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
                ressource: {
                  id: '1',
                  libelle: 'transfusion',
                  etat: true,
                  quantite: 10,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                },
                distributeur: [
                  {
                    id: '1',
                    raisonSocial: 'brasserie1',
                    etat: true,
                    adresse: 'Dla',
                    telephone: '655554488',
                    mail: 'ngong@yad.fr',
                  },
                  {
                    id: '2',
                    raisonSocial: 'guinness',
                    etat: true,
                    adresse: 'Ydé',
                    telephone: '655554481',
                    mail: 'ngong@yad.fr',
                  },
                  {
                    id: '3',
                    raisonSocial: 'papeterie yvan',
                    etat: true,
                    adresse: 'Buéa',
                    telephone: '655554486',
                    mail: 'ngong@yad.fr',
                  },
                ],
              },
            ],
          }
        ],
        sousDocuments:[
          {
            id: '1',
            titre: 'Note intervention',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
            typeMouvement: 'Ajout',
              etat:true,
              affichagePrix:true,
              contientRessources:true,
              contientDistributeurs:true,
            missions: [
              {
                id: '1',
                libelle: 'Consultation',
                description: 'Consultation faite par une infirmière',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '3',
                libelle: 'Prelevement Labo',
                description: 'Prélévement fait par laboratoire',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',
              },
              {
                id: '6',
                titre: 'teint',
                description: "teint de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.String,
                valeursParDefaut: '',
              },
              {
                id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',

              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '1',
                    ordre: 11,
                    obligatoire: false,
                    attribut:{
                    id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',

                    }
                  },
                  {

                    id: '1',
                    ordre: 12,
                    obligatoire: false,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Int,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '1',
                    ordre: 13,
                    obligatoire: false,
                    attribut:{id: '6',
                    titre: 'teint',
                    description: "teint de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '1',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '1',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '7',
                    titre: 'Groupe sangin',
                    description: "Groupe sangin de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut:
                      'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
                  },
                  {
                    id: '1',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          },
          {
            id: '2',
            titre: 'Fiche de suivi',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
            typeMouvement: 'Ajout',
            etat:true,
            affichagePrix:true,
            contientRessources:true,
            contientDistributeurs:true,
            missions: [
              {
                id: '1',
                libelle: 'Consultation',
                description: 'Consultation faite par une infirmière',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '3',
                libelle: 'Prelevement Labo',
                description: 'Prélévement fait par laboratoire',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '6',
                titre: 'teint',
                description: "teint de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'true, false',
              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '1',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '2',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '3',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '6',
                    titre: 'teint',
                    description: "teint de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '7',
                    titre: 'Groupe sangin',
                    description: "Groupe sangin de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut:
                      'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                type: 'Reduire',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                type: 'Reduire',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          },
          {
            id: '3',
            titre: 'Fiche de soin',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
              typeMouvement: 'Neutre',
              etat:true,
              affichagePrix:true,
              contientRessources:true,
              contientDistributeurs:true,
            missions: [
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '3',
                libelle: 'Prelevement Labo',
                description: 'Prélévement fait par laboratoire',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '4',
                libelle: 'Encaissement',
                description: 'recu de paiement lié à une mission',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',
              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'true, false',
              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      unite: 'Litre',
                      prixDeSortie: 2000,
                      prixEntree: 1300,
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixDeSortie: 2000,
                      prixEntree: 1300,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixDeSortie: 2000,
                        prixEntree: 1300,
                        unite: 'Litre',
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                type: 'Reduire',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                type: 'Reduire',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      unite: 'Litre',
                      prixDeSortie: 2000,
                      prixEntree: 1300,
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          },
          {
            id: '4',
            titre: 'Formulaire de sortie',
            typeMouvement: 'Ajout',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
              etat:true,
              affichagePrix:true,
              contientRessources:true,
              contientDistributeurs:true,
            missions: [
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '3',
                libelle: 'Prelevement Labo',
                description: 'Prélévement fait par laboratoire',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '4',
                libelle: 'Encaissement',
                description: 'recu de paiement lié à une mission',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '14',
                titre: 'Nom',
                description: "nom de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: ''
              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.String,
                valeursParDefaut: ''
              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'true, false',
              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Double,
                    valeursParDefaut: ''}
                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Double,
                    valeursParDefaut: ''}
                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.String,
                    valeursParDefaut: ''}
                  },
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                type: 'Neutre',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'néonat',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'trans', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource: 
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'néonat',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'néonat',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',
                        
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                type: 'Reduire',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'trans', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'néonat',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                type: 'Reduire',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'trans', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'néonat',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'néonat',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          },
          {
            id: '4',
            titre: 'Formulaire de sortie',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
              typeMouvement: 'Reduire',
              etat:true,
              affichagePrix:true,
              contientRessources:true,
              contientDistributeurs:true,
            missions: [
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '3',
                libelle: 'Prelevement Labo',
                description: 'Prélévement fait par laboratoire',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '4',
                libelle: 'Encaissement',
                description: 'recu de paiement lié à une mission',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '14',
                titre: 'Nom',
                description: "nom de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.String,
                valeursParDefaut: ''
              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Double,
                valeursParDefaut: ''
              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.String,
                valeursParDefaut: ''
              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'true, false',
              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Double,
                    valeursParDefaut: ''}
                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Double,
                    valeursParDefaut: ''}
                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.String,
                    valeursParDefaut: ''}
                  },
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                type: 'Neutre',
                etat: true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      unite: 'Litre',
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'néonat',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'trans', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'néonat',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource: 
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      unite: 'Litre',
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'néonat',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'néonat',
                        etat: true,
                        quantite: 20,
                        unite: 'Litre',
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                type: 'Reduire',
                etat: true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'trans', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'néonat',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                type: 'Reduire',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'trans', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'néonat',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      unite: 'Litre',
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'néonat',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          },
          {
            id: '4',
            titre: 'Formulaire de sortie',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
            etat:true,
            affichagePrix:true,
            contientRessources:true,
            contientDistributeurs:true,
            typeMouvement: 'Ajout',
            missions: [
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '3',
                libelle: 'Prelevement Labo',
                description: 'Prélévement fait par laboratoire',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '4',
                libelle: 'Encaissement',
                description: 'recu de paiement lié à une mission',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '14',
                titre: 'Nom',
                description: "nom de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.String,
                valeursParDefaut: ''
              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Double,
                valeursParDefaut: ''
              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Textarea,
                valeursParDefaut: ''
              },
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',
              },
              {
                id: '9',
                titre: 'date admission',
                description: "date admission de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',

              },
              {
                id: '10',
                titre: 'date decharge',
                description: 'date decharge',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',

              },
              {
                id: '11',
                titre: 'date prochain rendez-vous',
                description: "date prochain rendez-vous de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',

              },
              {
                id: '12',
                titre: 'aprobation du medecin',
                description: 'aprobation du medecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',
              },
              {
                id: '13',
                titre: 'motif de la decharge',
                description: 'motif de la decharge ',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Textarea,
                valeursParDefaut: '',

              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '14',
                    titre: 'Nom',
                    description: "nom de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: true,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: true,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 3,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '7',
                    titre: 'Groupe sangin',
                    description: "Groupe sangin de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut:
                      'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
              {
                id: '3',
                nom: 'informations de suivi medical',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '9',
                    titre: 'date admission',
                    description: "date admission de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Date,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '10',
                    titre: 'date decharge',
                    description: 'date decharge',
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Date,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '11',
                    titre: 'date prochain rendez-vous',
                    description: "date prochain rendez-vous de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Date,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 4,
                    obligatoire: false,
                    attribut:{id: '12',
                    titre: 'aprobation du medecin',
                    description: 'aprobation du medecin',
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                  {
                    id: '',
                    ordre: 5,
                    obligatoire: false,
                    attribut:{id: '13',
                    titre: 'motif de la decharge',
                    description: 'motif de la decharge ',
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Textarea,
                    valeursParDefaut: '',}

                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          },
          {
            id: '5',
            titre: 'ordonnance',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
              typeMouvement: 'Neutre',
              etat:true,
              affichagePrix:true,
              contientRessources:true,
              contientDistributeurs:true,
            missions: [
              {
                id: '1',
                libelle: 'Consultation',
                description: 'Consultation faite par une infirmière',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '5',
                libelle: 'Resultat Labo',
                description: 'Communiquer les résultats du labo aux patients',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '6',
                titre: 'teint',
                description: "teint de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',
              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '6',
                    titre: 'teint',
                    description: "teint de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 0,
                    obligatoire: false,
                    attribut:{id: '7',
                    titre: 'Groupe sangin',
                    description: "Groupe sangin de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut:
                      'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',
                        
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          }
        ]
      },
      {
        id: '2',
        titre: 'Fiche de suivi',
        description:
          "Document delivre par le medecin ou un infirmier de l'etablissement",
        typeMouvement: 'Ajout',
        etat:false,
        affichagePrix:true,
        contientRessources:false,
        contientDistributeurs:false,
        missions: [
          {
            id: '1',
            libelle: 'Consultation',
            description: 'Consultation faite par une infirmière',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '1',
              libelle: 'Pharmacie',
              etat: true,
              dateDerniereModification: new Date('07/03/2000'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 6,
              localisation:'douala',
              description:'bien',
            },
          },
          {
            id: '3',
            libelle: 'Prelevement Labo',
            description: 'Prélévement fait par laboratoire',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '3',
              libelle: 'Consultation',
              etat: true,
              dateDerniereModification: new Date('12/06/1972'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 50,
              localisation:'douala',
              description:'bien',
            },
          },
          {
            id: '2',
            libelle: 'Consultation Spécialiste',
            description: 'Consultation faite par un médecin',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '2',
              libelle: 'Laboratoire',
              etat: true,
              dateDerniereModification: new Date('06/08/1990'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 20,
              localisation:'douala',
              description:'bien',
            },
          },
        ],
        attributs: [
          {
            id: '1',
            titre: 'taille',
            description: "taille de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Double,
            valeursParDefaut: '',

          },
          {
            id: '6',
            titre: 'teint',
            description: "teint de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.String,
            valeursParDefaut: '',

          },
          {
            id: '8',
            titre: 'cicatrice',
            description: "cicatrice de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            type: IType.Boolean,
            valeursParDefaut: 'true, false',
          },
          {
            id: '4',
            titre: 'age',
            description: "age de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Double,
            valeursParDefaut: '',

          },
          {
            id: '7',
            titre: 'Groupe sangin',
            description: "Groupe sangin de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            type: IType.Boolean,
            valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
          },
          {
            id: '5',
            titre: 'allergies',
            description: "allergies de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.String,
            valeursParDefaut: '',

          },
        ],
        categories: [
          {
            id: '1',
            nom: 'informations personelles',
            ordre: 1,
            listAttributsParCategories: [
              {
                id: '1',
                ordre: 2,
                obligatoire: false,
                attribut:{id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',}

              },
              {
                id: '2',
                ordre: 1,
                obligatoire: false,
                attribut:{id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',}

              },
              {
                id: '3',
                ordre: 3,
                obligatoire: false,
                attribut:{id: '6',
                titre: 'teint',
                description: "teint de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',}

              },
            ],
          },
          {
            id: '2',
            nom: 'informations de sante',
            ordre: 2,
            listAttributsParCategories: [
              {
                id: '',
                ordre: 2,
                obligatoire: false,
                attribut:{id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',}

              },
              {
                id: '',
                ordre: 1,
                obligatoire: false,
                attribut:{id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut:
                  'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
              },
              {
                id: '',
                ordre: 3,
                obligatoire: false,
                attribut:{id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',}
              },
            ],
          },
        ],
        preconisations:[
          {
            id: '1',
            libelle: 'rachat',
            etat:true,
            type: 'Neutre',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 10,
                quantiteMax: 20,
                montantMin: 1000,
                montantMax: 7000,
                ressource: {
                  id: '1',
                  libelle: 'transfusion',
                  etat: true,
                  quantite: 10,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                },
              },
              {
                id: '2',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
              },
              {
                id: '3',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                ressource:
                {
                  id: '3',
                  libelle: 'pediatrie',
                  etat: true,
                  quantite: 30,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                }
              },
              {
                id: '4',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                ressource:
                {
                    id: '2',
                    libelle: 'Medical',
                    etat: true,
                    quantite: 20,
                    prixEntree: 2000,
                    prixDeSortie: 2050,
                    unite: 'Litre',
                    caracteristique: 'souple',
                    famille: {
                      id: '3',
                      libelle: 'pediatrie',
                      description: 'enfant',
                      etat: true,
                    },
                  },
              },
            ],
          },
          {
            id: '2',
            libelle: 'vente',
            etat:true,
            type: 'Reduire',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
              },
            ],
          },
          {
            id: '3',
            libelle: 'vente',
            type: 'Reduire',
            etat:true,
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
                ressource: {
                  id: '1',
                  libelle: 'transfusion',
                  etat: true,
                  quantite: 10,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                },
                distributeur: [
                  {
                    id: '1',
                    raisonSocial: 'brasserie1',
                    etat: true,
                    adresse: 'Dla',
                    telephone: '655554488',
                    mail: 'ngong@yad.fr',
                  },
                  {
                    id: '2',
                    raisonSocial: 'guinness',
                    etat: true,
                    adresse: 'Ydé',
                    telephone: '655554481',
                    mail: 'ngong@yad.fr',
                  },
                  {
                    id: '3',
                    raisonSocial: 'papeterie yvan',
                    etat: true,
                    adresse: 'Buéa',
                    telephone: '655554486',
                    mail: 'ngong@yad.fr',
                  },
                ],
              },
            ],
          }
        ]
      },
      {
        id: '3',
        titre: 'Fiche de soin',
        description:
          "Document delivre par le medecin ou un infirmier de l'etablissement",
        typeMouvement: 'Neutre',
        etat:true,
        affichagePrix:false,
        contientRessources:true,
        contientDistributeurs:false,
        missions: [
          {
            id: '2',
            libelle: 'Consultation Spécialiste',
            description: 'Consultation faite par un médecin',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '2',
              libelle: 'Laboratoire',
              etat: true,
              dateDerniereModification: new Date('06/08/1990'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 20,
              localisation:'douala',
              description:'bien',
            },
          },
          {
            id: '3',
            libelle: 'Prelevement Labo',
            description: 'Prélévement fait par laboratoire',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '3',
              libelle: 'Consultation',
              etat: true,
              dateDerniereModification: new Date('12/06/1972'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 50,
              localisation:'douala',
              description:'bien',
            },
          },
          {
            id: '4',
            libelle: 'Encaissement',
            description: 'recu de paiement lié à une mission',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '1',
              libelle: 'Pharmacie',
              etat: true,
              dateDerniereModification: new Date('07/03/2000'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 6,
              localisation:'douala',
              description:'bien',
            },
          },
        ],
        attributs: [
          {
            id: '1',
            titre: 'taille',
            description: "taille de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.String,
            valeursParDefaut: '',

          },
          {
            id: '4',
            titre: 'age',
            description: "age de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Double,
            valeursParDefaut: '',

          },
          {
            id: '5',
            titre: 'allergies',
            description: "allergies de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.String,
            valeursParDefaut: '',

          },
          {
            id: '8',
            titre: 'cicatrice',
            description: "cicatrice de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            type: IType.Boolean,
            valeursParDefaut: 'true, false',
          },
        ],
        categories: [
          {
            id: '1',
            nom: 'informations personelles',
            ordre: 1,
            listAttributsParCategories: [
              {
                id: '',
                ordre: 2,
                obligatoire: false,
                attribut:{id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',}

              },
              {
                id: '',
                ordre: 1,
                obligatoire: false,
                attribut:{id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',}

              },
            ],
          },
          {
            id: '2',
            nom: 'informations de sante',
            ordre: 2,
            listAttributsParCategories: [
              {
                id: '',
                ordre: 1,
                obligatoire: false,
                attribut:{id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',}

              },
              {
                id: '',
                ordre: 2,
                obligatoire: false,
                attribut:{id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',}
              },
            ],
          },
        ],
        preconisations:[
          {
            id: '1',
            libelle: 'rachat',
            etat:true,
            type: 'Neutre',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 10,
                quantiteMax: 20,
                montantMin: 1000,
                montantMax: 7000,
                ressource: {
                  id: '1',
                  libelle: 'transfusion',
                  etat: true,
                  quantite: 10,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                },
              },
              {
                id: '2',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
              },
              {
                id: '3',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                ressource:
                {
                  id: '3',
                  libelle: 'pediatrie',
                  etat: true,
                  quantite: 30,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                }
              },
              {
                id: '4',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                ressource:
                {
                    id: '2',
                    libelle: 'Medical',
                    etat: true,
                    quantite: 20,
                    prixEntree: 2000,
                    prixDeSortie: 2050,
                    unite: 'Litre',
                    caracteristique: 'souple',
                    famille: {
                      id: '3',
                      libelle: 'pediatrie',
                      description: 'enfant',
                      etat: true,
                    },
                  },
              },
            ],
          },
          {
            id: '2',
            libelle: 'vente',
            etat:true,
            type: 'Reduire',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
              },
            ],
          },
          {
            id: '3',
            libelle: 'vente',
            etat:true,
            type: 'Reduire',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
                ressource: {
                  id: '1',
                  libelle: 'transfusion',
                  etat: true,
                  quantite: 10,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                },
                distributeur: [
                  {
                    id: '1',
                    raisonSocial: 'brasserie1',
                    etat: true,
                    adresse: 'Dla',
                    telephone: '655554488',
                    mail: 'ngong@yad.fr',
                  },
                  {
                    id: '2',
                    raisonSocial: 'guinness',
                    etat: true,
                    adresse: 'Ydé',
                    telephone: '655554481',
                    mail: 'ngong@yad.fr',
                  },
                  {
                    id: '3',
                    raisonSocial: 'papeterie yvan',
                    etat: true,
                    adresse: 'Buéa',
                    telephone: '655554486',
                    mail: 'ngong@yad.fr',
                  },
                ],
              },
            ],
          }
       ],
        sousDocuments:[
          {
            id: '1',
            titre: 'Note intervention',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
            typeMouvement: 'Ajout',
              etat:true,
              affichagePrix:true,
              contientRessources:true,
              contientDistributeurs:true,
            missions: [
              {
                id: '1',
                libelle: 'Consultation',
                description: 'Consultation faite par une infirmière',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '3',
                libelle: 'Prelevement Labo',
                description: 'Prélévement fait par laboratoire',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '6',
                titre: 'teint',
                description: "teint de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',
              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '1',
                    ordre: 11,
                    obligatoire: false,
                    attribut:{
                    id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',

                    }
                  },
                  {

                    id: '1',
                    ordre: 12,
                    obligatoire: false,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Int,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '1',
                    ordre: 13,
                    obligatoire: false,
                    attribut:{id: '6',
                    titre: 'teint',
                    description: "teint de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '1',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '1',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '7',
                    titre: 'Groupe sangin',
                    description: "Groupe sangin de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut:
                      'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
                  },
                  {
                    id: '1',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',                        
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          },
          {
            id: '2',
            titre: 'Fiche de suivi',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
            typeMouvement: 'Ajout',
            etat:true,
            affichagePrix:true,
            contientRessources:true,
            contientDistributeurs:true,
            missions: [
              {
                id: '1',
                libelle: 'Consultation',
                description: 'Consultation faite par une infirmière',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '3',
                libelle: 'Prelevement Labo',
                description: 'Prélévement fait par laboratoire',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '6',
                titre: 'teint',
                description: "teint de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'true, false',
              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '1',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '2',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '3',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '6',
                    titre: 'teint',
                    description: "teint de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '7',
                    titre: 'Groupe sangin',
                    description: "Groupe sangin de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut:
                      'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',                       
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          },
          {
            id: '3',
            titre: 'Fiche de soin',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
              typeMouvement: 'Neutre',
              etat:true,
              affichagePrix:true,
              contientRessources:true,
              contientDistributeurs:true,
            missions: [
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '3',
                libelle: 'Prelevement Labo',
                description: 'Prélévement fait par laboratoire',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '4',
                libelle: 'Encaissement',
                description: 'recu de paiement lié à une mission',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'true, false',
              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',                       
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          },
          {
            id: '4',
            titre: 'Formulaire de sortie',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
              typeMouvement: 'Reduire',
              etat:true,
              affichagePrix:true,
              contientRessources:true,
              contientDistributeurs:true,
            missions: [
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '3',
                libelle: 'Prelevement Labo',
                description: 'Prélévement fait par laboratoire',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '4',
                libelle: 'Encaissement',
                description: 'recu de paiement lié à une mission',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '14',
                titre: 'Nom',
                description: "nom de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Textarea,
                valeursParDefaut: '',

              },
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',
              },
              {
                id: '9',
                titre: 'date admission',
                description: "date admission de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',

              },
              {
                id: '10',
                titre: 'date decharge',
                description: 'date decharge',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',

              },
              {
                id: '11',
                titre: 'date prochain rendez-vous',
                description: "date prochain rendez-vous de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',

              },
              {
                id: '12',
                titre: 'aprobation du medecin',
                description: 'aprobation du medecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',
              },
              {
                id: '13',
                titre: 'motif de la decharge',
                description: 'motif de la decharge ',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Textarea,
                valeursParDefaut: '',

              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '14',
                    titre: 'Nom',
                    description: "nom de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: true,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: true,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 3,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '7',
                    titre: 'Groupe sangin',
                    description: "Groupe sangin de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut:
                      'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
              {
                id: '3',
                nom: 'informations de suivi medical',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '9',
                    titre: 'date admission',
                    description: "date admission de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Date,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '10',
                    titre: 'date decharge',
                    description: 'date decharge',
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Date,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '11',
                    titre: 'date prochain rendez-vous',
                    description: "date prochain rendez-vous de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Date,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 4,
                    obligatoire: false,
                    attribut:{id: '12',
                    titre: 'aprobation du medecin',
                    description: 'aprobation du medecin',
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                  {
                    id: '',
                    ordre: 5,
                    obligatoire: false,
                    attribut:{id: '13',
                    titre: 'motif de la decharge',
                    description: 'motif de la decharge ',
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Textarea,
                    valeursParDefaut: '',}

                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',                      
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                type: 'Reduire',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          },
          {
            id: '5',
            titre: 'ordonnance',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
              typeMouvement: 'Neutre',
              etat:true,
              affichagePrix:true,
              contientRessources:true,
              contientDistributeurs:true,
            missions: [
              {
                id: '1',
                libelle: 'Consultation',
                description: 'Consultation faite par une infirmière',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '5',
                libelle: 'Resultat Labo',
                description: 'Communiquer les résultats du labo aux patients',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '6',
                titre: 'teint',
                description: "teint de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',
              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '6',
                    titre: 'teint',
                    description: "teint de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 0,
                    obligatoire: false,
                    attribut:{id: '7',
                    titre: 'Groupe sangin',
                    description: "Groupe sangin de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut:
                      'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',                        
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          }
        ]
      },
      {
        id: '4',
        titre: 'Formulaire de sortie',
        description:
          "Document delivre par le medecin ou un infirmier de l'etablissement",
        typeMouvement: 'Reduire',
        etat:true,
        affichagePrix:true,
        contientRessources:true,
        contientDistributeurs:false,
        missions: [
          {
            id: '2',
            libelle: 'Consultation Spécialiste',
            description: 'Consultation faite par un médecin',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '2',
              libelle: 'Laboratoire',
              etat: true,
              dateDerniereModification: new Date('06/08/1990'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 20,
              localisation:'douala',
              description:'bien',
            },
          },
          {
            id: '3',
            libelle: 'Prelevement Labo',
            description: 'Prélévement fait par laboratoire',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '3',
              libelle: 'Consultation',
              etat: true,
              dateDerniereModification: new Date('12/06/1972'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 50,
              localisation:'douala',
              description:'bien',
            },
          },
          {
            id: '4',
            libelle: 'Encaissement',
            description: 'recu de paiement lié à une mission',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '1',
              libelle: 'Pharmacie',
              etat: true,
              dateDerniereModification: new Date('07/03/2000'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 6,
              localisation:'douala',
              description:'bien',
            },
          },
        ],
        attributs: [
          {
            id: '14',
            titre: 'Nom',
            description: "nom de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.String,
            valeursParDefaut: '',

          },
          {
            id: '4',
            titre: 'age',
            description: "age de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Double,
            valeursParDefaut: '',

          },
          {
            id: '5',
            titre: 'allergies',
            description: "allergies de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Textarea,
            valeursParDefaut: '',

          },
          {
            id: '1',
            titre: 'taille',
            description: "taille de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Double,
            valeursParDefaut: '',

          },
          {
            id: '7',
            titre: 'Groupe sangin',
            description: "Groupe sangin de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            type: IType.Boolean,
            valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
          },
          {
            id: '8',
            titre: 'cicatrice',
            description: "cicatrice de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            type: IType.Boolean,
            valeursParDefaut: 'oui, non',
          },
          {
            id: '9',
            titre: 'date admission',
            description: "date admission de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Date,
            valeursParDefaut: '',

          },
          {
            id: '10',
            titre: 'date decharge',
            description: 'date decharge',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Date,
            valeursParDefaut: '',

          },
          {
            id: '11',
            titre: 'date prochain rendez-vous',
            description: "date prochain rendez-vous de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Date,
            valeursParDefaut: '',

          },
          {
            id: '12',
            titre: 'aprobation du medecin',
            description: 'aprobation du medecin',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            type: IType.Boolean,
            valeursParDefaut: 'oui, non',
          },
          {
            id: '13',
            titre: 'motif de la decharge',
            description: 'motif de la decharge ',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Textarea,
            valeursParDefaut: '',

          },
        ],
        categories: [
          {
            id: '1',
            nom: 'informations personelles',
            ordre: 1,
            listAttributsParCategories: [
              {
                id: '',
                ordre: 1,
                obligatoire: false,
                attribut:{id: '14',
                titre: 'Nom',
                description: "nom de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',}

              },
              {
                id: '',
                ordre: 2,
                obligatoire: true,
                attribut:{id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',}

              },
              {
                id: '',
                ordre: 3,
                obligatoire: true,
                attribut:{id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',}

              },
            ],
          },
          {
            id: '2',
            nom: 'informations de sante',
            ordre: 3,
            listAttributsParCategories: [
              {
                id: '',
                ordre: 2,
                obligatoire: false,
                attribut:{id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',}

              },
              {
                id: '',
                ordre: 1,
                obligatoire: false,
                attribut:{id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut:
                  'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
              },
              {
                id: '',
                ordre: 3,
                obligatoire: false,
                attribut:{id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',}
              },
            ],
          },
          {
            id: '3',
            nom: 'informations de suivi medical',
            ordre: 2,
            listAttributsParCategories: [
              {
                id: '',
                ordre: 1,
                obligatoire: false,
                attribut:{id: '9',
                titre: 'date admission',
                description: "date admission de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',}

              },
              {
                id: '',
                ordre: 2,
                obligatoire: false,
                attribut:{id: '10',
                titre: 'date decharge',
                description: 'date decharge',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',}

              },
              {
                id: '',
                ordre: 3,
                obligatoire: false,
                attribut:{id: '11',
                titre: 'date prochain rendez-vous',
                description: "date prochain rendez-vous de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',}

              },
              {
                id: '',
                ordre: 4,
                obligatoire: false,
                attribut:{id: '12',
                titre: 'aprobation du medecin',
                description: 'aprobation du medecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',}
              },
              {
                id: '',
                ordre: 5,
                obligatoire: false,
                attribut:{id: '13',
                titre: 'motif de la decharge',
                description: 'motif de la decharge ',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Textarea,
                valeursParDefaut: '',}

              },
            ],
          },
        ],
        preconisations:[
          {
            id: '1',
            libelle: 'rachat',
            etat:true,
            type: 'Neutre',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 10,
                quantiteMax: 20,
                montantMin: 1000,
                montantMax: 7000,
                ressource: {
                  id: '1',
                  libelle: 'transfusion',
                  etat: true,
                  quantite: 10,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                },
              },
              {
                id: '2',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
              },
              {
                id: '3',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                ressource:
                {
                  id: '3',
                  libelle: 'pediatrie',
                  etat: true,
                  quantite: 30,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                }
              },
              {
                id: '4',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                ressource:
                {
                    id: '2',
                    libelle: 'Medical',
                    etat: true,
                    quantite: 20,
                    prixEntree: 2000,
                    prixDeSortie: 2050,
                    unite: 'Litre',                  
                    caracteristique: 'souple',
                    famille: {
                      id: '3',
                      libelle: 'pediatrie',
                      description: 'enfant',
                      etat: true,
                    },
                  },
              },
            ],
          },
          {
            id: '2',
            libelle: 'vente',
            etat:true,
            type: 'Reduire',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
              },
            ],
          },
          {
            id: '3',
            libelle: 'vente',
            etat:true,
            type: 'Reduire',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
                ressource: {
                  id: '1',
                  libelle: 'transfusion',
                  etat: true,
                  quantite: 10,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                },
                distributeur: [
                  {
                    id: '1',
                    raisonSocial: 'brasserie1',
                    etat: true,
                    adresse: 'Dla',
                    telephone: '655554488',
                    mail: 'ngong@yad.fr',
                  },
                  {
                    id: '2',
                    raisonSocial: 'guinness',
                    etat: true,
                    adresse: 'Ydé',
                    telephone: '655554481',
                    mail: 'ngong@yad.fr',
                  },
                  {
                    id: '3',
                    raisonSocial: 'papeterie yvan',
                    etat: true,
                    adresse: 'Buéa',
                    telephone: '655554486',
                    mail: 'ngong@yad.fr',
                  },
                ],
              },
            ],
          }
        ]
      },
      {
        id: '5',
        titre: 'ordonnance',
        description:
          "Document delivre par le medecin ou un infirmier de l'etablissement",
        typeMouvement: 'Neutre',
        etat:true,
        affichagePrix:false,
        contientRessources:true,
        contientDistributeurs:true,
        missions: [
          {
            id: '1',
            libelle: 'Consultation',
            description: 'Consultation faite par une infirmière',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '1',
              libelle: 'Pharmacie',
              etat: true,
              dateDerniereModification: new Date('07/03/2000'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 6,
              localisation:'douala',
              description:'bien',
            },
          },
          {
            id: '2',
            libelle: 'Consultation Spécialiste',
            description: 'Consultation faite par un médecin',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '2',
              libelle: 'Laboratoire',
              etat: true,
              dateDerniereModification: new Date('06/08/1990'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 20,
              localisation:'douala',
              description:'bien',
            },
          },
          {
            id: '5',
            libelle: 'Resultat Labo',
            description: 'Communiquer les résultats du labo aux patients',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '3',
              libelle: 'Consultation',
              etat: true,
              dateDerniereModification: new Date('12/06/1972'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 50,
              localisation:'douala',
              description:'bien',
            },
          },
        ],
        attributs: [
          {
            id: '1',
            titre: 'taille',
            description: "taille de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Double,
            valeursParDefaut: '',

          },
          {
            id: '6',
            titre: 'teint',
            description: "teint de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.String,
            valeursParDefaut: '',

          },
          {
            id: '8',
            titre: 'cicatrice',
            description: "cicatrice de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            type: IType.Boolean,
            valeursParDefaut: 'oui, non',
          },
          {
            id: '4',
            titre: 'age',
            description: "age de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Double,
            valeursParDefaut: '',

          },
          {
            id: '7',
            titre: 'Groupe sangin',
            description: "Groupe sangin de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            type: IType.Boolean,
            valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
          },
          {
            id: '5',
            titre: 'allergies',
            description: "allergies de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.String,
            valeursParDefaut: '',

          },
        ],
        categories: [
          {
            id: '1',
            nom: 'informations personelles',
            ordre: 1,
            listAttributsParCategories: [
              {
                id: '',
                ordre: 2,
                obligatoire: false,
                attribut:{id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',}

              },
              {
                id: '',
                ordre: 1,
                obligatoire: false,
                attribut:{id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',}

              },
              {
                id: '',
                ordre: 3,
                obligatoire: false,
                attribut:{id: '6',
                titre: 'teint',
                description: "teint de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',}

              },
            ],
          },
          {
            id: '2',
            nom: 'informations de sante',
            ordre: 2,
            listAttributsParCategories: [
              {
                id: '',
                ordre: 2,
                obligatoire: false,
                attribut:{id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',}

              },
              {
                id: '',
                ordre: 0,
                obligatoire: false,
                attribut:{id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut:
                  'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
              },
              {
                id: '',
                ordre: 3,
                obligatoire: false,
                attribut:{id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',}
              },
            ],
          },
        ],
        preconisations:[
          {
            id: '1',
            libelle: 'rachat',
            etat:true,
            type: 'Neutre',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 10,
                quantiteMax: 20,
                montantMin: 1000,
                montantMax: 7000,
                ressource: {
                  id: '1',
                  libelle: 'transfusion',
                  etat: true,
                  quantite: 10,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                },
              },
              {
                id: '2',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
              },
              {
                id: '3',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                ressource:
                {
                  id: '3',
                  libelle: 'pediatrie',
                  etat: true,
                  quantite: 30,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                }
              },
              {
                id: '4',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                ressource:
                {
                    id: '2',
                    libelle: 'Medical',
                    etat: true,
                    quantite: 20,
                    prixEntree: 2000,
                    prixDeSortie: 2050,
                    unite: 'Litre',                   
                    caracteristique: 'souple',
                    famille: {
                      id: '3',
                      libelle: 'pediatrie',
                      description: 'enfant',
                      etat: true,
                    },
                  },
              },
            ],
          },
          {
            id: '2',
            libelle: 'vente',
            etat:true,
            type: 'Reduire',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
              },
            ],
          },
          {
            id: '3',
            libelle: 'vente',
            etat:true,
            type: 'Reduire',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
                ressource: {
                  id: '1',
                  libelle: 'transfusion',
                  etat: true,
                  quantite: 10,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                },
                distributeur: [
                  {
                    id: '1',
                    raisonSocial: 'brasserie1',
                    etat: true,
                    adresse: 'Dla',
                    telephone: '655554488',
                    mail: 'ngong@yad.fr',
                  },
                  {
                    id: '2',
                    raisonSocial: 'guinness',
                    etat: true,
                    adresse: 'Ydé',
                    telephone: '655554481',
                    mail: 'ngong@yad.fr',
                  },
                  {
                    id: '3',
                    raisonSocial: 'papeterie yvan',
                    etat: true,
                    adresse: 'Buéa',
                    telephone: '655554486',
                    mail: 'ngong@yad.fr',
                  },
                ],
              },
            ],
          }
      ],
        sousDocuments:[
          {
            id: '3',
            titre: 'Fiche de soin',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
              typeMouvement: 'Neutre',
              etat:true,
              affichagePrix:true,
              contientRessources:true,
              contientDistributeurs:true,
            missions: [
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '3',
                libelle: 'Prelevement Labo',
                description: 'Prélévement fait par laboratoire',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '4',
                libelle: 'Encaissement',
                description: 'recu de paiement lié à une mission',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'true, false',
              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.String,
                    valeursParDefaut: '',}
                  },
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',                        
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                type: 'Reduire',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          },
          {
            id: '4',
            titre: 'Formulaire de sortie',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
              typeMouvement: 'Reduire',
              etat:true,
              affichagePrix:true,
              contientRessources:true,
              contientDistributeurs:true,
            missions: [
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '3',
                libelle: 'Prelevement Labo',
                description: 'Prélévement fait par laboratoire',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '4',
                libelle: 'Encaissement',
                description: 'recu de paiement lié à une mission',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '14',
                titre: 'Nom',
                description: "nom de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.String,
                valeursParDefaut: '',
              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Double,
                valeursParDefaut: '',
              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Textarea,
                valeursParDefaut: '',
              },
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',
              },
              {
                id: '9',
                titre: 'date admission',
                description: "date admission de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',
              },
              {
                id: '10',
                titre: 'date decharge',
                description: 'date decharge',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',

              },
              {
                id: '11',
                titre: 'date prochain rendez-vous',
                description: "date prochain rendez-vous de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',

              },
              {
                id: '12',
                titre: 'aprobation du medecin',
                description: 'aprobation du medecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',
              },
              {
                id: '13',
                titre: 'motif de la decharge',
                description: 'motif de la decharge ',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Textarea,
                valeursParDefaut: '',

              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '14',
                    titre: 'Nom',
                    description: "nom de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: true,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: true,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 3,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '7',
                    titre: 'Groupe sangin',
                    description: "Groupe sangin de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut:
                      'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
              {
                id: '3',
                nom: 'informations de suivi medical',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '9',
                    titre: 'date admission',
                    description: "date admission de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Date,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '10',
                    titre: 'date decharge',
                    description: 'date decharge',
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Date,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '11',
                    titre: 'date prochain rendez-vous',
                    description: "date prochain rendez-vous de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Date,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 4,
                    obligatoire: false,
                    attribut:{id: '12',
                    titre: 'aprobation du medecin',
                    description: 'aprobation du medecin',
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                  {
                    id: '',
                    ordre: 5,
                    obligatoire: false,
                    attribut:{id: '13',
                    titre: 'motif de la decharge',
                    description: 'motif de la decharge ',
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Textarea,
                    valeursParDefaut: '',}

                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',                        
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          },
          {
            id: '5',
            titre: 'ordonnance',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
              typeMouvement: 'Neutre',
              etat:true,
              affichagePrix:true,
              contientRessources:true,
              contientDistributeurs:true,
            missions: [
              {
                id: '1',
                libelle: 'Consultation',
                description: 'Consultation faite par une infirmière',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '5',
                libelle: 'Resultat Labo',
                description: 'Communiquer les résultats du labo aux patients',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '6',
                titre: 'teint',
                description: "teint de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',
              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '6',
                    titre: 'teint',
                    description: "teint de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 0,
                    obligatoire: false,
                    attribut:{id: '7',
                    titre: 'Groupe sangin',
                    description: "Groupe sangin de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut:
                      'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',                       
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          }
        ]
      }
    ];
    let exemplaires: IExemplaireDocument[] = [
      {
        id: '1',
        idDocument: '4',
        titre: 'Formulaire de sortie',
        description:
          "Document delivre par le medecin ou un infirmier de l'etablissement",
        typeMouvement: 'Reduire',
        etat:false,
        affichagePrix:true,
        contientRessources:true,
        contientDistributeurs:false,
        missions: [
          {
            id: '2',
            libelle: 'Consultation Spécialiste',
            description: 'Consultation faite par un médecin',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '2',
              libelle: 'Laboratoire',
              etat: true,
              dateDerniereModification: new Date('06/08/1990'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 20,
              localisation:'douala',
              description:'bien',
            },
          },
          {
            id: '3',
            libelle: 'Prelevement Labo',
            description: 'Prélévement fait par laboratoire',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '3',
              libelle: 'Consultation',
              etat: true,
              dateDerniereModification: new Date('12/06/1972'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 50,
              localisation:'douala',
              description:'bien',
            },
          },
          {
            id: '4',
            libelle: 'Encaissement',
            description: 'recu de paiement lié à une mission',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '1',
              libelle: 'Pharmacie',
              etat: true,
              dateDerniereModification: new Date('07/03/2000'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 6,
              localisation:'douala',
              description:'bien',
            },
          },
        ],
        attributs: [
          {
            id: '14',
            titre: 'Nom',
            description: "nom de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.String,
            valeursParDefaut: '',

          },
          {
            id: '4',
            titre: 'age',
            description: "age de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Double,
            valeursParDefaut: '',

          },
          {
            id: '5',
            titre: 'allergies',
            description: "allergies de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Textarea,
            valeursParDefaut: '',

          },
          {
            id: '1',
            titre: 'taille',
            description: "taille de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Double,
            valeursParDefaut: '',

          },
          {
            id: '7',
            titre: 'Groupe sangin',
            description: "Groupe sangin de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            type: IType.Boolean,
            valeursParDefaut: 'A,A+,A-,B,B+,B-,AB,AB+,AB-,O,O+,O-',
          },
          {
            id: '8',
            titre: 'cicatrice',
            description: "cicatrice de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            type: IType.Boolean,
            valeursParDefaut: 'oui,non',
          },
          {
            id: '9',
            titre: 'date admission',
            description: "date admission de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Date,
            valeursParDefaut: '',

          },
          {
            id: '10',
            titre: 'date decharge',
            description: 'date decharge',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Date,
            valeursParDefaut: '',

          },
          {
            id: '11',
            titre: 'date prochain rendez-vous',
            description: "date prochain rendez-vous de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Date,
            valeursParDefaut: '',

          },
          {
            id: '12',
            titre: 'aprobation du medecin',
            description: 'aprobation du medecin',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            type: IType.Boolean,
            valeursParDefaut: 'oui,non',
          },
          {
            id: '13',
            titre: 'motif de la decharge',
            description: 'motif de la decharge ',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Textarea,
            valeursParDefaut: '',

          },
        ],
        categories: [
          {
            id: '1',
            nom: 'informations personelles',
            ordre: 1,
            listAttributsParCategories: [
              {
                id:'',
                ordre: 1,
                obligatoire: false,
                attribut:{id: '14',
                titre: 'Nom',
                description: "nom de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',}

              },
              {
                id:'',
                ordre: 2,
                obligatoire: true,
                attribut:{id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',}

              },
              {
                id:'',
                ordre: 3,
                obligatoire: true,
                attribut:{id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',}

              },
            ],
          },
          {
            id: '2',
            nom: 'informations de sante',
            ordre: 3,
            listAttributsParCategories: [
              {
                id:'',
                ordre: 2,
                obligatoire: false,
                attribut:{id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',}

              },
              {
                id:'',
                ordre: 0,
                obligatoire: false,
                attribut:{id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut:
                  'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
              },
              {
                id:'',
                ordre: 3,
                obligatoire: false,
                attribut:{id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',}
              },
            ],
          },
          {
            id: '3',
            nom: 'informations de suivi medical',
            ordre: 2,
            listAttributsParCategories: [
              {
                id:'',
                ordre: 1,
                obligatoire: false,
                attribut:{id: '9',
                titre: 'date admission',
                description: "date admission de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',}

              },
              {
                id:'',
                ordre: 2,
                obligatoire: false,
                attribut:{id: '10',
                titre: 'date decharge',
                description: 'date decharge',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',}

              },
              {
                id:'',
                ordre: 3,
                obligatoire: false,
                attribut:{id: '11',
                titre: 'date prochain rendez-vous',
                description: "date prochain rendez-vous de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',}

              },
              {
                id:'',
                ordre: 4,
                obligatoire: false,
                attribut:{id: '12',
                titre: 'aprobation du medecin',
                description: 'aprobation du medecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',}
              },
              {
                id:'',
                ordre: 5,
                obligatoire: false,
                attribut:{id: '13',
                titre: 'motif de la decharge',
                description: 'motif de la decharge ',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Textarea,
                valeursParDefaut: '',}

              },
            ],
          },
        ],
        preconisations:[
          {
            id: '1',
            libelle: 'rachat',
            etat:true,
            type: 'Neutre',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 10,
                quantiteMax: 20,
                montantMin: 1000,
                montantMax: 7000,
                ressource: {
                  id: '1',
                  libelle: 'transfusion',
                  etat: true,
                  quantite: 10,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                },
              },
              {
                id: '2',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
              },
              {
                id: '3',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                ressource:
                {
                  id: '3',
                  libelle: 'pediatrie',
                  etat: true,
                  quantite: 30,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  /*dateCreation:new Date("07/03/2000"),dateModification:new Date("07/03/1990"),*/ 
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                }
              },
              {
                id: '4',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                ressource:
                {
                    id: '2',
                    libelle: 'Medical',
                    etat: true,
                    quantite: 20,
                    prixEntree: 2000,
                    prixDeSortie: 2050,
                    /* dateCreation:new Date("07/03/2000"),dateModification:new Date("07/03/1990"),*/ 
                    unite: 'Litre',
                    caracteristique: 'souple',
                    famille: {
                      id: '3',
                      libelle: 'pediatrie',
                      description: 'enfant',
                      etat: true,
                    },
                  },
              },
            ],
          },
          {
            id: '2',
            libelle: 'vente',
            etat:true,
            type: 'Reduire',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
              },
            ],
          },
          {
            id: '3',
            libelle: 'vente',
            type: 'Reduire',
            etat:true,
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
                ressource: {
                  id: '1',
                  libelle: 'transfusion',
                  etat: true,
                  quantite: 10,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                },
                distributeur: [
                  {
                    id: '1',
                    raisonSocial: 'brasserie1',
                    etat: true,
                    adresse: 'Dla',
                    telephone: '655554488',
                    mail: 'ngong@yad.fr',
                  },
                  {
                    id: '2',
                    raisonSocial: 'guinness',
                    etat: true,
                    adresse: 'Ydé',
                    telephone: '655554481',
                    mail: 'ngong@yad.fr',
                  },
                  {
                    id: '3',
                    raisonSocial: 'papeterie yvan',
                    etat: true,
                    adresse: 'Buéa',
                    telephone: '655554486',
                    mail: 'ngong@yad.fr',
                  },
                ],
              },
            ],
          }
        ],
        objetEnregistre: [
          {
            key:
            {
              id: '4',
              titre: 'age',
              description: "age de l'individu",
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.Double,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: ''
            },
            value: '23',
          },
          {
            key: {
              id: '5',
              titre: 'allergies',
              description: "allergies de l'individu",
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.String,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: ''
            },
            value: 'oignon, lait, mangue',
          },
          {
            key: {
              id: '1',
              titre: 'taille',
              description: "taille de l'individu",
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.String,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: ''
            },
            value: '1.78',
          },
          {
            key: {
              id: '7',
              titre: 'Groupe sangin',
              description: "Groupe sangin de l'individu",
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.Boolean,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
            },
            value: 'A+',
          },
          {
            key: {
              id: '8',
              titre: 'cicatrice',
              description: "cicatrice de l'individu",
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.Boolean,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: 'oui, non',
            },
            value: 'non',
          },
          {
            key: {
              id: '9',
              titre: 'date admission',
              description: "date admission de l'individu",
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.Date,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: ''
            },
            value: new Date('07/03/2023'),
          },
          {
            key: {
              id: '10',
              titre: 'date decharge',
              description: 'date decharge',
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.Date,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: ''
            },
            value: new Date('17/03/2023'),
          },
          {
            key: {
              id: '11',
              titre: 'date prochain rendez-vous',
              description: "date prochain rendez-vous de l'individu",
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.Date,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: ''
            },
            value: new Date('17/06/2023'),
          },
          {
            key: {
              id: '12',
              titre: 'aprobation du medecin',
              description: 'aprobation du medecin',
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.Boolean,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: 'oui, non',
            },
            value: 'oui',
          },
          {
            key: {
              id: '13',
              titre: 'motif de la decharge',
              description: 'motif de la decharge ',
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.Textarea,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: ''
            },
            value: 'Fin traitement',
          },
          {
            key: {
              id: '2',
              titre: 'poids',
              description: "poids de l'individu",
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.Double,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: ''
            },
            value: '54',
          },
          {
            key: {
              id: '3',
              titre: 'sexe',
              description: "sexe de l'individu",
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.Boolean,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: 'Homme, Femme, Autre',
            },
            value: 'Homme',
          },
          {
            key: {
              id: '6',
              titre: 'teint',
              description: "teint de l'individu",
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.String,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: ''
            },
            value: 'Noir',
          },
        ],
       sousDocuments:[
          {
            id: '1',
            titre: 'Note intervention',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
            typeMouvement: 'Ajout',
            etat:true,
            affichagePrix:true,
            contientRessources:true,
            contientDistributeurs:true,
            missions: [
              {
                id: '1',
                libelle: 'Consultation',
                description: 'Consultation faite par une infirmière',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '3',
                libelle: 'Prelevement Labo',
                description: 'Prélévement fait par laboratoire',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '6',
                titre: 'teint',
                description: "teint de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',
              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '1',
                    ordre: 11,
                    obligatoire: false,
                    attribut:{
                    id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',

                    }
                  },
                  {

                    id: '1',
                    ordre: 12,
                    obligatoire: false,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Int,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '1',
                    ordre: 13,
                    obligatoire: false,
                    attribut:{id: '6',
                    titre: 'teint',
                    description: "teint de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '1',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '1',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '7',
                    titre: 'Groupe sangin',
                    description: "Groupe sangin de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut:
                      'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
                  },
                  {
                    id: '1',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',                   
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                type: 'Reduire',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                type: 'Reduire',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          },
          {
            id: '4',
            titre: 'Formulaire de sortie',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
              typeMouvement: 'Reduire',
              etat:true,
              affichagePrix:true,
              contientRessources:true,
              contientDistributeurs:true,
            missions: [
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '3',
                libelle: 'Prelevement Labo',
                description: 'Prélévement fait par laboratoire',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '4',
                libelle: 'Encaissement',
                description: 'recu de paiement lié à une mission',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '14',
                titre: 'Nom',
                description: "nom de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Textarea,
                valeursParDefaut: '',

              },
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',
              },
              {
                id: '9',
                titre: 'date admission',
                description: "date admission de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',

              },
              {
                id: '10',
                titre: 'date decharge',
                description: 'date decharge',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',

              },
              {
                id: '11',
                titre: 'date prochain rendez-vous',
                description: "date prochain rendez-vous de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',

              },
              {
                id: '12',
                titre: 'aprobation du medecin',
                description: 'aprobation du medecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',
              },
              {
                id: '13',
                titre: 'motif de la decharge',
                description: 'motif de la decharge ',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Textarea,
                valeursParDefaut: '',

              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '14',
                    titre: 'Nom',
                    description: "nom de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: true,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: true,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 3,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '7',
                    titre: 'Groupe sangin',
                    description: "Groupe sangin de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut:
                      'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
              {
                id: '3',
                nom: 'informations de suivi medical',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '9',
                    titre: 'date admission',
                    description: "date admission de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Date,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '10',
                    titre: 'date decharge',
                    description: 'date decharge',
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Date,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '11',
                    titre: 'date prochain rendez-vous',
                    description: "date prochain rendez-vous de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Date,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 4,
                    obligatoire: false,
                    attribut:{id: '12',
                    titre: 'aprobation du medecin',
                    description: 'aprobation du medecin',
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                  {
                    id: '',
                    ordre: 5,
                    obligatoire: false,
                    attribut:{id: '13',
                    titre: 'motif de la decharge',
                    description: 'motif de la decharge ',
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Textarea,
                    valeursParDefaut: '',}

                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                type: 'Reduire',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                type: 'Reduire',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          }
        ],
        mouvements:[
          {
            id: '1',
            description: 'Ici la description de ce mouvement',
            quantite: 20,
            prix: 10000,
            dateCreation: new Date(),
            datePeremption: new Date(),
            ressource: {
              id: '1',
              libelle: 'transfusion',
              etat: true,
              quantite: 10,
              prixEntree: 1000,
              prixDeSortie: 1050,
              unite: 'Litre',
              caracteristique: 'souple',
              famille: {
                id: '4',
                libelle: 'Medical',
                description: 'nouveau-né',
                etat: true,
              },
            },
            distributeur:
            {
              id: '1',
              raisonSocial: 'Brasserie',
              etat: true,
              adresse: 'Dla',
              telephone: '655554488',
              mail: 'ngong@yad.fr',
            },
          },
          {
            id: '2',
            description: 'Ici la description de ce mouvement',
            quantite: 50,
            prix: 300,
            dateCreation: new Date(),
            datePeremption: new Date(),
            ressource: {
              id: '5',
              libelle: 'eau distillée',
              etat: true,
              quantite: 20,
              prixEntree: 500,
              prixDeSortie: 550,
              unite: 'Litre',
              caracteristique: 'désinfictant',
              famille: {
                id: '3',
                libelle: 'pediatrie',
                description: 'enfant',
                etat: true,
              },
            }
          },
          {
            id: '3',
            description: 'Ici la description de ce mouvement',
            quantite: 10,
            prix: 5000,
            dateCreation: new Date(),
            datePeremption: new Date(),
            ressource: {
              id: '3',
              libelle: 'pediatrie',
              etat: true,
              quantite: 30,
              prixEntree: 3000,
              prixDeSortie: 3050,
              unite: 'Litre',
              caracteristique: 'souple',
              famille: {
                id: '4',
                libelle: 'Medical',
                description: 'nouveau-né',
                etat: true,
              }
            },
            distributeur: {
              id: '3',
              raisonSocial: 'Total Distribution',
              etat: true,
              adresse: 'Buéa',
              telephone: '655554486',
              mail: 'ngong@yad.fr',
            }
          },
          {
            id: '4',
            description: 'Ici la description de ce mouvement',
            quantite: 20,
            prix: 2000,
            dateCreation: new Date(),
            datePeremption: new Date(),
            ressource: {
              id: '2',
              libelle: 'Medical',
              etat: true,
              quantite: 20,
              prixEntree: 2000,
              prixDeSortie: 2050,
              unite: 'Litre',              
              caracteristique: 'souple',
              famille: {
                id: '2',
                libelle: 'Medical',
                description: 'nouveau-né',
                etat: true,
              }
            },
            distributeur: {
              id: '2',
              raisonSocial: 'ENEO',
              etat: true,
              adresse: 'Ydé',
              telephone: '655554481',
              mail: 'ngong@yad.fr',
            }
          }
        ],
      },
      {
        id: '2',
        idDocument: '5',
        titre: 'ordonnance',
        description:
          "Document delivre par le medecin ou un infirmier de l'etablissement",
        typeMouvement: 'Neutre',
        etat:false,
        affichagePrix:true,
        contientRessources:true,
        contientDistributeurs:true,
        missions: [
          {
            id: '1',
            libelle: 'Consultation',
            description: 'Consultation faite par une infirmière',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '1',
              libelle: 'Pharmacie',
              etat: true,
              dateDerniereModification: new Date('07/03/2000'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 6,
              localisation:'douala',
              description:'bien',
            },
          },
          {
            id: '2',
            libelle: 'Consultation Spécialiste',
            description: 'Consultation faite par un médecin',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '2',
              libelle: 'Laboratoire',
              etat: true,
              dateDerniereModification: new Date('06/08/1990'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 20,
              localisation:'douala',
              description:'bien',
            },
          },
          {
            id: '5',
            libelle: 'Resultat Labo',
            description: 'Communiquer les résultats du labo aux patients',
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            idLogin: 'admin',
            service: {
              id: '3',
              libelle: 'Consultation',
              etat: true,
              dateDerniereModification: new Date('12/06/1972'),
              dateAttribution: new Date('07/03/1990'),
              dateFin: new Date('07/03/1990'),
              nombreTotalAttributions: 50,
              localisation:'douala',
              description:'bien',
            },
          },
        ],
        attributs: [
          {
            id: '1',
            titre: 'taille',
            description: "taille de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Double,
            valeursParDefaut: '',

          },
          {
            id: '6',
            titre: 'teint',
            description: "teint de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.String,
            valeursParDefaut: '',

          },
          {
            id: '8',
            titre: 'cicatrice',
            description: "cicatrice de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            type: IType.Boolean,
            valeursParDefaut: 'oui, non',
          },
          {
            id: '4',
            titre: 'age',
            description: "age de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.Double,
            valeursParDefaut: '',

          },
          {
            id: '7',
            titre: 'Groupe sangin',
            description: "Groupe sangin de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),
            type: IType.Boolean,
            valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
          },
          {
            id: '5',
            titre: 'allergies',
            description: "allergies de l'individu",
            etat: true,
            dateCreation: new Date('07/03/2000'),
            dateModification: new Date('07/03/1990'),

            type: IType.String,
            valeursParDefaut: '',

          },
        ],
        categories: [
          {
            id: '1',
            nom: 'informations personelles',
            ordre: 1,
            listAttributsParCategories: [
              {
                id:'',
                ordre: 1,
                obligatoire: false,
                attribut:{id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',}

              },
              {
                id:'',
                ordre: 2,
                obligatoire: false,
                attribut:{id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',}

              },
              {
                id:'',
                ordre: 3,
                obligatoire: false,
                attribut:{id: '6',
                titre: 'teint',
                description: "teint de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',}

              },
            ],
          },
          {
            id: '2',
            nom: 'informations de sante',
            ordre: 2,
            listAttributsParCategories: [
              {
                id:'',
                ordre: 2,
                obligatoire: false,
                attribut:{id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',}

              },
              {
                id:'',
                ordre: 0,
                obligatoire: false,
                attribut:{id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut:
                  'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
              },
              {
                id:'',
                ordre: 3,
                obligatoire: false,
                attribut:{id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',}
              },
            ],
          },
        ],
        preconisations:[
          {
            id: '1',
            libelle: 'rachat',
            etat:true,
            type: 'Neutre',
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 10,
                quantiteMax: 20,
                montantMin: 1000,
                montantMax: 7000,
                ressource: {
                  id: '1',
                  libelle: 'transfusion',
                  etat: true,
                  quantite: 10,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                },
              },
              {
                id: '2',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
              },
              {
                id: '3',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                ressource:
                {
                  id: '3',
                  libelle: 'pediatrie',
                  etat: true,
                  quantite: 30,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  /*dateCreation:new Date("07/03/2000"),dateModification:new Date("07/03/1990"),*/ 
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                }
              },
              {
                id: '4',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                ressource:
                {
                    id: '2',
                    libelle: 'Medical',
                    etat: true,
                    quantite: 20,
                    prixEntree: 2000,
                    prixDeSortie: 2050,
                    /* dateCreation:new Date("07/03/2000"),dateModification:new Date("07/03/1990"),*/ 
                    unite: 'Litre',                 
                    caracteristique: 'souple',
                    famille: {
                      id: '3',
                      libelle: 'pediatrie',
                      description: 'enfant',
                      etat: true,
                    },
                  },
              },
            ],
          },
          {
            id: '2',
            libelle: 'vente',
            type: 'Reduire',
            etat:true,
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
              },
            ],
          },
          {
            id: '3',
            libelle: 'vente',
            type: 'Reduire',
            etat:true,
            precomvtqte: [
              {
                id: '1',
                quantiteMin: 30,
                quantiteMax: 40,
                montantMin: 100,
                montantMax: 7000,
                famille: [
                  { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                  {
                    id: '2',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                  {
                    id: '3',
                    libelle: 'pediatrie',
                    description: 'enfant',
                    etat: true,
                  },
                ],
                ressource: {
                  id: '1',
                  libelle: 'transfusion',
                  etat: true,
                  quantite: 10,
                  prixEntree: 1000,
                  prixDeSortie: 1050,
                  unite: 'Litre',
                  caracteristique: 'souple',
                  famille: {
                    id: '4',
                    libelle: 'Medical',
                    description: 'nouveau-né',
                    etat: false,
                  },
                },
                distributeur: [
                  {
                    id: '1',
                    raisonSocial: 'brasserie1',
                    etat: true,
                    adresse: 'Dla',
                    telephone: '655554488',
                    mail: 'ngong@yad.fr',
                  },
                  {
                    id: '2',
                    raisonSocial: 'guinness',
                    etat: true,
                    adresse: 'Ydé',
                    telephone: '655554481',
                    mail: 'ngong@yad.fr',
                  },
                  {
                    id: '3',
                    raisonSocial: 'papeterie yvan',
                    etat: true,
                    adresse: 'Buéa',
                    telephone: '655554486',
                    mail: 'ngong@yad.fr',
                  },
                ],
              },
            ],
          }
        ],
        objetEnregistre: [
          { key:
            {
              id: '1',
              titre: 'taille',
              description: "taille de l'individu",
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.String,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: ''
            },
            value: '1.70' },
          { key:
            {
              id: '6',
              titre: 'teint',
              description: "teint de l'individu",
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.String,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: ''
            },
            value: 'noir' },
          { key:
            {
              id: '8',
              titre: 'cicatrice',
              description: "cicatrice de l'individu",
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.Boolean,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: 'oui, non',
            },
            value: 'oui' },
          { key:
            {
              id: '4',
              titre: 'age',
              description: "age de l'individu",
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.Double,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: ''
            },
            value: '23' },
          { key:
            {
              id: '7',
              titre: 'Groupe sangin',
              description: "Groupe sangin de l'individu",
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.Boolean,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
            },
            value: 'A+' },
          { key:
            {
              id: '5',
              titre: 'allergies',
              description: "allergies de l'individu",
              etat: true,
              dateCreation: new Date('07/03/2000'),
              dateModification: new Date('07/03/1990'),
              type: IType.String,
              ordre: 0,
              obligatoire: false,
              valeursParDefaut: ''
            },
            value: 'oignon, lait, mangue' },
        ],
      sousDocuments:[
          {
            id: '3',
            titre: 'Fiche de soin',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
              typeMouvement: 'Neutre',
              etat:true,
              affichagePrix:true,
              contientRessources:true,
              contientDistributeurs:true,
            missions: [
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '3',
                libelle: 'Prelevement Labo',
                description: 'Prélévement fait par laboratoire',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '4',
                libelle: 'Encaissement',
                description: 'recu de paiement lié à une mission',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'true, false',
              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                type: 'Reduire',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                type: 'Reduire',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          },
          {
            id: '4',
            titre: 'Formulaire de sortie',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
              typeMouvement: 'Reduire',
              etat:true,
              affichagePrix:true,
              contientRessources:true,
              contientDistributeurs:true,
            missions: [
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '3',
                libelle: 'Prelevement Labo',
                description: 'Prélévement fait par laboratoire',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '4',
                libelle: 'Encaissement',
                description: 'recu de paiement lié à une mission',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '14',
                titre: 'Nom',
                description: "nom de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Textarea,
                valeursParDefaut: '',

              },
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',
              },
              {
                id: '9',
                titre: 'date admission',
                description: "date admission de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',

              },
              {
                id: '10',
                titre: 'date decharge',
                description: 'date decharge',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',

              },
              {
                id: '11',
                titre: 'date prochain rendez-vous',
                description: "date prochain rendez-vous de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Date,
                valeursParDefaut: '',

              },
              {
                id: '12',
                titre: 'aprobation du medecin',
                description: 'aprobation du medecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',
              },
              {
                id: '13',
                titre: 'motif de la decharge',
                description: 'motif de la decharge ',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Textarea,
                valeursParDefaut: '',

              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '14',
                    titre: 'Nom',
                    description: "nom de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: true,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: true,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 3,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '7',
                    titre: 'Groupe sangin',
                    description: "Groupe sangin de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut:
                      'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
              {
                id: '3',
                nom: 'informations de suivi medical',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '9',
                    titre: 'date admission',
                    description: "date admission de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Date,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '10',
                    titre: 'date decharge',
                    description: 'date decharge',
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Date,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '11',
                    titre: 'date prochain rendez-vous',
                    description: "date prochain rendez-vous de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Date,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 4,
                    obligatoire: false,
                    attribut:{id: '12',
                    titre: 'aprobation du medecin',
                    description: 'aprobation du medecin',
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                  {
                    id: '',
                    ordre: 5,
                    obligatoire: false,
                    attribut:{id: '13',
                    titre: 'motif de la decharge',
                    description: 'motif de la decharge ',
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Textarea,
                    valeursParDefaut: '',}

                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          },
          {
            id: '5',
            titre: 'ordonnance',
            description:
              "Document delivre par le medecin ou un infirmier de l'etablissement",
              typeMouvement: 'Neutre',
              etat:true,
              affichagePrix:true,
              contientRessources:true,
              contientDistributeurs:true,
            missions: [
              {
                id: '1',
                libelle: 'Consultation',
                description: 'Consultation faite par une infirmière',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '1',
                  libelle: 'Pharmacie',
                  etat: true,
                  dateDerniereModification: new Date('07/03/2000'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 6,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '2',
                libelle: 'Consultation Spécialiste',
                description: 'Consultation faite par un médecin',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '2',
                  libelle: 'Laboratoire',
                  etat: true,
                  dateDerniereModification: new Date('06/08/1990'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 20,
                  localisation:'douala',
                  description:'bien',
                },
              },
              {
                id: '5',
                libelle: 'Resultat Labo',
                description: 'Communiquer les résultats du labo aux patients',
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                idLogin: 'admin',
                service: {
                  id: '3',
                  libelle: 'Consultation',
                  etat: true,
                  dateDerniereModification: new Date('12/06/1972'),
                  dateAttribution: new Date('07/03/1990'),
                  dateFin: new Date('07/03/1990'),
                  nombreTotalAttributions: 50,
                  localisation:'douala',
                  description:'bien',
                },
              },
            ],
            attributs: [
              {
                id: '1',
                titre: 'taille',
                description: "taille de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '6',
                titre: 'teint',
                description: "teint de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
              {
                id: '8',
                titre: 'cicatrice',
                description: "cicatrice de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'oui, non',
              },
              {
                id: '4',
                titre: 'age',
                description: "age de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.Double,
                valeursParDefaut: '',

              },
              {
                id: '7',
                titre: 'Groupe sangin',
                description: "Groupe sangin de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),
                type: IType.Boolean,
                valeursParDefaut: 'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',
              },
              {
                id: '5',
                titre: 'allergies',
                description: "allergies de l'individu",
                etat: true,
                dateCreation: new Date('07/03/2000'),
                dateModification: new Date('07/03/1990'),

                type: IType.String,
                valeursParDefaut: '',

              },
            ],
            categories: [
              {
                id: '1',
                nom: 'informations personelles',
                ordre: 1,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '1',
                    titre: 'taille',
                    description: "taille de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 1,
                    obligatoire: false,
                    attribut:{id: '4',
                    titre: 'age',
                    description: "age de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.Double,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '6',
                    titre: 'teint',
                    description: "teint de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                ],
              },
              {
                id: '2',
                nom: 'informations de sante',
                ordre: 2,
                listAttributsParCategories: [
                  {
                    id: '',
                    ordre: 2,
                    obligatoire: false,
                    attribut:{id: '5',
                    titre: 'allergies',
                    description: "allergies de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),

                    type: IType.String,
                    valeursParDefaut: '',}

                  },
                  {
                    id: '',
                    ordre: 0,
                    obligatoire: false,
                    attribut:{id: '7',
                    titre: 'Groupe sangin',
                    description: "Groupe sangin de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut:
                      'A, A+, A-, B, B+, B-, AB, AB+, AB-, O, O+, O-',}
                  },
                  {
                    id: '',
                    ordre: 3,
                    obligatoire: false,
                    attribut:{id: '8',
                    titre: 'cicatrice',
                    description: "cicatrice de l'individu",
                    etat: true,
                    dateCreation: new Date('07/03/2000'),
                    dateModification: new Date('07/03/1990'),
                    type: IType.Boolean,
                    valeursParDefaut: 'oui, non',}
                  },
                ],
              },
            ],
            preconisations:[
              {
                id: '1',
                libelle: 'rachat',
                etat:true,
                type: 'Neutre',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 10,
                    quantiteMax: 20,
                    montantMin: 1000,
                    montantMax: 7000,
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                  },
                  {
                    id: '2',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                  {
                    id: '3',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                      id: '3',
                      libelle: 'pediatrie',
                      etat: true,
                      quantite: 30,
                      prixEntree: 3000,
                      prixDeSortie: 3050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    }
                  },
                  {
                    id: '4',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    ressource:
                    {
                        id: '2',
                        libelle: 'Medical',
                        etat: true,
                        quantite: 20,
                        prixEntree: 2000,
                        prixDeSortie: 2050,
                        unite: 'Litre',
                        caracteristique: 'souple',
                        famille: {
                          id: '3',
                          libelle: 'pediatrie',
                          description: 'enfant',
                          etat: true,
                        },
                      },
                  },
                ],
              },
              {
                id: '2',
                libelle: 'vente',
                type: 'Reduire',
                etat:true,
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                  },
                ],
              },
              {
                id: '3',
                libelle: 'vente',
                etat:true,
                type: 'Reduire',
                precomvtqte: [
                  {
                    id: '1',
                    quantiteMin: 30,
                    quantiteMax: 40,
                    montantMin: 100,
                    montantMax: 7000,
                    famille: [
                      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
                      {
                        id: '2',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                      {
                        id: '3',
                        libelle: 'pediatrie',
                        description: 'enfant',
                        etat: true,
                      },
                    ],
                    ressource: {
                      id: '1',
                      libelle: 'transfusion',
                      etat: true,
                      quantite: 10,
                      prixEntree: 1000,
                      prixDeSortie: 1050,
                      unite: 'Litre',
                      caracteristique: 'souple',
                      famille: {
                        id: '4',
                        libelle: 'Medical',
                        description: 'nouveau-né',
                        etat: true,
                      },
                    },
                    distributeur: [
                      {
                        id: '1',
                        raisonSocial: 'brasserie1',
                        etat: true,
                        adresse: 'Dla',
                        telephone: '655554488',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '2',
                        raisonSocial: 'guinness',
                        etat: true,
                        adresse: 'Ydé',
                        telephone: '655554481',
                        mail: 'ngong@yad.fr',
                      },
                      {
                        id: '3',
                        raisonSocial: 'papeterie yvan',
                        etat: true,
                        adresse: 'Buéa',
                        telephone: '655554486',
                        mail: 'ngong@yad.fr',
                      },
                    ],
                  },
                ],
              }
            ]
          }
        ],
        mouvements:[
          {
            id: '1',
            description: 'Ici la description de ce mouvement',
            quantite: 20,
            prix: 10000,
            dateCreation: new Date(),
            datePeremption: new Date(),
            ressource: {
              id: '2',
              libelle: 'Medical',
              etat: true,
              quantite: 20,
              prixEntree: 2000,
              prixDeSortie: 2050,
              unite: 'Litre',
              caracteristique: 'souple',
              famille: {
                id: '2',
                libelle: 'Medical',
                description: 'nouveau-né',
                etat: true,
              }
            },
            distributeur: {
              id: '2',
              raisonSocial: 'Brasserie',
              etat: true,
              adresse: 'Ydé',
              telephone: '655554481',
              mail: 'ngong@yad.fr',
            }
          },
          {
            id: '2',
            description: 'Ici la description de ce mouvement',
            quantite: 2,
            prix: 10000,
            dateCreation: new Date(),
            datePeremption: new Date(),
            ressource: {
              id: '4',
              libelle: 'paracetamols',
              etat: true,
              quantite: 40,
              prixEntree: 100,
              prixDeSortie: 150,
              unite:'Kg',
              caracteristique: 'Appaise les douleurs légères',
              famille: {
                id: '5',
                libelle: 'transfusion',
                description: 'sang',
                etat: true,
              }
            }
          },
          {
            id: '3',
            description: 'Ici la description de ce mouvement',
            quantite: 15,
            prix: 4500,
            dateCreation: new Date(),
            datePeremption: new Date(),
            ressource: {
              id: '5',
              libelle: 'eau distillée',
              etat: true,
              quantite: 20,
              prixEntree: 500,
              prixDeSortie: 550,
              unite: 'Litre',
              caracteristique: 'désinfictant',
              famille: {
                id: '3',
                libelle: 'pediatrie',
                description: 'enfant',
                etat: true,
              }
            },
            distributeur: {
              id: '1',
              raisonSocial: 'Total Energie',
              etat: true,
              adresse: 'Dla',
              telephone: '655554488',
              mail: 'ngong@yad.fr',
            }
          }
        ],
      }
    ];
    let ressource: IRessource[] = [
      {
        id: '1',
        libelle: 'transfusion',
        etat: true,
        quantite: 10,
        prixEntree: 1000,
        prixDeSortie: 1050,
        unite: 'Litre',
        caracteristique: 'souple',
        famille: { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
      },
      {
        id: '2',
        libelle: 'Medical',
        etat: true,
        quantite: 20,
        prixEntree: 2000,
        prixDeSortie: 2050,
        unite: 'Litre',        
        caracteristique: 'souple',
        famille: {
          id: '2',
          libelle: 'Medical',
          description: 'nouveau-né',
          etat: false,
        },
      },
      {
        id: '2',
        libelle: 'Ventoline',
        etat: true,
        quantite: 20,
        prixEntree: 2000,
        prixDeSortie: 2050,
        /* dateCreation:new Date("07/03/2000"),dateModification:new Date("07/03/1990"),*/ 
        unite: 'Litre',
        caracteristique: 'souple',
        famille: {
          id: '3',
          libelle: 'pediatrie',
          description: 'enfant',
          etat: true,
        },
      },
      {
        id: '3',
        libelle: 'Aspirine',
        etat: true,
        quantite: 30,
        prixEntree: 3000,
        prixDeSortie: 3050,
        unite: 'Litre',
        caracteristique: 'souple',
        famille: {
          id: '4',
          libelle: 'Medical',
          description: 'nouveau-né',
          etat: false,
        },
      },
      {
        id: '4',
        libelle: 'paracetamols',
        etat: true,
        quantite: 40,
        prixEntree: 100,
        prixDeSortie: 150,
        unite:'Kg',
        caracteristique: 'Appaise les douleurs légères',
        famille: {
          id: '5',
          libelle: 'transfusion',
          description: 'sang',
          etat: true,
        },
      },
      {
        id: '5',
        libelle: 'eau distillée',
        etat: true,
        quantite: 20,
        prixEntree: 500,
        prixDeSortie: 550,
        unite: 'Litre',
        caracteristique: 'désinfictant',
        famille: {
          id: '3',
          libelle: 'pediatrie',
          description: 'enfant',
          etat: true,
        },
      },
    ];
    let famille: IFamille[] = [
      { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
      { id: '2', libelle: 'Medical', description: 'nouveau-né', etat: false },
      {
        id: '3',
        libelle: 'pediatrie',
        description: 'enfant',
        etat: true,
      },
      { id: '4', libelle: 'Medical', description: 'nouveau-né', etat: false },
      { id: '5', libelle: 'transfusion', description: 'sang', etat: true },
    ];

    let precomvt: IPrecoMvt[] = [
      {
        id: '1',
        libelle: 'rachat',
        type: 'Neutre',
        etat:true,
        precomvtqte: [
          {
            id: '1',
            quantiteMin: 10,
            quantiteMax: 20,
            montantMin: 1000,
            montantMax: 7000,
            ressource: {
              id: '1',
              libelle: 'transfusion',
              etat: true,
              quantite: 10,
              prixEntree: 1000,
              prixDeSortie: 1050,
              unite: 'Litre',
              caracteristique: 'souple',
              famille: {
                id: '4',
                libelle: 'Medical',
                description: 'nouveau-né',
                etat: false,
              },
            },
          },
          {
            id: '2',
            quantiteMin: 30,
            quantiteMax: 40,
            montantMin: 100,
            montantMax: 7000,
            famille: [
              { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
              {
                id: '2',
                libelle: 'Medical',
                description: 'nouveau-né',
                etat: false,
              },
              {
                id: '3',
                libelle: 'pediatrie',
                description: 'enfant',
                etat: true,
              },
            ],
          },
          {
            id: '3',
            quantiteMin: 30,
            quantiteMax: 40,
            montantMin: 100,
            montantMax: 7000,
            ressource:
            {
              id: '3',
              libelle: 'pediatrie',
              etat: true,
              quantite: 30,
              prixEntree: 3000,
              prixDeSortie: 3050,
              unite: 'Litre',
              caracteristique: 'souple',
              famille: {
                id: '4',
                libelle: 'Medical',
                description: 'nouveau-né',
                etat: false,
              },
            }
          },
          {
            id: '4',
            quantiteMin: 30,
            quantiteMax: 40,
            montantMin: 100,
            montantMax: 7000,
            ressource:
            {
                id: '2',
                libelle: 'Medical',
                etat: true,
                quantite: 20,
                prixEntree: 2000,
                prixDeSortie: 2050,
                unite: 'Litre',
                caracteristique: 'souple',
                famille: {
                  id: '3',
                  libelle: 'pediatrie',
                  description: 'enfant',
                  etat: true,
                },
              },
          },
        ],
      },
      {
        id: '2',
        libelle: 'vente',
        type: 'Reduire',
        etat:true,
        precomvtqte: [
          {
            id: '1',
            quantiteMin: 30,
            quantiteMax: 40,
            montantMin: 100,
            montantMax: 7000,
            famille: [
              { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
              {
                id: '2',
                libelle: 'Medical',
                description: 'nouveau-né',
                etat: false,
              },
              {
                id: '3',
                libelle: 'pediatrie',
                description: 'enfant',
                etat: true,
              },
            ],
          },
        ],
      },
      {
        id: '3',
        libelle: 'vente',
        type: 'Reduire',
        etat:true,
        precomvtqte: [
          {
            id: '1',
            quantiteMin: 30,
            quantiteMax: 40,
            montantMin: 100,
            montantMax: 7000,
            famille: [
              { id: '1', libelle: 'Electronique', description: 'sang', etat: true },
              {
                id: '2',
                libelle: 'Medical',
                description: 'nouveau-né',
                etat: false,
              },
              {
                id: '3',
                libelle: 'pediatrie',
                description: 'enfant',
                etat: true,
              },
            ],
            ressource: {
              id: '1',
              libelle: 'transfusion',
              etat: true,
              quantite: 10,
              prixEntree: 1000,
              prixDeSortie: 1050,
              unite: 'Litre',
              caracteristique: 'souple',
              famille: {
                id: '4',
                libelle: 'Medical',
                description: 'nouveau-né',
                etat: false,
              },
            },
            distributeur: [
              {
                id: '1',
                raisonSocial: 'brasserie1',
                etat: true,
                adresse: 'Dla',
                telephone: '655554488',
                mail: 'ngong@yad.fr',
              },
              {
                id: '2',
                raisonSocial: 'guinness',
                etat: true,
                adresse: 'Ydé',
                telephone: '655554481',
                mail: 'ngong@yad.fr',
              },
              {
                id: '3',
                raisonSocial: 'papeterie yvan',
                etat: true,
                adresse: 'Buéa',
                telephone: '655554486',
                mail: 'ngong@yad.fr',
              },
            ],
          },
        ],
      },
    ];
    let distributeur: IDistributeur[] = [
      {
        id: '1',
        raisonSocial: 'Total Energie',
        etat: true,
        adresse: 'Dla',
        telephone: '655554488',
        mail: 'ngong@yad.fr',
      },
      {
        id: '2',
        raisonSocial: 'Brasserie',
        etat: true,
        adresse: 'Ydé',
        telephone: '655554481',
        mail: 'ngong@yad.fr',
      },
      {
        id: '3',
        raisonSocial: 'Eneo',
        etat: true,
        adresse: 'Buéa',
        telephone: '655554486',
        mail: 'ngong@yad.fr',
      }
    ];
    let role:IRole[]=[
      {id:"1", titre:"vendeur", description: "personnel au contact du client",etat:true, dateCreation:new Date("07/03/2000")},
      {id:"2", titre:"traiteur", description: "Personnel administratif",etat:true, dateCreation:new Date("07/03/2000")},
      {id:"3", titre:"marcheur", description: "commercial sur le terrain",etat:true,dateCreation:new Date("07/03/2000")},
    ];
    let personnels: IPersonnel[] = [
      {id:"1", nom:"Tagne", prenom:"Willy", email:"tagnewillie@gmail.com", telephone:"655455487", sexe:"M", dateNaissance: new Date('10/04/2000'), dateEntree: new Date(), dateSortie: undefined, roles: undefined},
      {id:"3", nom:"Peter", prenom:"Alan", email:"peteralan@gmail.com", telephone:"655455487", sexe:"M", dateNaissance: new Date('10/08/2004'), dateEntree: new Date(), dateSortie: undefined, roles: undefined},
      {id:"3", nom:"Dombo", prenom:"Gilles", email:"dombogilles@gmail.com", telephone:"655455487", sexe:"M", dateNaissance: new Date('10/10/2002'), dateEntree: new Date(), dateSortie: undefined, roles: undefined}
    ];
    let typeAttribut:TypeAttribut={type:["Number","Text", "Checkbox", "Radio", "Date","Url", "Textarea", "Email"]};
    let typeUnite : TypeUnite = {type:["Litre","Kg","Packs","Boite"]};
    let typeMvt: TypeMvt = {type :["Neutre", "Ajout", "Reduire"]}; 
    return{patients, services, menus, tickets, missions, attributs, documents,exemplaires,famille,ressource,precomvt,distributeur,role, personnels, typeAttribut, typeUnite, typeMvt};
  }
}
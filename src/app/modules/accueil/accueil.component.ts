import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IElements } from 'src/app/modele/elements';
import { IFonctionnalites } from 'src/app/modele/fonctionnalites';
import { IMenu } from 'src/app/modele/menu';
import { IPersonnel } from 'src/app/modele/personnel';
import { PassActionService } from 'src/app/services/actions-view/pass-action.service';
import { AuthentificationService } from 'src/app/services/authentifications/authentification.service';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';

/**
 * Représente une carte d'accès rapide affichée sur la page d'accueil.
 * Chaque carte correspond à un module autorisé dans le menu de l'utilisateur.
 */
export interface IRaccourciAccueil {
  titre: string;
  libelleAction: string;
  icone: string;
  lienBrut: string;
  routeCible: string;
  actions?: IElements[];
  accent: 'vert' | 'cyan' | 'jaune';
}

/**
 * Composant de la page d'accueil principale de l'application (/parcours/accueil).
 * Offre une vue épurée : message de bienvenue personnalisé et accès rapides
 * générés dynamiquement selon les droits du groupe de l'utilisateur connecté.
 */
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent implements OnInit, OnDestroy {
  /** Informations du personnel connecté (nom, prénom, etc.) */
  utilisateur?: IPersonnel;

  /** Libellé du groupe / rôle de l'utilisateur connecté */
  groupe: string = '';

  /** Formule de salutation adaptée à l'heure de la journée */
  salutation: string = 'Bonjour';

  /** Date du jour formatée en français */
  dateDuJour: string = '';

  /** Liste limitée des raccourcis rapides issus du menu utilisateur */
  raccourcis: IRaccourciAccueil[] = [];

  /** Nombre total de modules disponibles dans le menu de l'utilisateur */
  nombreModulesDisponibles: number = 0;

  /** Nombre maximal de cartes affichées afin de garder la page aérée */
  private readonly MAX_RACCOURCIS = 6;

  /** Abonnement aux changements de langue pour rafraîchir les libellés du menu */
  private langSubscription?: Subscription;

  constructor(
    private authService: AuthentificationService,
    private router: Router,
    private dataEnteteMenuService: DonneesEchangeService,
    private actionView: PassActionService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    // Initialise la salutation et la date courante
    this.initialiserContexteTemporel();

    // Charge les informations de l'utilisateur connecté et ses accès rapides
    this.chargerDonneesUtilisateur();
    this.chargerRaccourcis(this.translate.currentLang || localStorage.getItem('langue') || 'fr');

    // Met à jour les raccourcis lorsque l'utilisateur change la langue dans l'en-tête
    this.langSubscription = this.translate.onLangChange.subscribe((event) => {
      this.chargerRaccourcis(event.lang);
    });
  }

  ngOnDestroy(): void {
    // Nettoyage de l'abonnement pour éviter toute fuite mémoire
    this.langSubscription?.unsubscribe();
  }

  /**
   * Ouvre un module depuis une carte d'accès rapide en synchronisant
   * l'en-tête et les actions associées comme le fait le menu latéral.
   */
  ouvrirRaccourci(raccourci: IRaccourciAccueil): void {
    this.dataEnteteMenuService.dataEnteteMenu = raccourci.titre;
    this.dataEnteteMenuService.setUrlSource(raccourci.libelleAction);
    localStorage.setItem('lien', raccourci.lienBrut);

    if (raccourci.actions) {
      this.actionView.setActions(raccourci.actions);
    }

    this.router.navigateByUrl(raccourci.routeCible);
  }

  /**
   * Retourne le nom complet de l'utilisateur connecté ou une valeur par défaut.
   */
  get nomComplet(): string {
    const prenom = this.utilisateur?.prenom?.trim() || '';
    const nom = this.utilisateur?.nom?.trim() || '';
    const complet = `${prenom} ${nom}`.trim();
    return complet || 'Utilisateur';
  }

  /**
   * Détermine la salutation (Bonjour / Bonsoir) et formate la date du jour.
   */
  private initialiserContexteTemporel(): void {
    const maintenant = new Date();
    const heure = maintenant.getHours();
    this.salutation = heure >= 18 || heure < 5 ? 'Bonsoir' : 'Bonjour';

    // Formatage lisible de la date (ex. "lundi 23 novembre 2026")
    this.dateDuJour = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(maintenant);
  }

  /**
   * Récupère le profil et le groupe depuis le service d'authentification.
   */
  private chargerDonneesUtilisateur(): void {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      return;
    }

    this.utilisateur = currentUser.user;
    this.groupe = currentUser.groupe?.libelle || 'Utilisateur';
  }

  /**
   * Construit les cartes d'accès rapide à partir du menu autorisé de l'utilisateur
   * pour garantir la compatibilité avec le RoleAuthGuard.
   */
  private chargerRaccourcis(langue: string): void {
    const currentUser = this.authService.currentUserValue;
    const menus: IMenu[] = currentUser?.groupe?.menu || [];

    if (!menus.length) {
      this.raccourcis = [];
      this.nombreModulesDisponibles = 0;
      return;
    }

    // Sélectionne le menu correspondant à la langue active (avec repli sur le français puis le premier menu)
    const menuActif =
      menus.find((m) => m.langue === langue) ||
      menus.find((m) => m.langue === 'fr') ||
      menus[0];

    const fonctionnalites: IFonctionnalites[] = menuActif?.fonctionnalites || [];
    const fonctionnalitesValides = fonctionnalites.filter(
      (f) => f.elements && f.elements.length > 0
    );

    this.nombreModulesDisponibles = fonctionnalitesValides.length;

    // Alternance sobre sur les 3 couleurs d'accent du site (#28a745, #31b1e3, #FFD700)
    const accents: Array<IRaccourciAccueil['accent']> = ['vert', 'cyan', 'jaune'];

    this.raccourcis = fonctionnalitesValides
      .slice(0, this.MAX_RACCOURCIS)
      .map((fonct, index) => {
        // Privilégie la vue liste/recherche lorsqu'elle existe, sinon prend le premier lien
        const elementPrincipal =
          fonct.elements.find((e) => e.lien?.toLowerCase().includes('list-')) ||
          fonct.elements[0];

        return {
          titre: fonct.fonction,
          libelleAction: elementPrincipal.nom,
          icone: this.choisirIcone(fonct.fonction, fonct.icone),
          lienBrut: elementPrincipal.lien,
          routeCible: this.normaliserRoute(elementPrincipal.lien),
          actions: elementPrincipal.action,
          accent: accents[index % accents.length],
        };
      });
  }

  /**
   * Convertit un lien relatif du menu (ex. "./patients/list-patients")
   * en route absolue sous "/parcours/".
   */
  private normaliserRoute(lien: string): string {
    const cheminPropre = (lien || '').replace(/^\.?\//, '');
    return `/parcours/${cheminPropre}`;
  }

  /**
   * Associe une icône FontAwesome parlante selon le nom du module,
   * afin de rendre les cartes plus lisibles que l'icône générique par défaut.
   */
  private choisirIcone(fonction: string, iconeParDefaut: string): string {
    const nom = (fonction || '').toLowerCase();

    if (nom.includes('patient') || nom.includes('personne') || nom.includes('people')) {
      return 'fas fa-user-injured';
    }
    if (nom.includes('personnel') || nom.includes('employ')) {
      return 'fas fa-user-md';
    }
    if (nom.includes('ticket')) {
      return 'fas fa-ticket-alt';
    }
    if (nom.includes('mission')) {
      return 'fas fa-tasks';
    }
    if (nom.includes('document')) {
      return 'fas fa-file-medical';
    }
    if (nom.includes('caisse')) {
      return 'fas fa-cash-register';
    }
    if (nom.includes('compte')) {
      return 'fas fa-wallet';
    }
    if (nom.includes('service')) {
      return 'fas fa-hospital';
    }
    if (nom.includes('parcours')) {
      return 'fas fa-route';
    }
    if (nom.includes('validation')) {
      return 'fas fa-check-double';
    }

    return iconeParDefaut || 'fas fa-layer-group';
  }
}

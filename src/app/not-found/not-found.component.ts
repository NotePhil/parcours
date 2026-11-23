import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';

export interface IErrorDetails {
  code: string;
  titre: string;
  signification: string;
  suggestion?: string;
  icon: string;
  severity: 'warning' | 'danger' | 'info';
  canRetry?: boolean;
}

const CATALOGUE_ERREURS: Record<string, IErrorDetails> = {
  '400': {
    code: '400',
    titre: 'Requête invalide',
    signification: 'Les informations transmises ne peuvent pas être traitées.',
    suggestion: 'Vérifiez les données saisies puis recommencez.',
    icon: 'fa-exclamation-circle',
    severity: 'info',
  },
  '401': {
    code: '401',
    titre: 'Authentification requise',
    signification: 'Votre session a expiré ou vous devez être connecté pour accéder à cette page.',
    suggestion: 'Reconnectez-vous avec vos identifiants.',
    icon: 'fa-lock',
    severity: 'warning',
  },
  '403': {
    code: '403',
    titre: 'Accès refusé',
    signification: 'Vous ne disposez pas des droits nécessaires pour consulter cette ressource.',
    suggestion: 'Contactez votre administrateur si cet accès vous est nécessaire.',
    icon: 'fa-ban',
    severity: 'danger',
  },
  '404': {
    code: '404',
    titre: 'Page introuvable',
    signification: 'La page ou la ressource demandée n\'existe pas ou a été déplacée.',
    suggestion: 'Vérifiez l\'adresse saisie ou revenez à l\'accueil.',
    icon: 'fa-compass',
    severity: 'warning',
  },
  '408': {
    code: '408',
    titre: 'Délai d\'attente dépassé',
    signification: 'Le serveur a mis trop de temps à répondre à votre demande.',
    suggestion: 'Vérifiez votre connexion puis réessayez.',
    icon: 'fa-clock',
    severity: 'warning',
    canRetry: true,
  },
  '500': {
    code: '500',
    titre: 'Erreur interne du serveur',
    signification: 'Une erreur inattendue est survenue lors du traitement de votre demande.',
    suggestion: 'Réessayez dans quelques instants ou contactez le support technique.',
    icon: 'fa-server',
    severity: 'danger',
    canRetry: true,
  },
  '502': {
    code: '502',
    titre: 'Passerelle invalide',
    signification: 'Le serveur a reçu une réponse invalide d\'un service distant.',
    suggestion: 'Patientez quelques instants puis réessayez.',
    icon: 'fa-plug',
    severity: 'danger',
    canRetry: true,
  },
  '503': {
    code: '503',
    titre: 'Service indisponible',
    signification: 'Le service est temporairement indisponible ou en maintenance.',
    suggestion: 'Veuillez réessayer ultérieurement.',
    icon: 'fa-tools',
    severity: 'danger',
    canRetry: true,
  },
  '504': {
    code: '504',
    titre: 'Temps de réponse expiré',
    signification: 'Le serveur n\'a pas reçu de réponse dans le délai imparti.',
    suggestion: 'Réessayez dans quelques instants.',
    icon: 'fa-hourglass-end',
    severity: 'danger',
    canRetry: true,
  },
  '0': {
    code: 'ERR',
    titre: 'Connexion impossible',
    signification: 'Impossible de joindre le serveur pour le moment.',
    suggestion: 'Vérifiez votre connexion réseau puis réessayez.',
    icon: 'fa-wifi',
    severity: 'danger',
    canRetry: true,
  },
};

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.sass']
})
export class NotFoundComponent implements OnInit, OnDestroy {
  errorInfo: IErrorDetails = CATALOGUE_ERREURS['404'];
  private subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.route.paramMap,
      this.route.queryParamMap,
      this.route.data,
    ]).subscribe(([params, queryParams, data]) => {
      const state = (history.state || {}) as Partial<IErrorDetails & { message?: string }>;

      const rawCode =
        params.get('code') ??
        queryParams.get('code') ??
        (data['code'] !== undefined ? String(data['code']) : undefined) ??
        (state.code !== undefined ? String(state.code) : undefined) ??
        '404';

      const baseError = this.resolveError(rawCode);

      const customTitre = queryParams.get('titre') ?? state.titre;
      const customSignification =
        queryParams.get('signification') ??
        queryParams.get('message') ??
        state.signification ??
        state.message;
      const hasCustomSuggestion =
        queryParams.has('suggestion') || state.suggestion !== undefined;
      const customSuggestion = queryParams.has('suggestion')
        ? queryParams.get('suggestion') || undefined
        : state.suggestion || undefined;

      this.errorInfo = {
        ...baseError,
        titre: customTitre || baseError.titre,
        signification: customSignification || baseError.signification,
        suggestion: hasCustomSuggestion ? customSuggestion : baseError.suggestion,
      };
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  retour(): void {
    this.location.back();
  }

  /**
   * Redirige vers la page d'accueil si l'utilisateur est connecté,
   * sinon vers la page de connexion.
   */
  allerAccueil(): void {
    this.router.navigate([this.estConnecte() ? '/parcours/accueil' : '/login']);
  }

  allerConnexion(): void {
    this.router.navigate(['/login']);
  }

  reessayer(): void {
    window.location.reload();
  }

  private resolveError(code: string): IErrorDetails {
    const normalized = code.trim();
    if (CATALOGUE_ERREURS[normalized]) {
      return CATALOGUE_ERREURS[normalized];
    }

    const numericCode = Number(normalized);
    const severity: IErrorDetails['severity'] =
      !isNaN(numericCode) && numericCode >= 500
        ? 'danger'
        : !isNaN(numericCode) && numericCode >= 400
          ? 'warning'
          : 'info';

    return {
      code: normalized || '404',
      titre: normalized ? `Erreur ${normalized}` : 'Erreur inattendue',
      signification: 'Une erreur est survenue lors du traitement de votre demande.',
      suggestion: 'Revenez à la page précédente ou à l\'accueil, puis réessayez.',
      icon: 'fa-exclamation-triangle',
      severity,
      canRetry: severity === 'danger',
    };
  }

  private estConnecte(): boolean {
    try {
      return !!localStorage.getItem('currentUser');
    } catch {
      return false;
    }
  }
}

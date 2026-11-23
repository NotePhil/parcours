import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { ModulesRoutingModule } from './modules/modules-routing.module';
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CommonModule } from '@angular/common';

/**
 * Routes racine de l'application.
 * Note : ModulesRoutingModule est importé avant RouterModule.forRoot(routes)
 * afin que la route "/parcours" et ses sous-routes soient résolues avant le wildcard "**".
 */
const routes: Routes = [
  // Redirection de la racine vers la page d'accueil (protégée par AuthGuard -> /login si non connecté)
  { path: '', redirectTo: 'parcours/accueil', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'requestPassword', component: RequestPasswordResetComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  // Routes dédiées à la page de gestion des erreurs
  { path: 'erreur/:code', component: NotFoundComponent },
  { path: 'erreur', component: NotFoundComponent },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ModulesRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

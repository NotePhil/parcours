import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil.component';

/**
 * Définition des routes du module Accueil.
 * Chargé paresseusement sous le chemin "/parcours/accueil".
 */
const routesAccueil: Routes = [
  {
    path: '',
    title: 'Accueil',
    component: AccueilComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routesAccueil)],
  exports: [RouterModule],
})
export class AccueilRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListExemplaireComponent } from './list-exemplaire/list-exemplaire.component';
import { NewExemplaireComponent } from './new-exemplaire/new-exemplaire.component';
import { ViewExemplaireComponent } from './view-exemplaire/view-exemplaire.component';

const routes: Routes = [
  {
    path: 'exemplaire-nouveau/:idDocument',
    title: 'Nouvel exemplaire de documents',
    component: NewExemplaireComponent
  },
  // {
  //   path: 'exemplaire-nouveau/:idExemplaire',
  //   title: 'Nouvel exemplaire de documents',
  //   component: NewExemplaireComponent
  // },
  {
    path: 'exemplaire-nouveau/modify/:idExemplaire',
    title: 'Modifier formulaire de documents',
    component: NewExemplaireComponent
  },
  {
    path: 'view-exemplaire/:idExemplaire',
    title: 'Voir le document',
    component: ViewExemplaireComponent
  },
  {
    path: 'list-exemplaire',
    title: 'Voir les exemplaires',
    component: ListExemplaireComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExemplaireDocumentRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewParcoursComponent } from './new-parcours/new-parcours.component';
import { ListParcoursComponent } from './list-parcours/list-parcours.component';
import { NewEtapeComponent } from '../etape/new-etape/new-etape.component';

const routes = [
  {
    path: 'nouveau-parcours',
    title: 'Enregistrer un nouveau parcours',
    component: NewParcoursComponent,
  },
  {
    path: 'nouveau-parcours/:idParcours',
    title: 'Modifier un parcours',
    component: NewParcoursComponent,
  },
  {
    path: 'list-parcours',
    title: 'Recherche de parcours',
    component: ListParcoursComponent,
  },
  {
    path: 'nouvelle-etape',
    title: 'creer une etape',
    component: NewEtapeComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParcoursRoutingModule {}

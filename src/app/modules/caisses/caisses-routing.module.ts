import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCaissesComponent } from './list-caisses/list-caisses.component';
import { NewCaisseComponent } from './new-caisse/new-caisse.component';
import { CommonModule } from '@angular/common';

const routesCaisses: Routes = [
  {
    path: 'caisse-nouveau',
    title: 'Creer un nouvel caisse',
    component: NewCaisseComponent
  },
  {
    path: 'caisse-nouveau/:idCaisse',
    title: 'Modifier un caisse',
    component: NewCaisseComponent
  },
  {
    path: 'list-caisses',
    title: 'Recherche de caisses',
    component: ListCaissesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routesCaisses), CommonModule],
  exports: [RouterModule]
})
export class CaissesRoutingModule { }

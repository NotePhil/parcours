import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCaissesComponent } from './list-caisses/list-caisses.component';
import { NewCaisseComponent } from './new-caisse/new-caisse.component';
import { EcartCaisseComponent } from './ecart-caisse/ecart-caisse.component';

const routes: Routes = [
  {
    path: 'caisse-nouveau',
    title: 'Creer une nouvelle caisse',
    component: NewCaisseComponent
  },
  {
    path: 'caisse-nouveau/:idCaisse',
    title: 'Modifier une caisse',
    component: NewCaisseComponent
  },
  {
    path: 'caisse-ecart/:caisseId',
    title: 'Ecart de caisse',
    component: EcartCaisseComponent
  },
  {
    path: 'list-caisses',
    title: 'Recherche de caisses',
    component: ListCaissesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaissesRoutingModule { }

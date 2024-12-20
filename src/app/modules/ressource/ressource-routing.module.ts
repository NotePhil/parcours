import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRessourceComponent } from './new-ressource/new-ressource.component';
import { ListRessourcesComponent } from './list-ressources/list-ressources.component';
import { SearchRessourceComponent } from './search-ressource/search-ressource.component';

const routes: Routes = [
  {
    path: 'ressource-nouvelle',
    title: 'Enregistrer une nouvelle ressource',
    component: NewRessourceComponent
  },
  {
    path: 'ressource-nouvelle/:idRessource',
    title: 'Modifier une ressource',
    component: NewRessourceComponent
  },
  {
    path: 'list-ressources',
    title: 'Recherche de ressources',
    component: ListRessourcesComponent
  },
  {
    path: 'search-ressource',
    title: 'Recherche de ressources en fonction des familles, quantités, etc...',
    component: SearchRessourceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RessourceRoutingModule { }

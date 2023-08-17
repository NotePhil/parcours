import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPrecomvtComponent } from './new-precomvt/new-precomvt.component';
import { ListPrecomvtsComponent } from './list-precomvts/list-precomvts.component';
import { ViewPrecomvtComponent } from './view-precomvt/view-precomvt.component';

const routes: Routes = [

  {
    path: 'precomvt-nouvelle',
    title: 'Enregistrer une nouvelle precomvt',
    component: NewPrecomvtComponent
  },
  {
    path: 'precomvt-nouvelle/:idprecomvt',
    title: 'Modifier une famille',
    component: NewPrecomvtComponent
  },
  {
    path: 'list-precomvts',
    title: 'Recherche de precomvts',
    component: ListPrecomvtsComponent
  },
  {
    path: 'view-precomvt/:idprecomvt',
    title: 'Voir la precomvt',
    component: ViewPrecomvtComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrecoMvtRoutingModule { }

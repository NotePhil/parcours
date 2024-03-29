import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFormDocumentComponent } from './list-form-document/list-form-document.component';
import { NewFormDocumentComponent } from './new-form-document/new-form-document.component';
import { ViewFormDocumentComponent } from './view-form-document/view-form-document.component';

const routes: Routes = [
  {
    path: 'document-nouveau',
    title: 'Nouveau formulaire de documents',
    component: NewFormDocumentComponent
  },
  {
    path: 'document-nouveau/:idDocument',
    title: 'Nouveau formulaire de documents',
    component: NewFormDocumentComponent
  },
  {
    path: 'list-documents',
    title: 'liste formulaires de documents',
    component: ListFormDocumentComponent
  },
  {
    path: 'view-document/:idDocument',
    title: 'Voir le document',
    component: ViewFormDocumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }

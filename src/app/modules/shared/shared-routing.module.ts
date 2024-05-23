import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModalCategoriesComponent } from './modal-categories/modal-categories.component';
import { MermaidGraphRoutingModule } from '../mermaid-graph/mermaid-graph-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MermaidGraphRoutingModule
  ],
  exports: [RouterModule]
})
export class SharedRoutingModule { }

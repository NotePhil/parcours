import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MermaidGraphRoutingModule } from './mermaid-graph-routing.module';
import { MermaidComponent } from './mermaid/mermaid.component';


@NgModule({
  declarations: [
    MermaidComponent
  ],
  imports: [
    CommonModule,
    MermaidGraphRoutingModule
  ],
  exports: [
    MermaidComponent
  ]
})
export class MermaidGraphModule { }

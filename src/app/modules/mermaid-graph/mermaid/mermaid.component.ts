import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import mermaid from 'mermaid';

@Component({
  selector: 'app-mermaid',
  templateUrl: './mermaid.component.html',
  styleUrls: ['./mermaid.component.scss']
})
export class MermaidComponent implements AfterViewInit {
  
  @ViewChild('mermaidContainer') mermaidContainer!: ElementRef;
  config = {
    startOnLoad: true,
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
      curve: "cardinal",
    },
    securityLevel: "loose",
 };

  ngAfterViewInit(): void {
    mermaid.initialize(this.config);
    const element: any = this.mermaidContainer.nativeElement;
     const graphDefinition = `graph TD
         A[Christmas] →|Get money| B(Go shopping)
         B → C(Let me think)
         C →|One| D[Laptop]
         C →|Two| E[iPhone]
         C →|Three| F[fa:fa-car Car]
         A[Christmas] →|Get money| D[Laptop]
         B → E`
    //  mermaid.render("graphDiv", graphDefinition, (svgCode,
    //  bindFunctions) => {
    //   element.innerHTML = svgCode;
    //   bindFunctions(element);
      
    //  });
  }
}

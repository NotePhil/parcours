import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import mermaid from 'mermaid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('mermaidDiv', { static: false })
  mermaidDiv!: ElementRef;

  title = 'Parcours client - clinique de ...';
  langues: string[] = ['fr', 'en', 'sp', 'de'];
  langueChoisi: string = 'fr';
  flags = [
    { flag: 'assets/images/flags/fr.svg' },
    { flag: 'assets/images/flags/us.svg' },
    { flag: 'assets/images/flags/spain.svg' },
    { flag: 'assets/images/flags/germany.svg' },
  ];

  constructor(private translate: TranslateService, private overlay: OverlayContainer) {
    translate.addLangs(this.langues);
    translate.setDefaultLang('fr');
    translate.use('fr');
  }

  public async ngAfterViewInit(): Promise<void> {
    let nameA = 'DEV';
    let nameC = 'TEST';
    let nameD = 'Load Test';
    let nameE = 'PROD';
    const element: any = this.mermaidDiv.nativeElement;
    const graphDefinition = `graph LR;
    A[[${nameA}]]-->C[${nameC}];
    A-->D[${nameD}];
    C-->E[${nameE}];
    D-->E;
    
    style A fill:#aaffff,stroke:#333,stroke-width:4px
    style C fill:#bbf,stroke:#faa,stroke-width:2px,color:#fff,stroke-dasharray: 5 5

    click A onA
    click E onA
    click C onA
    click D onA
    `;
    const { svg, bindFunctions } = await mermaid.render('graphDiv', graphDefinition);
    element.innerHTML = svg;
    bindFunctions?.(element);
  }

  ngOnInit(): void {
    (window as any).onA = (nodeName: any) => {
      console.log('Hit callBackFn', nodeName);
    };

    mermaid.initialize({
      securityLevel: 'loose',
      flowchart: {
        wrappingWidth: 150
      },
    });
    mermaid.init();
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    this.langueChoisi = language;
  }

  valeurChange(event: any): void {
    this.useLanguage(event.target.value);
  }

  toggle: boolean = true;

  change() {
    this.toggle = !this.toggle;
  }

}

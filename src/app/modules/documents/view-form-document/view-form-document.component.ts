import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import mermaid from 'mermaid';
import { Router, ActivatedRoute } from '@angular/router';
import { IDocument } from 'src/app/modele/document';
import { TypeMouvement } from 'src/app/modele/typeMouvement';
import { DocumentService } from 'src/app/services/documents/document.service';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { IEtats } from 'src/app/modele/etats';

@Component({
  selector: 'app-view-form-document',
  templateUrl: './view-form-document.component.html',
  styleUrls: ['./view-form-document.component.scss'],
})
export class ViewFormDocumentComponent implements OnInit {
  @ViewChild('mermaidDivEtatsDoc', { static: false })
  mermaidDivEtatsDoc!: ElementRef;

  document: IDocument = {
    idDocument: '',
    titre: '',
    description: '',
    missions: [],
    attributs: [],
    categories: [],
    precoMouvements: [],
    etat: false,
    estencaissable: false,
    afficherPrix: false,
    contientRessources: false,
    afficherDistributeur: false,
    typeMouvement: TypeMouvement.Neutre,
    docEtats: [],
    formatCode: '',
    beneficiaireObligatoire: false,
  };
  titre: string = '';
  constructor(
    private router: Router,
    private dataEnteteMenuService: DonneesEchangeService,
    private infosPath: ActivatedRoute,
    private serviceDocument: DocumentService
  ) { }

  ngOnInit(): void {
    (window as any).onA = (nodeName: any) => {
      console.log('Hit callBackFn', nodeName);
    };

    mermaid.initialize({
      securityLevel: 'loose',
      flowchart: {
        wrappingWidth: 150,
      },
    });
    mermaid.run();

    let idDocument = this.infosPath.snapshot.paramMap.get('idDocument');
    if (idDocument != null && idDocument !== '') {
      this.serviceDocument.getDocumentById(idDocument).subscribe((x) => {
        this.document = x;
      });
    }
    this.titre = this.dataEnteteMenuService.dataEnteteMenu;
  }

  listEtats(etats: IEtats[]): string {
    let lists: string = "";
    etats?.forEach(element => {
      lists += element.libelle + ', ';
    });
    return lists;
  }

  public async ngAfterViewInit(): Promise<void> {
    const element: any = this.mermaidDivEtatsDoc.nativeElement;

    let idDocument = this.infosPath.snapshot.paramMap.get('idDocument');
    if (idDocument != null && idDocument !== '') {
      this.serviceDocument.getDocumentById(idDocument).subscribe(async (x) => {
        
        if (x.docEtats && x.docEtats.length > 0) {
          let line = `graph LR;`;
          let AllEtats = x.docEtats.length;
          console.log(AllEtats, x.docEtats.length);
          
          for (let i = 0; i < x.docEtats.length; i++) {

            if (x.docEtats[i].etat.etatPrecedant != null && x.docEtats[i].etat.etatPrecedant!.length > 0) {
              for (let j = 0; j < x.docEtats[i].etat.etatPrecedant!.length; j++) {
                console.log("j++:", j);

                line =
                  line +
                  `${x.docEtats[i].etat.etatPrecedant![j].id}[${x.docEtats[i].etat.etatPrecedant![j].libelle}]-->${x.docEtats[i].etat.id}[${x.docEtats[i].etat.libelle}];`;
              }
              console.log("PREi++:", i);
            }
            if (x.docEtats[i].etat.etatSuivant != null && x.docEtats[i].etat.etatSuivant!.length > 0) {
              for (let j = 0; j < x.docEtats[i].etat.etatSuivant!.length; j++) {
                console.log("j++:", j);

                line =
                  line +
                  `${x.docEtats[i].etat.id}[${x.docEtats[i].etat.libelle}]-->${x.docEtats[i].etat.etatSuivant![j].id}[${x.docEtats[i].etat.etatSuivant![j].libelle}];`;
              }
              console.log("SUIi++:", i);
            }

          }
          const graphDefinition =
            `graph LR;
    style 1 fill:#aaffff,stroke:#333,stroke-width:4px
    style 3 fill:#bbf,stroke:#faa,stroke-width:2px,color:#fff,stroke-dasharray: 5 5
    `;

          const { svg, bindFunctions } = await mermaid.render(
            'graphDiv',
            line
          );
          element.innerHTML = svg;
          bindFunctions?.(element);
        }
      });
    }
  }
}

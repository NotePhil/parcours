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
    if (!this.mermaidDivEtatsDoc || !this.mermaidDivEtatsDoc.nativeElement) {
      return;
    }
    const element: HTMLElement = this.mermaidDivEtatsDoc.nativeElement;

    let idDocument = this.infosPath.snapshot.paramMap.get('idDocument');
    if (idDocument != null && idDocument !== '') {
      this.serviceDocument.getDocumentById(idDocument).subscribe(async (x) => {
        if (x.docEtats && x.docEtats.length > 0) {
          try {
            const graphDefinition = this.dataEnteteMenuService.genratedgraphe(x.docEtats);
            if (!graphDefinition || graphDefinition.trim() === '' || graphDefinition.trim() === 'graph TB;') {
              element.innerHTML = '';
              return;
            }
            const uniqueId = 'mermaidDocView_' + Math.random().toString(36).substring(2, 9);
            const { svg, bindFunctions } = await mermaid.render(
              uniqueId,
              graphDefinition
            );
            element.innerHTML = svg;
            bindFunctions?.(element);
          } catch (e) {
            console.error('Erreur Mermaid view-form-document:', e);
          }
        }
      });
    }
  }
}

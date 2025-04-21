import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import mermaid from 'mermaid';
import { IParours } from 'src/app/modele/parours';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';

@Component({
  selector: 'app-modal-graphe-parcours',
  templateUrl: './modal-graphe-parcours.component.html',
  styleUrls: ['./modal-graphe-parcours.component.scss']
})
export class ModalGrapheParcoursComponent implements OnInit {
  @ViewChild('mermaidDivEtatsDoc', { static: false })
  mermaidDivEtatsDoc!: ElementRef;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private donneeDocEtatService: DonneesEchangeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialogDef: MatDialog
  ) {}

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
  }

  public async ngAfterViewInit(): Promise<void> {

    const element: any = this.mermaidDivEtatsDoc.nativeElement;
    let parcours: IParours = this.data.parcour;
    console.log('Data modal :', parcours);
    await Promise.all(
      parcours.etape.map(async (etape) => {
        await Promise.all(
          etape.document.map(async (doc) => {
            if (doc.docEtats != null && doc.docEtats.length !== 0) {
              if (doc.docEtats.length > 0) {
                const { svg, bindFunctions } = await mermaid.render(
                  'graphDiv',
                  this.donneeDocEtatService.genratedgraphe(doc.docEtats)
                );
                element.innerHTML = svg;
                bindFunctions?.(element);
              }
            }
          })
        );
      })
    );
  }
}

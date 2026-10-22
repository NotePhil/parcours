import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import mermaid from 'mermaid';
import { IParcours } from 'src/app/modele/parcours';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';

@Component({
  selector: 'app-modal-graphe-parcours',
  templateUrl: './modal-graphe-parcours.component.html',
  styleUrls: ['./modal-graphe-parcours.component.scss']
})
export class ModalGrapheParcoursComponent implements OnInit, AfterViewInit {
  @ViewChild('mermaidDivEtatsDoc', { static: false })
  mermaidDivEtatsDoc!: ElementRef;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private donneeDocEtatService: DonneesEchangeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialogRef: MatDialogRef<ModalGrapheParcoursComponent>,
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
  }

  closeModal() {
    this.dialogRef.close();
  }

  public async ngAfterViewInit(): Promise<void> {
    if (!this.mermaidDivEtatsDoc || !this.mermaidDivEtatsDoc.nativeElement) {
      return;
    }
    const element: any = this.mermaidDivEtatsDoc.nativeElement;
    let parcours: IParcours = this.data.parcour;
    console.log('Data modal :', parcours);
    if (parcours.etape != null && parcours.etape.length !== 0) {
      if (parcours.etape.length > 0) {
        try {
          const graphDefinition = this.donneeDocEtatService.genratedgraphe(undefined, parcours.etape);
          if (!graphDefinition || graphDefinition.trim() === '' || graphDefinition.trim() === 'graph TB;') {
            element.innerHTML = '';
            return;
          }
          const uniqueId = 'mermaidParcours_' + Math.random().toString(36).substring(2, 9);
          const { svg, bindFunctions } = await mermaid.render(
            uniqueId,
            graphDefinition
          );
          element.innerHTML = svg;
          bindFunctions?.(element);
        } catch (error) {
          console.error('Erreur Mermaid modal-graphe-parcours:', error);
        }
      }
    }
  }
}

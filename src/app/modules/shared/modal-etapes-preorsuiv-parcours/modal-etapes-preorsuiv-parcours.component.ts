import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import mermaid from 'mermaid';
import { IEtape } from 'src/app/modele/etape';
import { IValidation } from 'src/app/modele/validation';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { EtapesService } from 'src/app/services/etapes/etapes.service';

@Component({
  selector: 'app-modal-etapes-preorsuiv-parcours',
  templateUrl: './modal-etapes-preorsuiv-parcours.component.html',
  styleUrls: ['./modal-etapes-preorsuiv-parcours.component.scss']
})
export class ModalEtapesPreorsuivParcoursComponent implements OnInit {
  @ViewChild('mermaidDivEtapesPar', { static: false })
    mermaidDivEtapesPar!: ElementRef;
  
    formeParEtapes: FormGroup;
    etapeControl = new FormControl<string | IEtape>('');
    filteredOptions: IEtape[] | undefined;
    ELEMENTS_TABLE_PAR_ETAPES: IEtape[] = [];
    localElementTableParEtapes: IEtape[] = []; // Local variable to hold the changes
    dataSourceParEtapes = new MatTableDataSource<IEtape>(this.ELEMENTS_TABLE_PAR_ETAPES);
    displayedParEtapesColumns: string[] = [
      'actions',
      'libelle',
      //'validation',
      'EtapePrecedant'
    ]; // structure du tableau presentant les doc etapes
    selected: boolean = false;
    etapeExiste: boolean = false;
    idParEtape: string = "";
  
    constructor(
      private serviceEtape: EtapesService,
      private _liveAnnouncer: LiveAnnouncer,
      private formBuilder: FormBuilder,
      private donneeParEtapeService: DonneesEchangeService,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private router: Router,
      private dialogDef: MatDialog
    ) {
      this.formeParEtapes = this.formBuilder.group({});
    }
  
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
      this.serviceEtape.getAllEtapes().subscribe(
        (resultat) => {
          this.filteredOptions = resultat;
        }
      );
      this.ELEMENTS_TABLE_PAR_ETAPES = this.donneeParEtapeService.dataParcoursEtapes;
      this.localElementTableParEtapes = [...this.ELEMENTS_TABLE_PAR_ETAPES]; // Initialize the local variable with the existing data
      this.dataSourceParEtapes.data = this.ELEMENTS_TABLE_PAR_ETAPES;
  
      this.etapeControl.valueChanges.subscribe((value) => {
        const libelle = typeof value === 'string' ? value : value?.libelle;
        if (libelle != undefined && libelle?.length > 0) {
          this.serviceEtape
            .getEtapesBylibelle(libelle.toLowerCase() as string)
            .subscribe((reponse) => {
              this.filteredOptions = reponse;
            });
        } else {
          this.filteredOptions = [];
          this.serviceEtape.getAllEtapes().subscribe(
            (resultat) => {
              this.filteredOptions = resultat;
            }
          );
        }
      });
    }
  
    public async ngAfterViewInit(): Promise<void> {
  
      const element: any = this.mermaidDivEtapesPar.nativeElement;
  
  
      if (this.localElementTableParEtapes != null && this.localElementTableParEtapes.length !== 0) {
        if (this.localElementTableParEtapes.length > 0) {
  
          /* const { svg, bindFunctions } = await mermaid.render(
            'graphDiv',
            this.donneeParEtapeService.genratedgraphe(this.localElementTableParEtapes)
          );
          element.innerHTML = svg;
          bindFunctions?.(element); */
        }
      }
    }
  
    public rechercherListingEtape(option: IEtape) {
      this.selected = true;
      this.etapeExiste = false;
      let tabIdEtapes: string[] = [];
      this.localElementTableParEtapes.forEach(
        ParEtape => {
          if ((ParEtape.id == option.id)) {
            tabIdEtapes.push(ParEtape.id);
          }
        }
      );
  
      for (let index = 0; index < this.localElementTableParEtapes.length; index++) {
        const element = this.localElementTableParEtapes[index];
        if (element.id == option.id) {
          this.etapeExiste = true;
          break;
        }
      }
      if (!tabIdEtapes.includes(option.id)) {
        this.localElementTableParEtapes.push(option);
        this.dataSourceParEtapes.data = this.localElementTableParEtapes;
        this.selected = false;
      }
    }
  
    get f() {
      return this.formeParEtapes.controls;
    }
  
    getIdParEtape(idParEtape: string) {
      this.idParEtape = idParEtape;
    }
  
    displayFn(preco: IEtape): string {
      return preco && preco.libelle ? preco.libelle : '';
    }
  
    retirerSelectionEtape(index: number) {
      this.localElementTableParEtapes.splice(index, 1); // Remove the element from the local array
      this.localElementTableParEtapes[0].etapePrecedant = undefined
      this.dataSourceParEtapes.data = this.localElementTableParEtapes; // Update the data source with the modified local array
    }
  
  
    reinitialliseRessourceControl() {
      this.serviceEtape.getAllEtapes().subscribe(
        (resultat) => {
          this.filteredOptions = resultat;
        }
      );
      this.etapeControl.reset();
    }
  
    initialiseValidationControl(validation: IValidation) {
      this.donneeParEtapeService.dataRoleValidation = validation;
    }
  
    effaceEtapeCourrant(etape: IEtape): IEtape[] {
      let etapesFinal: IEtape[] = [];
      this.localElementTableParEtapes.forEach(
        element => {
          if (etape.libelle != element.libelle) {
            etapesFinal.push(element);
          }
        }
      );
      return etapesFinal;
    }
  
    // The onSave function to send data to donneeParEtapeService
    onSave() {
      this.donneeParEtapeService.dataParcoursEtapes = this.localElementTableParEtapes;
    }
}

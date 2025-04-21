import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IDocEtats } from 'src/app/modele/doc-etats';
import { IEtats } from 'src/app/modele/etats';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { EtatService } from 'src/app/services/etats/etats.service';
import { ModalRoleValidationComponent } from '../modal-role-validation/modal-role-validation.component';
import { IValidation } from 'src/app/modele/validation';
import mermaid from 'mermaid';

@Component({
  selector: 'app-modal-doc-etats',
  templateUrl: './modal-document-doc-etats.component.html',
  styleUrls: ['./modal-document-doc-etats.component.scss']
})
export class ModalDocEtatsComponent implements OnInit {
  @ViewChild('mermaidDivEtatsDoc', { static: false })
  mermaidDivEtatsDoc!: ElementRef;

  formeDocEtats: FormGroup;
  etatControl = new FormControl<string | IEtats>('');
  filteredOptions: IEtats[] | undefined;
  ELEMENTS_TABLE_DOC_ETATS: IDocEtats[] = [];
  localElementTableDocEtats: IDocEtats[] = []; // Local variable to hold the changes
  dataSourceDocEtats = new MatTableDataSource<IDocEtats>(this.ELEMENTS_TABLE_DOC_ETATS);
  displayedDocEtatsColumns: string[] = [
    'actions',
    'libelle',
    'validation',
    'EtatPrecedant'
  ]; // structure du tableau presentant les doc etats
  selected: boolean = false;
  etatExiste: boolean = false;
  idDOCEtat: string = "";

  constructor(
    private serviceEtat: EtatService,
    private _liveAnnouncer: LiveAnnouncer,
    private formBuilder: FormBuilder,
    private donneeDocEtatService: DonneesEchangeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialogDef: MatDialog
  ) {
    this.formeDocEtats = this.formBuilder.group({});
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
    this.serviceEtat.getAllEtats().subscribe(
      (resultat) => {
        this.filteredOptions = resultat;
      }
    );
    this.ELEMENTS_TABLE_DOC_ETATS = this.donneeDocEtatService.dataDocumentEtats;
    this.localElementTableDocEtats = [...this.ELEMENTS_TABLE_DOC_ETATS]; // Initialize the local variable with the existing data
    this.dataSourceDocEtats.data = this.ELEMENTS_TABLE_DOC_ETATS;

    this.etatControl.valueChanges.subscribe((value) => {
      const libelle = typeof value === 'string' ? value : value?.libelle;
      if (libelle != undefined && libelle?.length > 0) {
        this.serviceEtat
          .getEtatByLibelle(libelle.toLowerCase() as string)
          .subscribe((reponse) => {
            this.filteredOptions = reponse;
          });
      } else {
        this.filteredOptions = [];
        this.serviceEtat.getAllEtats().subscribe(
          (resultat) => {
            this.filteredOptions = resultat;
          }
        );
      }
    });
  }

  public async ngAfterViewInit(): Promise<void> {

    const element: any = this.mermaidDivEtatsDoc.nativeElement;


    if (this.localElementTableDocEtats != null && this.localElementTableDocEtats.length !== 0) {
      if (this.localElementTableDocEtats.length > 0) {

        const { svg, bindFunctions } = await mermaid.render(
          'graphDiv',
          this.donneeDocEtatService.genratedgraphe(this.localElementTableDocEtats)
        );
        element.innerHTML = svg;
        bindFunctions?.(element);
      }
    }
  }

  public rechercherListingEtat(option: IEtats) {
    this.selected = true;
    this.etatExiste = false;
    let tabIdEtats: string[] = [];
    this.localElementTableDocEtats.forEach(
      docEtat => {
        if ((docEtat.etat.id == option.id)) {
          tabIdEtats.push(docEtat.etat.id);
        }
      }
    );

    for (let index = 0; index < this.localElementTableDocEtats.length; index++) {
      const element = this.localElementTableDocEtats[index];
      if (element.etat.id == option.id) {
        this.etatExiste = true;
        break;
      }
    }
    if (!tabIdEtats.includes(option.id)) {
      let docEtat: IDocEtats = {
        id: option.id,
        etat: option,
        ordre: 0,
        dateCreation: new Date()
      };
      this.localElementTableDocEtats.push(docEtat);
      this.dataSourceDocEtats.data = this.localElementTableDocEtats;
      this.selected = false;
    }
  }

  get f() {
    return this.formeDocEtats.controls;
  }

  getIdDocEtat(idDocEtat: string) {
    this.idDOCEtat = idDocEtat;
  }

  displayFn(preco: IEtats): string {
    return preco && preco.libelle ? preco.libelle : '';
  }

  retirerSelectionEtat(index: number) {
    this.localElementTableDocEtats.splice(index, 1); // Remove the element from the local array
    this.localElementTableDocEtats[0].etat.etatPrecedant = undefined
    this.dataSourceDocEtats.data = this.localElementTableDocEtats; // Update the data source with the modified local array
  }


  reinitialliseRessourceControl() {
    this.serviceEtat.getAllEtats().subscribe(
      (resultat) => {
        this.filteredOptions = resultat;
      }
    );
    this.etatControl.reset();
  }

  openRoleValidationDialog() {
    const dialogRef = this.dialogDef.open(ModalRoleValidationComponent,
      {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        data: {}
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      for (let index = 0; index < this.localElementTableDocEtats.length; index++) {
        const element = this.localElementTableDocEtats[index];

        if (element.id == this.idDOCEtat) {
          element.validation = this.donneeDocEtatService.dataRoleValidation;
          this.dataSourceDocEtats.data = this.localElementTableDocEtats;
          break;
        }
      }
    });
  }

  initialiseValidationControl(validation: IValidation) {
    this.donneeDocEtatService.dataRoleValidation = validation;
  }

  effaceEtatCourrant(etats: IDocEtats): IDocEtats[] {
    let etatsFinal: IDocEtats[] = [];
    this.localElementTableDocEtats.forEach(
      element => {
        if (etats.etat.libelle != element.etat.libelle) {
          etatsFinal.push(element);
        }
      }
    );
    return etatsFinal;
  }

  // The onSave function to send data to donneeDocEtatService
  onSave() {
    this.donneeDocEtatService.dataDocumentEtats = this.localElementTableDocEtats;
  }
}

import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ElementRef, Inject, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
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
export class ModalDocEtatsComponent implements OnInit, AfterViewInit {
  @ViewChild('mermaidDivEtatsDoc', { static: false })
  mermaidDivEtatsDoc!: ElementRef;

  @ViewChildren(MatPaginator) paginators!: QueryList<MatPaginator>;

  formeDocEtats: FormGroup;
  etatControl = new FormControl<string | IEtats>('');
  filteredOptions: IEtats[] | undefined;
  ELEMENTS_TABLE_DOC_ETATS: IDocEtats[] = [];
  localElementTableDocEtats: IDocEtats[] = []; // Local variable to hold the changes

  // Premier tableau : tous les etats disponibles
  dataSourceEtats = new MatTableDataSource<IEtats>();
  displayedEtatsColumns: string[] = ['actions', 'libelle', 'description'];

  // Deuxieme tableau : etats selectionnes pour le document (dataSourceDocEtats)
  dataSourceDocEtats = new MatTableDataSource<IDocEtats>(this.ELEMENTS_TABLE_DOC_ETATS);
  displayedDocEtatsColumns: string[] = [
    'actions',
    'libelle',
    'validation',
    'EtatPrecedant'
  ]; // structure du tableau presentant les doc etats
  selected: boolean = false;
  etatExiste: boolean = false;

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
    this.serviceEtat.getAllEtats().subscribe(
      (resultat) => {
        this.filteredOptions = resultat;
        // Alimentation de la source de donnees du premier tableau avec la liste complete des etats
        this.dataSourceEtats.data = resultat;
      }
    );
    this.ELEMENTS_TABLE_DOC_ETATS = this.donneeDocEtatService.dataDocumentEtats || [];
    this.localElementTableDocEtats = [...this.ELEMENTS_TABLE_DOC_ETATS]; // Initialize the local variable with the existing data
    this.localElementTableDocEtats.forEach(docEtat => {
      if (docEtat.predecesseurDocEtat && docEtat.predecesseurDocEtat.length > 0) {
        docEtat.predecesseurDocEtat = docEtat.predecesseurDocEtat.map((pred: any) => {
          if (pred && !pred.etat) {
            const match = this.localElementTableDocEtats.find(de => de.etat?.id === pred.id);
            return match || {
              etat: pred,
              ordre: 0,
              dateCreation: new Date()
            };
          }
          return pred;
        });
      }
    });
    this.dataSourceDocEtats.data = this.localElementTableDocEtats;

    this.etatControl.valueChanges.subscribe((value) => {
      const libelle = typeof value === 'string' ? value : value?.libelle;
      if (libelle != undefined && libelle?.length > 0) {
        this.serviceEtat
          .getEtatByLibelle(libelle.toLowerCase() as string)
          .subscribe((reponse) => {
            this.filteredOptions = reponse;
            this.dataSourceEtats.data = reponse;
          });
      } else {
        this.filteredOptions = [];
        this.serviceEtat.getAllEtats().subscribe(
          (resultat) => {
            this.filteredOptions = resultat;
            this.dataSourceEtats.data = resultat;
          }
        );
      }
    });
  }

  public async renderMermaidGraph(): Promise<void> {
    if (!this.mermaidDivEtatsDoc || !this.mermaidDivEtatsDoc.nativeElement) {
      return;
    }
    const element: HTMLElement = this.mermaidDivEtatsDoc.nativeElement;

    if (!this.localElementTableDocEtats || this.localElementTableDocEtats.length === 0) {
      element.innerHTML = '';
      return;
    }

    try {
      const graphDefinition = this.donneeDocEtatService.genratedgraphe(this.localElementTableDocEtats);
      if (!graphDefinition || graphDefinition.trim() === '' || graphDefinition.trim() === 'graph TB;') {
        element.innerHTML = '';
        return;
      }
      const uniqueId = 'mermaidEtats_' + Math.random().toString(36).substring(2, 9);
      const { svg, bindFunctions } = await mermaid.render(uniqueId, graphDefinition);
      element.innerHTML = svg;
      bindFunctions?.(element);
    } catch (error) {
      console.error('Erreur lors du rendu du graphe Mermaid :', error);
    }
  }

  public async ngAfterViewInit(): Promise<void> {
    this.paginators.changes.subscribe(() => this.assignPaginators());
    this.assignPaginators();
    await this.renderMermaidGraph();
  }

  /**
   * Ajoute un etat selectionne dans le deuxieme tableau (dataSourceDocEtats)
   */
  public rechercherListingEtat(option: IEtats) {
    this.selected = true;
    this.etatExiste = false;
    let tabIdEtats: string[] = [];
    this.localElementTableDocEtats.forEach(
      docEtat => {
        if ((docEtat.etat.id == option.id)) {
          tabIdEtats.push(docEtat.etat.id!);
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
    if (!tabIdEtats.includes(option.id!)) {
      let docEtat: IDocEtats = {
        etat: option,
        ordre: this.localElementTableDocEtats.length + 1,
        dateCreation: new Date()
      };
      // Ajout dans la liste locale des etats du document
      this.localElementTableDocEtats.push(docEtat);
      // Mise a jour du 2eme tableau (dataSourceDocEtats)
      this.dataSourceDocEtats.data = [...this.localElementTableDocEtats];
      this.selected = false;
      this.renderMermaidGraph();
    }
  }

  /**
   * Verifie si un etat est deja selectionne dans la liste du document
   */
  isEtatSelected(etatId: string): boolean {
    return this.localElementTableDocEtats.some(docEtat => docEtat.etat && docEtat.etat.id === etatId);
  }

  /**
   * Gestion du clic/cochage d'un etat dans le premier tableau
   */
  onCheckEtatChange(event: any, etat: IEtats) {
    if (event.target.checked) {
      this.rechercherListingEtat(etat);
    } else {
      const index = this.localElementTableDocEtats.findIndex(docEtat => docEtat.etat && docEtat.etat.id === etat.id);
      if (index !== -1) {
        this.retirerSelectionEtat(index);
      }
    }
  }

  get f() {
    return this.formeDocEtats.controls;
  }

  displayFn(preco: IEtats): string {
    return preco && preco.libelle ? preco.libelle : '';
  }

  /**
   * Retire un etat selectionne du deuxieme tableau (dataSourceDocEtats)
   */
  retirerSelectionEtat(index: number) {
    const removedItem = this.localElementTableDocEtats[index];
    const removedEtatId = removedItem?.etat?.id;

    this.localElementTableDocEtats.splice(index, 1); // Retire l'element de la liste locale

    if (removedEtatId) {
      this.localElementTableDocEtats.forEach(docEtat => {
        if (docEtat.predecesseurDocEtat) {
          docEtat.predecesseurDocEtat = docEtat.predecesseurDocEtat.filter(pred => {
            const predId = pred.etat?.id || pred.id;
            return predId !== removedEtatId;
          });
        }
      });
    }

    // Mise a jour de la source de donnees du 2eme tableau
    this.dataSourceDocEtats.data = [...this.localElementTableDocEtats];
    this.renderMermaidGraph();
  }


  reinitialliseRessourceControl() {
    this.serviceEtat.getAllEtats().subscribe(
      (resultat) => {
        this.filteredOptions = resultat;
        this.dataSourceEtats.data = resultat;
      }
    );
    this.etatControl.reset();
  }

  // MODIFICATION: Refactorisation synchrone pour transmettre le docEtat et sa validation à la modale de rôle de validation
  openRoleValidationDialog(docEtat: IDocEtats) {
    const targetEtatId = docEtat.etat?.id || docEtat.etat?.libelle || '';
    this.donneeDocEtatService.dataRoleValidation = docEtat.validation;

    const dialogRef = this.dialogDef.open(ModalRoleValidationComponent,
      {
        maxWidth: '100vw',
        maxHeight: '100vh',
        height: '100%',
        width: '100%',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        data: { validation: docEtat.validation }
      }
    );

    dialogRef.afterClosed().subscribe((result: IValidation | undefined) => {
      const selectedValidation = result !== undefined ? result : this.donneeDocEtatService.dataRoleValidation;
      for (let index = 0; index < this.localElementTableDocEtats.length; index++) {
        const element = this.localElementTableDocEtats[index];
        const elemId = element.etat?.id || element.etat?.libelle;

        if (elemId === targetEtatId) {
          element.validation = selectedValidation;
          this.dataSourceDocEtats.data = [...this.localElementTableDocEtats];
          this.renderMermaidGraph();
          break;
        }
      }
    });
  }

  compareEtats(e1: any, e2: any): boolean {
    if (!e1 || !e2) {
      return e1 === e2;
    }
    const id1 = e1.id || e1.etat?.id;
    const id2 = e2.id || e2.etat?.id;
    return id1 !== undefined && id2 !== undefined ? id1 === id2 : e1 === e2;
  }

  initialiseValidationControl(validation: IValidation) {
    this.donneeDocEtatService.dataRoleValidation = validation;
  }

  /**
   * Retourne la liste des etats precedents eligibles en excluant l'etat courant
   */
  effaceEtatCourrant(etats: IDocEtats): IDocEtats[] {
    // MODIFICATION: Utilisation de etats.etat.id au lieu de etats.id car docEtat ne contient plus d'identifiant
    const idToRemove = etats?.etat?.id;
    // MODIFICATION: Filtrage par l'id de l'état (e.etat.id) au lieu de e.id
    return this.localElementTableDocEtats.filter(e => e.etat?.id !== idToRemove);
  }

  // Sauvegarde des etats selectionnes dans le service de donnees
  onSave() {
    this.donneeDocEtatService.dataDocumentEtats = this.localElementTableDocEtats.map(
      (docEtat) => this.withDirectPredecessors(docEtat)
    );
  }

  private withDirectPredecessors(docEtat: IDocEtats): IDocEtats {
    const { predecesseurDocEtat, ...docEtatWithoutPredecessors } = docEtat;

    if (!predecesseurDocEtat || predecesseurDocEtat.length === 0) {
      return docEtatWithoutPredecessors;
    }

    return {
      ...docEtatWithoutPredecessors,
      predecesseurDocEtat: predecesseurDocEtat.map((predecesseur) => {
        const { predecesseurDocEtat: _, ...directPredecesseur } = predecesseur;
        return directPredecesseur;
      }),
    };
  }

  private assignPaginators() {
    const paginatorArray = this.paginators.toArray();
    if (paginatorArray.length > 0) {
      this.dataSourceEtats.paginator = paginatorArray[0];
    }
    if (paginatorArray.length > 1) {
      this.dataSourceDocEtats.paginator = paginatorArray[1];
    }
  }
}

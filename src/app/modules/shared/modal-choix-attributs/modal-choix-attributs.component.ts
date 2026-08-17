import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { IAttributs } from 'src/app/modele/attributs';
import { ICategorieAffichage } from 'src/app/modele/categorie-affichage';
import { AttributService } from 'src/app/services/attributs/attribut.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';

@Component({
  selector: 'app-modal-choix-attributs',
  templateUrl: './modal-choix-attributs.component.html',
  styleUrls: ['./modal-choix-attributs.component.scss'],
})
export class ModalChoixAttributsComponent implements OnInit {
  selectedAttributeIds: string[] = [];
  formeAttribut: FormGroup;
  myControl = new FormControl<string | IAttributs>('');
  ELEMENTS_TABLE_ATTRIBUTS: IAttributs[] = [];
  filteredOptions: IAttributs[] | undefined;
  displayedAttributsColumns: string[] = [
    'actions',
    'titre',
    'description',
    'type'
  ];
  dataSourceAttribut = new MatTableDataSource<IAttributs>(
    this.ELEMENTS_TABLE_ATTRIBUTS
  );
  dataSourceAttributResultat = new MatTableDataSource<IAttributs>();
  initialDataDocumentAttributs: IAttributs[] = [];
  localSelectedAttributes: IAttributs[] = [];
  idAttribut: string = '';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private infosPath: ActivatedRoute,
    private serviceAttribut: AttributService,
    private _liveAnnouncer: LiveAnnouncer,
    private donneeDocCatService: DonneesEchangeService,
    private dialogDef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formeAttribut = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.initialDataDocumentAttributs = JSON.parse(JSON.stringify(this.donneeDocCatService.dataDocumentAttributs));
    this.localSelectedAttributes = [...this.initialDataDocumentAttributs];
    this.loadSelectedAttributes();
    this.getAllAttributs().subscribe((valeurs) => {
      this.dataSourceAttribut.data = valeurs;
      this.filteredOptions = valeurs;
    });
    this.dataSourceAttributResultat.data = this.localSelectedAttributes;
    this.myControl.valueChanges.subscribe((value) => {
      const titre = typeof value === 'string' ? value : value?.titre;
      if (titre !== undefined && titre?.length > 0) {
        this.serviceAttribut
          .getAttributsByTitre(titre.toLowerCase() as string)
          .subscribe((reponse) => {
            this.filteredOptions = reponse;
          });
      } else {
        this.serviceAttribut.getAllAttributs().subscribe((reponse) => {
          this.filteredOptions = reponse;
        });
      }
    });
  }

  onCheckAttributChange(event: any) {
    let listIdAttTemp: string[] = [];
    let positionsAttr = new Map();
    let indexAttrCourant: number = 0;
    this.localSelectedAttributes.forEach((element: IAttributs) => {
      listIdAttTemp.push(element.id!);
      positionsAttr.set(element.id, indexAttrCourant++);
    });
    if (event.target.checked) {
      if (!listIdAttTemp.includes(this.idAttribut)) {
        this.ajoutSelectionAttribut(this.idAttribut);
      }
    } else {
      if (listIdAttTemp.includes(this.idAttribut)) {
        const index = positionsAttr.get(this.idAttribut);
        this.retirerSelectionAttribut(index);
      }
    }
  }

  getAttributId(idAttribut: string) {
    this.idAttribut = idAttribut;
  }

  ajoutSelectionAttribut(idAttribut: string) {
    if (!this.localSelectedAttributes.some((attr) => attr.id === idAttribut)) {
      this.serviceAttribut.getAttributById(idAttribut).subscribe((val) => {
        this.localSelectedAttributes.push(val);
        this.dataSourceAttributResultat.data = [...this.localSelectedAttributes];
        this.loadSelectedAttributes();
      });
    }
  }

  retirerSelectionAttribut(target: IAttributs | number | string) {
    let index = -1;
    if (typeof target === 'number') {
      index = target;
    } else if (typeof target === 'string') {
      index = this.localSelectedAttributes.findIndex((attr) => attr.id === target);
    } else if (target && target.id) {
      index = this.localSelectedAttributes.findIndex((attr) => attr.id === target.id);
    }

    if (index !== -1 && index < this.localSelectedAttributes.length) {
      this.localSelectedAttributes.splice(index, 1);
      this.dataSourceAttributResultat.data = [...this.localSelectedAttributes];
      this.loadSelectedAttributes();
    }
  }

  private getAllAttributs() {
    return this.serviceAttribut.getAllAttributs();
  }

  displayFn(attribue: IAttributs): string {
    return attribue && attribue.titre ? attribue.titre : '';
  }

  ngAfterViewInit() {
    this.dataSourceAttribut.paginator = this.paginator;
    this.dataSourceAttribut.sort = this.sort;
  }

  public rechercherListingAttribut(option: IAttributs) {
    this.serviceAttribut
      .getAttributsByTitre(option.titre.toLowerCase())
      .subscribe((valeurs) => {
        this.dataSourceAttribut.data = valeurs;
      });
  }

  loadSelectedAttributes() {
    this.selectedAttributeIds = this.localSelectedAttributes.map(
      (attr: IAttributs) => attr.id!
    );
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onSave() {
    this.donneeDocCatService.dataDocumentAttributs = [...this.localSelectedAttributes];
    const selectedIds = this.localSelectedAttributes.map((attr) => attr.id);
    if (Array.isArray(this.donneeDocCatService.dataDocumentCategorie)) {
      this.donneeDocCatService.dataDocumentCategorie =
        this.donneeDocCatService.dataDocumentCategorie.filter(
          (catItem: ICategorieAffichage) =>
            catItem &&
            catItem.attributCategories &&
            catItem.attributCategories.attribut &&
            selectedIds.includes(catItem.attributCategories.attribut.id)
        );
    }
    this.dialogDef.closeAll();
  }
}

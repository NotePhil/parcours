import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, EMPTY, merge } from 'rxjs';
import { RessourcesService } from 'src/app/services/ressources/ressources.service';
import { IRessource } from 'src/app/modele/ressource';
import { IFamille } from 'src/app/modele/famille';

@Component({
  selector: 'app-list-ressources',
  templateUrl: './list-ressources.component.html',
  styleUrls: ['./list-ressources.component.scss'],
})
export class ListRessourcesComponent implements OnInit {
  ressources$: Observable<IRessource> = EMPTY;

  forme: FormGroup;
  filteredOptionsFamilly: IRessource[] | undefined;
  myControl = new FormControl<string | IRessource>('');

  ELEMENTS_TABLE: IRessource[] = [];
  filteredOptions: IRessource[] | undefined;

  displayedColumns: string[] = [
    'libelle',
    'etat',
    'quantite',
    'unite',
    'prixEntree',
    'prixDeSortie',
    'seuil',
    'famille',
    'actions',
  ];

  dataSource = new MatTableDataSource<IRessource>(this.ELEMENTS_TABLE);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private serviceRessource: RessourcesService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.forme = formBuilder.group({
          min: [undefined],
          max: [undefined],
          prixMin: [undefined],
          prixMax: [undefined],
          familly: new FormControl<string | IFamille>(''),
          myControl: new FormControl<string | IRessource>('')
        })
  }

  ngOnInit(): void {
    this.getAllRessources().subscribe((valeurs) => {
      this.dataSource.data = valeurs;
      this.filteredOptions = valeurs;
      this.filteredOptionsFamilly = valeurs;
    });

    this.myControl.valueChanges.subscribe((value) => {
      const libelle = typeof value === 'string' ? value : value?.libelle;
      if (libelle != undefined && libelle?.length > 0) {
        this.serviceRessource
          .getRessourcesByLibelle(libelle.toLowerCase() as string)
          .subscribe((reponse) => {
            this.filteredOptions = reponse;
          });
      } else {
        this.serviceRessource.getAllRessources().subscribe((reponse) => {
          this.filteredOptions = reponse;
        });
      }
    });
  }

  private getAllRessources() {
    return this.serviceRessource.getAllRessources();
  }

  get fRessources() {
    return this.forme.controls;
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, ''); // Supprime les caractères non numériques
  }

  displayFn(attribue: IRessource): string {
    return attribue && attribue.libelle ? attribue.libelle : '';
  }

  displayFnFamille(attribue: IFamille): string {
    return attribue && attribue.libelle ? attribue.libelle : '';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public rechercherListingRessource(option: IRessource) {
    this.serviceRessource
      .getRessourcesByLibelle(option.libelle.toLowerCase())
      .subscribe((valeurs) => {
        this.dataSource.data = valeurs;
      });
  }

  public rechercherListingAllRessources() {
  
      merge(
            this.forme.controls['myControl'].valueChanges,
            this.forme.controls['familly'].valueChanges,
            this.forme.controls['prixMin'].valueChanges,
            this.forme.controls['prixMax'].valueChanges,
            this.forme.controls['min'].valueChanges,
            this.forme.controls['max'].valueChanges
          ).subscribe((value) => {
            // Détermine quel contrôle a changé
            const controlName = Object.keys(this.forme.controls).find(
              key => this.forme.controls[key].value === value
            );
            console.log('Un contrôle a changé :', this.forme.controls[controlName!].value, value);
      
            let res, fam, min, max, prixmin, prixmax;
            const ressource = typeof res === 'string' ? this.forme.controls['myControl'].value : this.forme.controls['myControl'].value?.libelle;
            const family = typeof fam === 'string' ? this.forme.controls['familly'].value : this.forme.controls['familly'].value?.libelle;
            const prixminim = typeof prixmin === 'number' ? this.forme.controls['min'].value : this.forme.controls['prixMin'].value;
            const prixmaxim = typeof prixmax === 'number' ? this.forme.controls['max'].value : this.forme.controls['prixMax'].value;
            const minim = typeof min === 'number' ? this.forme.controls['min'].value : this.forme.controls['min'].value;
            const maxim = typeof max === 'number' ? this.forme.controls['max'].value : this.forme.controls['max'].value;
            console.log(ressource, family, minim, maxim, prixminim, prixmaxim);
      
            if ((ressource != undefined && ressource?.length > 0) || (family != undefined && family?.length > 0) || (minim != undefined && minim >= 0) || (maxim != undefined && maxim >= 0) || (prixminim != undefined && prixminim >= 0) || (prixmaxim != undefined && prixmaxim >= 0)) {
              this.serviceRessource
                .getRessourcesFinds(ressource?.toLowerCase() as string, family?.toLowerCase() as string, minim as number, maxim as number, prixminim as number, prixmaxim as number)
                .subscribe((reponse) => {
                  this.dataSource.data = reponse;
                });
            } else {
              this.serviceRessource.getAllRessources().subscribe((reponse) => {
                this.dataSource.data = reponse;
              });
            }
          })
    }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

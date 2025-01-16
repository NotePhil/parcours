import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, EMPTY } from 'rxjs';
import { RessourcesService } from 'src/app/services/ressources/ressources.service';
import { IRessource } from 'src/app/modele/ressource';

@Component({
  selector: 'app-search-ressource',
  templateUrl: './search-ressource.component.html',
  styleUrls: ['./search-ressource.component.scss']
})
export class SearchRessourceComponent implements OnInit {
  ressources$: Observable<IRessource> = EMPTY;

  ELEMENTS_TABLE: IRessource[] = [];
  filteredOptions: IRessource[] | undefined;
  myControl = new FormControl<string | IRessource>('');


  displayedColumns: string[] = [
    'libelle',
    'etat',
    'quantite',
    'seuil',
    'unite',
    'prixEntree',
    'prixDeSortie',
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
  ) { }

  ngOnInit(): void {
    this.getAllRessources().subscribe((valeurs) => {
      this.dataSource.data = valeurs;
      this.filteredOptions = valeurs;
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
    return this.serviceRessource.getAllRessourcesBySeuil();
  }

  displayFn(attribue: IRessource): string {
    return attribue && attribue.libelle ? attribue.libelle : '';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public rechercherListingRessource(option: IRessource): IRessource[] {
    return this.dataSource.data = this.filteredOptions!.filter((p) => p.libelle.toLowerCase().startsWith(option.libelle.toLowerCase()));
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IParcours } from 'src/app/modele/parcours';
import { ParcoursService } from 'src/app/services/parcours/parcours.service';
import { IAfficheParcours } from 'src/app/modele/affiche-parcours';
import { TranslateService } from '@ngx-translate/core';
import { IElements } from 'src/app/modele/elements';
import { EMPTY, Observable } from 'rxjs';
import { PassActionService } from 'src/app/services/actions-view/pass-action.service';
import { ModalGrapheParcoursComponent } from '../../shared/modal-graphe-parcours/modal-graphe-parcours.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-parcours',
  templateUrl: './list-parcours.component.html',
  styleUrls: ['./list-parcours.component.scss'],
})
export class ListParcoursComponent implements OnInit {
  //parcours$:Observable<IParcours[]>=EMPTY;
  myControl = new FormControl<string | IParcours>('');
  receivedActions$: Observable<IElements[]>=EMPTY;
  actions : IElements[] | undefined;

  //ELEMENTS_TABLE: IParcours[] = [];
  ELEMENTS_TABLE: IAfficheParcours[] = [];
  filteredOptions: IParcours[] | undefined;

  displayedColumns: string[] = ['libelle', 'etape', 'actions'];

  dataSource = new MatTableDataSource<IParcours>(this.ELEMENTS_TABLE);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  tableParcours: IAfficheParcours[] = [];
  afficheParcours: IAfficheParcours = {
    id: '',
    libelle: '',
    etape: [],
    listeEtape: '',
  };
  constructor(
    private translate: TranslateService,
    private router: Router,
    private dialogDef: MatDialog,
    private _liveAnnouncer: LiveAnnouncer,
    private serviceParcours: ParcoursService,
    private actionsview: PassActionService
  ) {}

  ngOnInit(): void {
    this.actionsview.langueData$.subscribe(data => {
      this.receivedActions$ = this.actionsview.getActions();
      this.receivedActions$.subscribe(a => {
        if (a != null) {
          this.actions = a;
          console.log("Actions view :", a, this.receivedActions$);
        }
      });
    })
    this.getAllParcours().subscribe((valeurs) => {
      const tableParcours: IAfficheParcours[] = [];
      valeurs.forEach((x) => {
        tableParcours.push(this.convertParToParAffiche(x));
      });
      this.dataSource.data = tableParcours;
    });

    this.myControl.valueChanges.subscribe((value) => {
      const libelle = typeof value === 'string' ? value : value?.libelle;
      if (libelle != undefined && libelle?.length > 0) {
        this.serviceParcours
          .getParcoursBylibelle(libelle.toLowerCase() as string)
          .subscribe((reponse) => {
            this.filteredOptions = reponse;
          });
      } else {
        this.filteredOptions = [];
      }
    });
  }

  displayFn(parcours: IParcours): string {
    return parcours && parcours.libelle ? parcours.libelle : '';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public rechercherListingParcours(option: IParcours) {
    this.serviceParcours
      .getParcoursBylibelle(option.libelle.toLowerCase())
      .subscribe((valeurs) => {
        const tableParcours: IAfficheParcours[] = [];
        valeurs.forEach((x) => {
          tableParcours.push(this.convertParToParAffiche(x));
        });
        this.dataSource.data = tableParcours;
      });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  private getAllParcours() {
    return this.serviceParcours.getAllParcours();
  }

  openModalGrapheParcours(parcours: IParcours) {
    console.log("parcours graphe :", parcours);
    
    const dialogRef = this.dialogDef.open(ModalGrapheParcoursComponent, {
          height: '90%',
          width: '65%',
          maxWidth: '100vw',
          maxHeight: '100vh',
          enterAnimationDuration: '1000ms',
          exitAnimationDuration: '1000ms',
          data: {parcour: parcours},
        });
    
        dialogRef.afterClosed().subscribe((result) => {
          
        });
  }

  private convertParToParAffiche(x: IParcours): IAfficheParcours {
    let afficheParcours: IAfficheParcours = {
      id: '',
      libelle: '',
      etape: [],
      listeEtape: '',
    };
    console.log('parc', afficheParcours);
    afficheParcours.id = x.id;
    afficheParcours.libelle = x.libelle;
    afficheParcours.etape = x.etape;
    x.etape.forEach((e) => {
      afficheParcours.listeEtape += e.libelle + ', ';
    });
    return afficheParcours;
  }
}

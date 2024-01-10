import { Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { IParours } from 'src/app/modele/parours';
import { ParoursService } from 'src/app/services/parours/parours.service';

@Component({
  selector: 'app-list-parours',
  templateUrl: './list-parours.component.html',
  styleUrls: ['./list-parours.component.scss']
})
export class ListParoursComponent implements OnInit {
  parours$:Observable<IParours[]>=EMPTY;
  myControl = new FormControl<string | IParours>('');

  ELEMENTS_TABLE: IParours[] = [];
  filteredOptions: IParours[] | undefined;

  displayedColumns: string[] = ['libelle','etape', 'actions'];

  dataSource = new MatTableDataSource<IParours>(this.ELEMENTS_TABLE);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;
  constructor(private router:Router, private _liveAnnouncer: LiveAnnouncer, private serviceParours:ParoursService) { }

  ngOnInit(): void {
    this.getAllParours().subscribe(valeurs => {
      this.dataSource.data = valeurs;
    });

    this.myControl.valueChanges.subscribe(
      value => {
        const libelle = typeof value === 'string' ? value : value?.libelle;
        if(libelle != undefined && libelle?.length >0){
          this.serviceParours.getParoursBylibelle(libelle.toLowerCase() as string).subscribe(
            reponse => {
              this.filteredOptions = reponse;
            }
          )
        }
        else{
          this.filteredOptions = [];
        }

      }
    );
  }

  displayFn(task: IParours): string {
    return task && task.libelle ? task.libelle : '';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public rechercherListingParours(option: IParours){
    this.serviceParours.getParoursBylibelle(option.libelle.toLowerCase()).subscribe(
        valeurs => {this.dataSource.data = valeurs;}
    )
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  private getAllParours(){
    return this.serviceParours.getAllParours();
  }

}

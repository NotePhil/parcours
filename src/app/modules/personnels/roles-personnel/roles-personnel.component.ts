import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { IPersonnel } from 'src/app/modele/personnel';
import { IRole } from 'src/app/modele/role';
import { PersonnelsService } from 'src/app/services/personnels/personnels.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { VerificationsdatesrolesService } from 'src/app/services/verifications/verificationsdatesroles.service';
import { IObjetDates } from 'src/app/modele/objet-dates';

@Component({
  selector: 'app-roles-personnel',
  templateUrl: './roles-personnel.component.html',
  styleUrls: ['./roles-personnel.component.scss'],
})
export class RolesPersonnelComponent implements OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  myControl = new FormControl<string | IRole>('');
  //personnel$:Observable<personnel>=EMPTY;
  personnel!: IPersonnel;
  forme: FormGroup;
  nomPersonnel = '';
  textError = "";
  datas: any[] = [];
  ELEMENTS_TABLE: any[] = [];
  filteredOptions: IRole[] | undefined;
  displayedColumns: string[] = ['selection', 'titre', 'description', 'etat'];
  displayedrolesColumns: string[] = [
    'annuler',
    'role',
    'date debut',
    'date fin',
  ];
  dataSource = new MatTableDataSource<IRole>();
  dataSourceRoleResultat = new MatTableDataSource<any>();
  newdates: IObjetDates | undefined;
  olddates: IObjetDates | undefined;
  idRole: string = '';
  submitted: boolean = false;
  verif: boolean = false;
  modif: boolean = false;
  test: Date | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private _liveAnnouncer: LiveAnnouncer,
    private personnelService: PersonnelsService,
    private verificationsServices: VerificationsdatesrolesService,
    private serviceRole: RolesService,
    private router: Router,
    private infosPath: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.forme = this.formBuilder.group({
      dateEntree: ['', Validators.required],
      status: [0],
      dateFin: [''],
    });
  }

  displayFn(role: IRole): string {
    return role && role.titre ? role.titre : '';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public rechercherListingRole(option: IRole) {
    this.serviceRole
      .getRolesBytitre(option.titre.toLowerCase())
      .subscribe((valeurs) => {
        this.dataSource.data = valeurs;
      });
  }

  ngOnInit(): void {
    let idPersonnel = this.infosPath.snapshot.paramMap.get('idPersonnel');

    if (this.forme.value.dateEntree) {
      this.verif = false;
    }

    if (idPersonnel != null && idPersonnel !== '') {
      this.personnelService.getPersonnelById(idPersonnel).subscribe((x) => {
        this.personnel = x;
        this.nomPersonnel = this.personnel?.nom + ' ' + this.personnel?.prenom;
        this.dataSourceRoleResultat.data = this.personnel?.roles!;
        console.log('modification :', this.dataSourceRoleResultat.data);
        if (this.personnel?.roles) {
          this.modif = true;
        }
      });

      this.getAllRoles().subscribe((valeurs) => {
        this.dataSource.data = valeurs;
      });

      this.myControl.valueChanges.subscribe((value) => {
        const name = typeof value === 'string' ? value : value?.titre;
        if (name != undefined && name?.length > 0) {
          this.serviceRole
            .getRolesBytitre(name.toLowerCase() as string)
            .subscribe((reponse) => {
              this.filteredOptions = reponse;
            });
        } else {
          this.filteredOptions = [];
        }
      });
    }
  }

  private getAllRoles() {
    return this.serviceRole.getAllRoles();
  }

  get f() {
    return this.forme.controls;
  }

  onCheckRoleChange(event: any, element: IRole) {
    let listIdRolesTemp: any[] = [];
    if (event.target.checked) {
      if (!listIdRolesTemp.includes(this.idRole)) {
        this.submitted = true;

        if (this.forme.invalid) {
          event.target.checked = false;
          return;
        }
        var j = 0;
        this.verif = false;
        while (j < this.dataSourceRoleResultat.data.length) {
          if (this.dataSourceRoleResultat.data[j].role.id == element.id) {
            /* console.log("date service :", this.dataSourceRoleResultat.data[j].dateDebut);
              if (this.dataSourceRoleResultat.data[j].dateFin == "" && this.forme.value.dateFin == "") {
                  this.verif = true
                  event.target.checked = false
                  this.textError = "Les intervalles de dates ne correspondent pas !"
              } else if (this.dataSourceRoleResultat.data[j].dateFin != "" && this.forme.value.dateFin != "") {
                if (this.forme.value.dateEntree < this.dataSourceRoleResultat.data[j].dateFin) {
                  this.verif = true
                  event.target.checked = false
                  this.textError = "Intervalle de dates incorrectes !"
                }
              } else if (this.dataSourceRoleResultat.data[j].dateFin != "" || this.forme.value.dateFin != "") {
                if (this.forme.value.dateEntree < this.dataSourceRoleResultat.data[j].dateFin || this.dataSourceRoleResultat.data[j].dateEntree >= this.forme.value.dateEntree) {
                  this.verif = true
                  event.target.checked = false
                  this.textError = "La date n'es pas valide !"
                }
              } */
            console.log(
              'date service :',
              this.dataSourceRoleResultat.data[j].dateDebut
            );

            this.newdates = {
              dateDebut: this.forme.value.dateEntree,
              dateFin: this.forme.value.dateFin,
            };
            this.olddates = {
              dateDebut: this.dataSourceRoleResultat.data[j].dateDebut,
              dateFin: this.dataSourceRoleResultat.data[j].dateFin,
            };
            let res = this.verificationsServices.OncheckedDatesRoles(
              this.olddates,
              this.newdates
            );
            console.log('reponse service :', this.newdates.dateFin);
            if (res == false) {
              this.test = this.forme.value.dateEntree
              this.verif = true
              event.target.checked = false;
              this.textError = "Impossible les intervalles de temps ne sont pas correctes";
            }
          }
          j++;
        }
        if (event.target.checked) {
          this.ajoutSelectionRole(element);
          this.datas.push({ id: element.id, event: event });
        }
      }
    } else {
      let i = 0;
      let res = false;

      while (res == false) {
        if (this.datas[i].id == element.id) {
          this.ELEMENTS_TABLE.splice(i, 1); // je supprime un seul element du tableau a la position 'i'
          this.datas.splice(i, 1);
          res = true;
        }
        i++;
      }
    }
  }

  retirerSelectionRole(index: number) {
    let temp = this.dataSourceRoleResultat.data;
    temp.splice(index, 1); // je supprime un seul element du tableau a la position 'i'
    this.dataSourceRoleResultat.data = temp;
  }

  validateElement() {
    let tabTemp = this.dataSourceRoleResultat.data;
    this.ELEMENTS_TABLE.forEach((elt) => tabTemp.push(elt));
    this.dataSourceRoleResultat.data = tabTemp;
    this.datas.forEach((c) => (c.event.target.checked = false));
    this.ELEMENTS_TABLE = [];
    this.datas = [];
  }

  annullerElement() {
    this.datas.forEach((c) => (c.event.target.checked = false));
    this.ELEMENTS_TABLE = [];
    this.datas = [];
  }

  ajoutSelectionRole(rol: IRole) {
    console.log('element selectionne :', this.ELEMENTS_TABLE);

    this.ELEMENTS_TABLE.push({
      role: rol,
      status: false,
      dateDebut: this.forme.value.dateEntree,
      dateFin: this.forme.value.dateFin,
    });
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  onSubmit(personnelInput: any) {
    this.personnel.roles = personnelInput.filteredData;

    this.personnelService
      .ajouterPersonnel(this.personnel)
      .subscribe((object) => {
        this.router.navigate(['/list-personnels']);
      });
  }
}

import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { IPersonnel } from 'src/app/modele/personnel';
import { IRole } from 'src/app/modele/role';
import { PersonnelsService } from 'src/app/services/personnels/personnels.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import {v4 as uuidv4} from 'uuid';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-roles-personnel',
  templateUrl: './roles-personnel.component.html',
  styleUrls: ['./roles-personnel.component.scss']
})
export class RolesPersonnelComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  myControl = new FormControl<string | IRole>('');
  //personnel$:Observable<personnel>=EMPTY;
  personnel : IPersonnel|undefined;
  forme: FormGroup;
  nomPersonnel = "";
  datas: any[] = []
  ELEMENTS_TABLE: any[] = [];
  VALIDATE_ROLE: any = {};
  filteredOptions: IRole[] | undefined;
  displayedColumns: string[] = ['selection', 'titre', 'description', 'etat'];
  dataSource = new MatTableDataSource<IRole>(this.ELEMENTS_TABLE);
  dataSourceRoleResultat = new MatTableDataSource<any>();
  idRole: string = '';
  constructor(private formBuilder:FormBuilder, private _liveAnnouncer: LiveAnnouncer, private personnelService:PersonnelsService, private serviceRole: RolesService, private router:Router, private infosPath:ActivatedRoute, private datePipe: DatePipe) { 
    this.forme =  this.formBuilder.group({
      dateEntree: ['1980-01-01', Validators.required],
      dateFin: [''],
    })    

  }

  displayFn(role: IRole): string {
    return role && role.titre ? role.titre : '';
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public rechercherListingRole(option: IRole){
    this.serviceRole.getRolesBytitre(option.titre.toLowerCase()).subscribe(
        valeurs => {this.dataSource.data = valeurs;}
    )
  }

  ngOnInit(): void {
    let idPersonnel = this.infosPath.snapshot.paramMap.get('idPersonnel');
    if((idPersonnel != null) && idPersonnel!==''){     
      
      this.personnelService.getPersonnelById(idPersonnel).subscribe(x =>
      {
        this.personnel = x;
        this.nomPersonnel = this.personnel?.nom+" "+this.personnel?.prenom
        
      });


      this.getAllRoles().subscribe(valeurs => {
        this.dataSource.data = valeurs;
      });

      this.myControl.valueChanges.subscribe(
        value => {
          const name = typeof value === 'string' ? value : value?.titre;
          if(name != undefined && name?.length >0){
            this.serviceRole.getRolesBytitre(name.toLowerCase() as string).subscribe(
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
}    

  private getAllRoles(){
    return this.serviceRole.getAllRoles();
  }

  get f(){
    return this.forme.controls;
  }

  getRoleId(idrol: IRole) {
    this.idRole = idrol.id;
  }

  onCheckRoleChange(event: any) {
    let listIdRolesTemp : any[] = []
    if (event.target.checked) {
      if (!listIdRolesTemp.includes(this.idRole)) {
        this.ajoutSelectionRole(this.idRole);
        this.datas.push({id: this.idRole, event: event})
      }
      console.log("resultat :", this.datas);
      
    } else {
      this.retirerSelectionRole(this.idRole);
      let i = 0;
      let res = false;
      while (res == false ) {
        if (this.datas[i].id == this.idRole) {
            this.datas[i].splice(i, 1);
            res = true;
        }
        i++;
      }
    }
  }

  retirerSelectionRole(index: String) {
    let i = 0;
    let res = false;
    this.ELEMENTS_TABLE = this.dataSourceRoleResultat.data;
    while (res == false ) {
      if (this.ELEMENTS_TABLE[i].role.id == index) {
          this.ELEMENTS_TABLE.splice(i, 1); // je supprime un seul element du tableau a la position 'i'
          res = true;
      }
      i++;
    }
    this.dataSourceRoleResultat.data = this.ELEMENTS_TABLE
  }

  unchecked(index: String) {
    let i = 0;
    let res = false;
    while (res == false ) {
      if (this.datas[i].id == index) {
        let find = false;
        let j = 0;
        while (find == false) {
          if (this.dataSource.data[j].id == index) {
            this.datas[i].event.target.checked = false;   
          }
        }
        this.datas[i].splice(i, 1);
        res = true;
      }
      i++
    }
  }

  ajoutSelectionRole(idrole: string) {
    this.serviceRole.getRoleById(idrole).subscribe((val) => {
      if(this.forme.invalid) return;
      
      this.ELEMENTS_TABLE = this.dataSourceRoleResultat.data;
      this.ELEMENTS_TABLE.push({
        role: val,
        dateEntree: this.forme.value.dateEntree,
        dateFin: this.forme.value.dateFin
      });
      this.dataSourceRoleResultat.data = this.ELEMENTS_TABLE
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

  onSubmit(personnelInput:any){
    //Todo la validation d'element non conforme passe
    if(this.forme.invalid) return;

    let personnelTemp : IPersonnel={
      id: uuidv4(),
      nom:personnelInput.nom,
      prenom:personnelInput.prenom,
      sexe:personnelInput.sexe,
      email:personnelInput.email,
      telephone:personnelInput.telephone,
      dateNaissance:personnelInput.dateNaissance,
      dateEntree: personnelInput.dateEntree,
      dateSortie: personnelInput.dateSortie
    }

    if(this.personnel != undefined){
      personnelTemp.id = this.personnel.id  
    }
    this.personnelService.ajouterPersonnel(personnelTemp).subscribe(
      object => {
        this.router.navigate(['/list-personnels']);
      }
    )
  }

}

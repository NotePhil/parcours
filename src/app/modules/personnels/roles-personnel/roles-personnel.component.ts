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
  personnel!: IPersonnel;
  forme: FormGroup;
  nomPersonnel = "";
  datas: any[] = []
  ELEMENTS_TABLE: any[] = [];
  filteredOptions: IRole[] | undefined;
  displayedColumns: string[] = ['selection', 'titre', 'description', 'etat'];
  dataSource = new MatTableDataSource<IRole>(this.ELEMENTS_TABLE);
  dataSourceRoleResultat = new MatTableDataSource<any>();
  idRole: string = '';
  submitted: boolean=false;

  constructor(private formBuilder:FormBuilder, private _liveAnnouncer: LiveAnnouncer, private personnelService:PersonnelsService, private serviceRole: RolesService, private router:Router, private infosPath:ActivatedRoute, private datePipe: DatePipe) { 
    this.forme =  this.formBuilder.group({
      dateEntree: ['', Validators.required],
      dateFin: ['']
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
        this.submitted=true;

        if(this.forme.invalid){
          event.target.checked = false
          return;
        }
        this.ajoutSelectionRole(this.idRole);
        this.datas.push({id: this.idRole, event: event})
      }
      console.log("resultat :", this.datas);
      
    } else {
      let i = 0;
      let res = false;
      while (res == false ) {
        if (this.datas[i].id == this.idRole) {

            this.ELEMENTS_TABLE.splice(this.datas[i].id, 1); // je supprime un seul element du tableau a la position 'i'
            this.datas[i].splice(i, 1);
            res = true;
        }
        i++;
      }
    }
  }

  retirerSelectionRole(index: number) {
    console.log("index du tab :", index);
    
    this.ELEMENTS_TABLE = this.dataSourceRoleResultat.data;
          this.ELEMENTS_TABLE.splice(index, 1); // je supprime un seul element du tableau a la position 'i'
    this.dataSourceRoleResultat.data = this.ELEMENTS_TABLE
  }

  validateElement() {
    this.dataSourceRoleResultat.data = this.ELEMENTS_TABLE;
    this.datas.forEach((c) => (c.event.target.checked = false))
    this.ELEMENTS_TABLE = []
    this.datas = []
  }

  annullerElement() {
    this.datas.forEach((c) => (c.event.target.checked = false))
    this.ELEMENTS_TABLE = []
    this.datas = []
  }

  ajoutSelectionRole(idrole: string) {

    this.serviceRole.getRoleById(idrole).subscribe((val) => {
      
      this.ELEMENTS_TABLE = this.dataSourceRoleResultat.data;
      this.ELEMENTS_TABLE.push({
        role: val,
        dateEntree: this.forme.value.dateEntree,
        dateFin: this.forme.value.dateFin
      });
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
    this.submitted = true
    //Todo la validation d'element non conforme passe
    if(this.forme.invalid) return;
    
    let idPersonnel = this.infosPath.snapshot.paramMap.get('idPersonnel');

    if((idPersonnel != null) && idPersonnel!==''){     
      
      this.personnelService.getPersonnelById(idPersonnel).subscribe(x =>
      {
        this.personnel = x;

      });
    }

    
    let personnelTemp : IPersonnel={
      id: uuidv4(),
      nom: this.personnel?.nom,
      prenom:this.personnel?.prenom,
      sexe:this.personnel?.sexe,
      email:this.personnel?.email,
      telephone:this.personnel?.telephone,
      dateNaissance:this.personnel.dateNaissance,
      dateEntree: this.personnel?.dateEntree,
      dateSortie: this.personnel?.dateSortie,
      roles: personnelInput.filteredData
    }

    console.log("final personnel :", personnelTemp);

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

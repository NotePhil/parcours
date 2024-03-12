import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IPatient } from 'src/app/modele/Patient';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { PatientsService } from 'src/app/services/patients/patients.service';

@Component({
  selector: 'app-modal-choix-personne',
  templateUrl: './modal-choix-personne.component.html',
  styleUrls: ['./modal-choix-personne.component.scss']
})
export class ModalChoixPersonneComponent  implements OnInit{

  myControl = new FormControl<string | IPatient>('');
  filteredOptions: IPatient[] | undefined;
  
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicePersonne:PatientsService,
    private donneeExemplairePersonneRatacheeService:DonneesEchangeService
  ) {}
  
  ngOnInit(): void {

    this.getAllPatients().subscribe(valeurs => {
      this.filteredOptions = valeurs
    });

    this.myControl.valueChanges.subscribe(
      value => {
        const name = typeof value === 'string' ? value : value?.nom;
        if(name != undefined && name?.length >0){
          this.servicePersonne.getPatientsByName(name.toLowerCase() as string).subscribe(
            reponse => {
              this.filteredOptions = reponse;
            }
          )
        }
        else{
          this.servicePersonne.getAllPatients().subscribe(
            (reponse) =>{
              this.filteredOptions=reponse
            }
          )
        }

      }
    );
  }
  displayFn(user: IPatient): string {
    return user && user.nom ? user.nom: '';
  }

  private getAllPatients(){
    return this.servicePersonne.getAllPatients();
  }

  public rechercherListingPersonnes(option: IPatient) {
    this.donneeExemplairePersonneRatacheeService.dataExemplairePersonneRatachee = option
    
  }
}

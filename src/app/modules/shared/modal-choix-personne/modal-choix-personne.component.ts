import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IPatient } from 'src/app/modele/Patient';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { ModalCodebarreService } from '../../shared/modal-codebarre/modal-codebarre.service';

@Component({
  selector: 'app-modal-choix-personne',
  templateUrl: './modal-choix-personne.component.html',
  styleUrls: ['./modal-choix-personne.component.scss']
})
export class ModalChoixPersonneComponent  implements OnInit{

  myControl = new FormControl<string | IPatient>('');
  filteredOptions: IPatient[] | undefined;
  personne : IPatient | undefined
  scan_val: any | undefined;
  
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicePersonne:PatientsService,
    private donneeExemplairePersonneRatacheeService:DonneesEchangeService,
    private barService: ModalCodebarreService
  ) {}
  
  ngOnInit(): void {
    this.barService.getCode().subscribe((dt) => {
      this.scan_val = dt;
      this.myControl.setValue(this.scan_val); // Set the initial value in the search bar

      this.handleScanValChange(); // Trigger the search when scan_val changes

      this.myControl.valueChanges.subscribe(() => {
        this.handleScanValChange();
      });

      if (this.scan_val) {
        // If scan_val is set, perform a search to get the corresponding libelle
        this.servicePersonne
          .getPatientsByNameOrId(this.scan_val)
          .subscribe((response) => {
            this.filteredOptions = response;

            // Manually set the selected option in filteredOptions
            const selectedOption = this.filteredOptions.find(
              (option) => option.id === this.scan_val
            );
            if (selectedOption) {
              this.filteredOptions = [selectedOption];
              // this.dataSource.data = [selectedOption]; // Update the dataSource with the selected option
            }
          });
      }
    });

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
    this.personne! = option
    if (this.myControl.value == '' || this.myControl.value == undefined) {
      
    this.scan_val = undefined
    }
  }
  private handleScanValChange() {
    if (this.scan_val) {
      this.servicePersonne
        .getPatientsByNameOrId(this.scan_val)
        .subscribe((response) => {
          this.filteredOptions = response;

          // Manually set the selected option in filteredOptions
          const selectedOption = this.filteredOptions.find(
            (option) => option.id === this.scan_val
          );
          if (selectedOption) {
            this.filteredOptions = [selectedOption];
            // this.dataSource.data = [selectedOption]; // Update the dataSource with the selected option
          }
        });
    }
  }
}

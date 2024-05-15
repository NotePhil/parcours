import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IValidation } from 'src/app/modele/validation';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { ValidationsService } from 'src/app/services/validations/validations.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-modal-role-validation',
  templateUrl: './modal-role-validation.component.html',
  styleUrls: ['./modal-role-validation.component.scss']
})
export class ModalRoleValidationComponent implements OnInit{

  myControl = new FormControl<string | IValidation>('');
  filteredOptions: IValidation[] | undefined;
  validationCourente : IValidation | undefined
  
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceValidation:ValidationsService,
    private donneeRoleValidationService:DonneesEchangeService
  ) {}
  
  ngOnInit(): void {

    this.getAllValidations().subscribe(valeurs => {
      this.filteredOptions = valeurs
    });

    this.validationCourente = this.donneeRoleValidationService.dataRoleValidation
    this.myControl.setValue(this.donneeRoleValidationService.dataRoleValidation)
    
    this.myControl.valueChanges.subscribe(
      value => {
        const name = typeof value === 'string' ? value : value?.libelle;
        if(name != undefined && name?.length >0){
          this.serviceValidation.getValidationByLibelle(name.toLowerCase() as string).subscribe(
            reponse => {
              this.filteredOptions = reponse;
            }
          )
        }
        else{
          this.serviceValidation.getAllValidations().subscribe(
            (reponse) =>{
              this.filteredOptions=reponse
            }
          )
        }
      }
    );
  }

  displayFn(user: IValidation): string {
    return user && user.libelle ? user.libelle: '';
  }

  private getAllValidations(){
    return this.serviceValidation.getAllValidations();
  }

  public rechercherListingRole(option: IValidation){
    this.validationCourente = option
    this.serviceValidation.getValidationById(option.id).subscribe(
        valeurs => {
          this.donneeRoleValidationService.dataRoleValidation = valeurs
        }
    )
  }
  /**
   * Methode permettant de reinitialiser la barre de recherche et le contenu de la variable personne
   */
  reinitialiser(){
    this.myControl.reset()
    this.validationCourente = undefined
    this.donneeRoleValidationService.dataRoleValidation = undefined
  }
}
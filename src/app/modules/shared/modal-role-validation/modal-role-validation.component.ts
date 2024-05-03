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
  
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceRole:ValidationsService,
    private donneeRoleValidationService:DonneesEchangeService
  ) {}
  
  ngOnInit(): void {

    this.getAllValidations().subscribe(valeurs => {
      this.filteredOptions = valeurs
    });

    this.myControl.valueChanges.subscribe(
      value => {
        const name = typeof value === 'string' ? value : value?.libelle;
        if(name != undefined && name?.length >0){
          this.serviceRole.getValidationByLibelle(name.toLowerCase() as string).subscribe(
            reponse => {
              this.filteredOptions = reponse;
            }
          )
        }
        else{
          this.serviceRole.getAllValidations().subscribe(
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
    return this.serviceRole.getAllValidations();
  }

  public rechercherListingRole(option: IValidation){
    this.serviceRole.getValidationById(option.id).subscribe(
        valeurs => {
          let validationRole : IValidation = {
            id: '',
            libelle: 'validation ' + option.libelle,
            code: uuidv4(),
            dateCreation: new Date(),
            etat: false,
            role: {
              id: '',
              titre: '',
              description: '',
              etat: false
            },
            typeVote: '',
            dureeVote: 0
          }
          this.donneeRoleValidationService.dataRoleValidation = validationRole
        }
    )
  }
}
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationsService } from 'src/app/services/validations/validations.service';
import { Observable, EMPTY } from 'rxjs';
import { IValidation } from 'src/app/modele/validation';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-new-validation',
  templateUrl: './new-validation.component.html',
  styleUrls: ['./new-validation.component.scss']
})
export class NewValidationComponent implements OnInit {
  validation : IValidation|undefined;
  forme: FormGroup;
  btnLibelle: string="Ajouter";
  submitted: boolean=false;
  titre:string='';
  initialDateCreation = new FormControl(new Date());
  initialDateModification = new FormControl(new Date());

  constructor(private formBuilder:FormBuilder, private validationservice:ValidationsService, private router:Router, private infosPath:ActivatedRoute, private datePipe: DatePipe) {
    this.forme = this.formBuilder.group({
      code: ['', [Validators.required]],
      libelle: ['', [Validators.required]],
      etat: [true]
    })
  }

  ngOnInit(): void {
    let idValidation = this.infosPath.snapshot.paramMap.get('idValidation');
    if((idValidation != null) && idValidation!==''){
      this.btnLibelle="Modifier";
      this.titre="Modifier validation";
      this.validationservice.getValidationById(idValidation).subscribe(x =>
        {
          this.validation = x;
          this.forme.setValue({
            code: this.validation.code,
            libelle: this.validation.libelle,
            etat: this.validation.etat
          })
      });
    }
    /* this.services$ = this.getAllServices();
    this.titre=this.dataEnteteMenuService.dataEnteteMenu   */
  }

  get f(){
    return this.forme.controls;
  }

  onSubmit(validationInput:any){

    this.submitted=true;
    if(this.forme.invalid) return;

    let validationTemp : IValidation={
      id: uuidv4(),
      code: validationInput.code,
      libelle: validationInput.libelle,
      etat: validationInput.etat,
      dateCreation: new Date
    }

    if(this.validation != undefined){
      validationTemp.id = this.validation.id,
      validationTemp.dateCreation = this.validation.dateCreation
    }
    this.validationservice.ajouterValidation(validationTemp).subscribe(
      object => {
        this.router.navigate(['/list-validations']);
      }
    )
  }
}

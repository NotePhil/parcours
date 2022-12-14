import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,MaxLengthValidator,MinLengthValidator,ReactiveFormsModule, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { PatientsService } from 'src/app/services/patients/patients.service';
import {IPatient} from '../../../modele/Patient';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss']
})
export class NewPatientComponent implements OnInit {
  //patient$:Observable<patientient>=EMPTY;
  patient : IPatient|undefined;
  forme: FormGroup;
  btnLibelle: string="Ajouter";
  titre: string="Ajouter un nouveau Patient";
  submitted: boolean=false;
  //TODO validation du formulaire. particulièrment les mail; les dates
  constructor(private formBuilder:FormBuilder, private patientService:PatientsService,private router:Router, private infosPath:ActivatedRoute) { 
    this.forme =  this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      prenom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      sexe: [''],
      mail: ['', [Validators.required, Validators.email, Validators.pattern(".+@.+\.{1}[a-z]{2,3}")]],
      //todo initialisation du composant à une date 
      dateNaissance: ['1980-01-01', Validators.required],
      telephone: [''],
      adresse: ['']
    })
    
  }

  ngOnInit() {
    let idPatient = this.infosPath.snapshot.paramMap.get('idPatient');
    console.log("idPatient :" + idPatient);
    if((idPatient != null) && idPatient!==''){
      //formatDate : FormatDatePipe; 
      //  formatDate.transform("");
      this.btnLibelle="Modifier";
      this.titre="Patient à Modifier";
      //trouver un autre moyen d'initialiser avec des valeurs
      this.patientService.getPatientById(Number(idPatient)).subscribe(x =>
        {
          this.patient = x; console.log(this.patient);
          this.forme.setValue({
            nom: this.patient.nom,
            prenom: this.patient.prenom,
            sexe: this.patient.sexe,
            mail: this.patient.mail,
            dateNaissance:  this.patient.dateNaissance,
            telephone: this.patient.telephone,
            adresse: this.patient.adresse
          })   
        });
    }
    
  }

  get f(){
    return this.forme.controls;
  }

  onSubmit(patientInput:any){
    this.submitted=true;
    //Todo la validation d'element non conforme passe
    if(this.forme.invalid) return;

    let patientTemp : IPatient={
      id: Number(9),
      nom:patientInput.nom,
      prenom:patientInput.prenom,
      sexe:patientInput.sexe,
      adresse:patientInput.adresse,
      mail:patientInput.mail,
      telephone:patientInput.telephone,
      dateNaissance:patientInput.dateNaissance
    }


    if(this.patient != undefined){
      patientTemp.id = this.patient.id  
    }
    this.patientService.ajouterPatient(patientTemp).subscribe(
      object => {
        this.router.navigate(['/list-patients']);
      },
      error=>{
        console.log(error)
      }
    )
  }

}

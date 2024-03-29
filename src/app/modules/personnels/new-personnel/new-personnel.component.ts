import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IPersonnel } from 'src/app/modele/personnel';
import { PersonnelsService } from 'src/app/services/personnels/personnels.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-new-personnel',
  templateUrl: './new-personnel.component.html',
  styleUrls: ['./new-personnel.component.scss']
})
export class NewPersonnelComponent implements OnInit {

   //personnel$:Observable<personnel>=EMPTY;
   personnel : IPersonnel|undefined;
   forme: FormGroup;
   btnLibelle: string="Ajouter";
   titre: string="Ajouter Personnel";
   submitted: boolean=false;

   constructor(private formBuilder:FormBuilder, private personnelService:PersonnelsService, private router:Router, private infosPath:ActivatedRoute, private datePipe: DatePipe) {
     this.forme =  this.formBuilder.group({
       nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
       prenom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
       sexe: ['', Validators.required],
       email: ['', [Validators.required, Validators.email, Validators.pattern(".+@.+\.{1}[a-z]{2,3}")]],
       //todo initialisation du composant à une date
       dateNaissance: ['1980-01-01', Validators.required],
       dateEntree: ['2023-01-01', Validators.required],
       dateSortie: ['0000-00-00'],
       telephone: ['', Validators.required]
     })
   }

   ngOnInit() {
     let idPersonnel = this.infosPath.snapshot.paramMap.get('idPersonnel');
     console.log("idPersonnel:" + idPersonnel);
     if((idPersonnel != null) && idPersonnel!==''){

       this.btnLibelle="Modifier";
       this.titre="Personnel à Modifier";


       this.personnelService.getPersonnelById(idPersonnel).subscribe(x =>
       {
         this.personnel = x; console.log(this.personnel);
         this.forme.setValue({
           nom: this.personnel?.nom,
           prenom: this.personnel?.prenom,
           sexe: this.personnel?.sexe,
           email: this.personnel?.email,
           dateNaissance: this.datePipe.transform(this.personnel?.dateNaissance,'yyyy-MM-dd'),
           dateEntree: this.datePipe.transform(this.personnel?.dateEntree,'yyyy-MM-dd'),
           dateSortie: this.datePipe.transform(this.personnel?.dateSortie,'yyyy-MM-dd'),
           telephone: this.personnel?.telephone
         })
       });
     }
   }

   get f(){
     return this.forme.controls;
   }

   onSubmit(personnelInput:any){
     this.submitted=true;
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


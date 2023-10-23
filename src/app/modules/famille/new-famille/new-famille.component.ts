import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, MaxLengthValidator,MinLengthValidator,ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EMPTY, Observable, isEmpty } from 'rxjs';
import {v4 as uuidv4} from 'uuid';
import { IFamille } from 'src/app/modele/famille';
import { FamillesService } from 'src/app/services/familles/familles.service';




@Component({
  selector: 'app-new-famille',
  templateUrl: './new-famille.component.html',
  styleUrls: ['./new-famille.component.scss']
})
export class NewFamilleComponent implements OnInit {

  famille : IFamille|undefined;
  forme: FormGroup;
  btnLibelle: string="Ajouter";
  submitted: boolean=false;



  constructor(private formBuilder:FormBuilder, private familleService:FamillesService,private router:Router, private infosPath:ActivatedRoute, ) {
    this.forme =  this.formBuilder.group({
      libelle: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      etat: [true],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    })
  }

  ngOnInit(): void{

    let idFamille = this.infosPath.snapshot.paramMap.get('idFamille');
    if((idFamille != null) && idFamille!==''){

      this.btnLibelle="Modifier";
      this.familleService.getFamilleById(idFamille).subscribe(x =>
        {
          this.famille = x;
          this.forme.setValue({
            libelle: this.famille.libelle,
            etat: this.famille.etat,
            description: this.famille.description
          })
        });
    }

  }

  get f(){
    return this.forme.controls;
  }

  onSubmit(familleInput:any){
    this.submitted=true;
    //Todo la validation d'element non conforme passe
    if(this.forme.invalid) return;

    let familleTemp : IFamille={
      id: uuidv4(),
      libelle: familleInput.libelle,
      etat: familleInput.etat,
      description: familleInput.description
    }

    if(this.famille != undefined){
      familleTemp.id = this.famille.id
    }
    this.familleService.ajouterFamille(familleTemp).subscribe(
      object => {
        this.router.navigate(['/list-familles']);
      }
    )

}
}

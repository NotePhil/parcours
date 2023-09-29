import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IAttributs } from 'src/app/modele/attributs';
import { TypeTicket } from 'src/app/modele/type-ticket';
import { AttributService } from 'src/app/services/attributs/attribut.service';
import {v4 as uuidv4} from 'uuid';


@Component({
  selector: 'app-new-attribut',
  templateUrl: './new-attribut.component.html',
  styleUrls: ['./new-attribut.component.scss']
})
export class NewAttributComponent implements OnInit {
  attribut : IAttributs|undefined;
  forme: FormGroup;
  btnLibelle: string="Ajouter";
  titre: string="Ajouter un nouvel attribut";
  submitted: boolean=false;

  typeInt = TypeTicket.Int;
  typeString = TypeTicket.String;
  typeRadio=  TypeTicket.Radio;
  typeBoolean = TypeTicket.Boolean;
  typeDate = TypeTicket.Date;

  initialDateCreation = new FormControl(new Date());
  initialDateModification = new FormControl(new Date());

  tabError : Map<String,String> = new Map();

  constructor(private formBuilder:FormBuilder, private attributService:AttributService,private router:Router, private infosPath:ActivatedRoute, private datePipe: DatePipe) {
    this.forme = this.formBuilder.group({
      titre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      etat: [true],
      type: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      obligatoire:[true],
      valeursParDefaut:['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    })
  }

  ngOnInit(): void {
    let idAttribut = this.infosPath.snapshot.paramMap.get('idAttribut');
    if((idAttribut != null) && idAttribut!==''){
      this.btnLibelle="Modifier";
      this.titre="service à Modifier";
      this.attributService.getAttributById(idAttribut).subscribe(x =>
        {
          this.attribut = x; console.log(this.attribut);
          this.attribut.id = idAttribut!,
          this.forme.setValue({
            titre: this.attribut.titre,
            description: this.attribut.description,
            etat: this.attribut.etat,
            type: this.attribut.type,
            obligatoire: this.attribut.obligatoire,
            valeursParDefaut:this.attribut.valeursParDefaut
          })
      });
    }
  }

  get f(){
    return this.forme.controls;
  }

  verifierValeurParDefaut(){
    let valtype : any = this.forme.controls["type"].value;
    let valvaleursParDefaut  = this.forme.controls["valeursParDefaut"].value;
    if(valtype == this.typeInt){
      for(let i=0; i<valvaleursParDefaut.length ; i++ ){
        if( isNaN(valvaleursParDefaut)){
         alert('Faire les traitements .......');
        }
      }
    }else if(valtype == this.typeString ){
      if( !isNaN(valvaleursParDefaut)){
         alert('ce sont des lettres ');
       }
    }else if(valtype==this.typeBoolean ){
      if((valvaleursParDefaut)){
       // alert('ce sont des lettres ');
       }
    }else if(valtype==this.typeRadio){
      if((valvaleursParDefaut)){
       // alert('ce sont des lettres ');
       }
    }
  }
  onSubmit(attributInput:any){
    this.verifierValeurParDefaut();
    this.submitted=true;
    if(this.forme.invalid) return;

    let attributTemp : IAttributs={
      id:  uuidv4(),
      titre: attributInput.titre,
      description: attributInput.description,
      etat: attributInput.etat,
      type: attributInput.type,
      obligatoire: attributInput.obligatoire,
      valeursParDefaut: attributInput.valeursParDefaut
    }
    if(this.attribut != undefined){
      attributTemp.id = this.attribut.id
    }

    this.attributService.ajouterAttribut(attributTemp).subscribe(
      object => {
        this.router.navigate(['/list-attributs']);
      },
     error =>{
        console.log(error)
      }
    )
  }
}

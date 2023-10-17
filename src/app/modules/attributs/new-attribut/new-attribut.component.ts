import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { IAttributs } from 'src/app/modele/attributs';
import { IRessource } from 'src/app/modele/ressource';
import { TypeTicket } from 'src/app/modele/type-ticket';
import { AttributService } from 'src/app/services/attributs/attribut.service';
import { RessourcesService } from 'src/app/services/ressources/ressources.service';
import {v4 as uuidv4} from 'uuid';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';



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

  tabError : Map<String,String> = new Map();
  valeursParDefaut: any;

  ressource$:Observable<IRessource[]>=EMPTY;

  constructor(private formBuilder:FormBuilder,private ressourceService:RessourcesService, private attributService:AttributService,private router:Router, private infosPath:ActivatedRoute, private datePipe: DatePipe) {
    this.forme = this.formBuilder.group({
      titre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      etat: [true],
      type: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      obligatoire: [true],
      valeursParDefaut:['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      ressource: [''],
    })
  }

  ngOnInit(): void {
    this.ressource$ = this.getAllRessources();

    let idAttribut = this.infosPath.snapshot.paramMap.get('idAttribut');
    if((idAttribut != null) && idAttribut!==''){
      this.btnLibelle="Modifier";
      this.titre="service à Modifier";
      this.attributService.getAttributById(idAttribut).subscribe(x =>
        {
          this.attribut = x;
          this.attribut.id = idAttribut!,
          this.forme.setValue({
            titre: this.attribut.titre,
            description: this.attribut.description,
            etat: this.attribut.etat,
            type: this.attribut.type,
            valeursParDefaut:this.attribut.valeursParDefaut,
            obligatoire:this.attribut.obligatoire,
            ressource:this.attribut.ressource
          })
      });
    }
  }

  private getAllRessources(){
    return this.ressourceService.getAllRessources();
  }

  get f(){
    return this.forme.controls;
  }

  verifierValeurParDefaut(){
    let valtype : string = this.forme.controls["type"].value;
    let valvaleursParDefaut = this.forme.controls["valeursParDefaut"].value;

    if(valtype == this.typeInt){
        if( isNaN(valvaleursParDefaut)){
         alert("la valeur de type number n'est un nombre ");
         return false;
        }

      }else if(valtype==this.typeBoolean || valtype==this.typeRadio){
        let val : string = this.forme.controls["valeursParDefaut"].value;

        if(val ==null || val.length ==0){
            alert ('Au moins une valeurs doit être saisie pour ce type');
            return false;
        }
        let tabVal : string[] = val.split(";");
        if(tabVal.length==1 && tabVal[0].trim().length!=0)
        {
          if(valtype==this.typeBoolean)
            return true;
          else{
            alert ('Au moins une valeurs doit être saisie pour ce type');
            return false;
          }
        }else{
          for(const element of tabVal){
            if(element.trim() == null || element.trim().length == 0){
              return false;
            }
          }
          return true;
        }

      }
      return true;
    }
    onSubmit(attributInput:any){
      ;
      this.submitted=true;
      if(this.forme.invalid && this.verifierValeurParDefaut()) return;

    let attributTemp : IAttributs={
      id:  uuidv4(),
      titre: attributInput.titre,
      description: attributInput.description,
      etat: attributInput.etat,
      type: attributInput.type,
      valeursParDefaut: attributInput.valeursParDefaut,
      obligatoire:attributInput.obligatoire,
      ressource:attributInput.ressource,
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
 compareItem(ressource1: IRessource, ressource2: IRessource) {
    return ressource2 && ressource1 ? ressource2.id === ressource1.id : ressource2 === ressource1;
}
}

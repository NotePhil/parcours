import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEtape } from 'src/app/modele/etape';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { EtapesService } from 'src/app/services/etapes/etapes.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-new-etape',
  templateUrl: './new-etape.component.html',
  styleUrls: ['./new-etape.component.scss']
})
export class NewEtapeComponent implements OnInit {
  etape : IEtape |undefined;
  forme: FormGroup;
  btnLibelle: string="Ajouter";
  submitted: boolean=false;
  titre:string=''
  constructor(private formBuilder:FormBuilder, private etapeService:EtapesService,private dataEnteteMenuService:DonneesEchangeService,private router:Router, private infosPath:ActivatedRoute, private datePipe: DatePipe) {
    this.forme = this.formBuilder.group({
      libelle: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      etat: [true],
    })
  }

  ngOnInit() {
    let idEtape= this.infosPath.snapshot.paramMap.get('idEtape');
    if((idEtape != null) && idEtape!==''){

      this.btnLibelle="Modifier";


      //trouver un autre moyen d'initialiser avec des valeurs
      this.etapeService.getEtapeById(idEtape).subscribe(x =>
      {
        this.etape = x;
        this.forme.setValue({
          libelle: this.etape.libelle,
          etat:this.etape. etat,
        })
      });
    }
    this.titre=this.dataEnteteMenuService.dataEnteteMenu
  }


  get f(){
    return this.forme.controls;
  }

  onSubmit(etapeInput:any){
    this.submitted=true;
    //Todo la validation d'element non conforme passe
    if(this.forme.invalid) return;

    let etapeTemp : IEtape={
      id: uuidv4(),
      libelle:etapeInput.libelle,
      etat:etapeInput.etat,
    }

    if(this.etape != undefined){
      etapeTemp.id = this.etape.id
    }
    this.etapeService.ajouterEtape(etapeTemp).subscribe(
      object => {
        this.router.navigate(['/list-etapes']);
      }
    )
  }

}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { IEtape } from 'src/app/modele/etape';
import { IParours } from 'src/app/modele/parours';
import { IService } from 'src/app/modele/service';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { EtapesService } from 'src/app/services/etapes/etapes.service';
import { ParoursService } from 'src/app/services/parours/parours.service';
import { ServicesService } from 'src/app/services/services/services.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-new-parours',
  templateUrl: './new-parours.component.html',
  styleUrls: ['./new-parours.component.scss']
})
export class NewParoursComponent implements OnInit {
  parours : IParours|undefined;
  forme: FormGroup;
  btnLibelle: string="Ajouter";
  submitted: boolean=false;
  etapes$: Observable<IEtape[]>=EMPTY;
  idService: string = ""
  service : IService | undefined
  titre:string='';

  constructor(private formBuilder:FormBuilder,private dataEnteteMenuService:DonneesEchangeService, private paroursService:ParoursService,private router:Router, private infosPath:ActivatedRoute, private datePipe: DatePipe, private ServiceEtape:EtapesService) {
    this.forme = this.formBuilder.group({
      libelle: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      etape: ['', Validators.required]
      
    })
   }

   ngOnInit(): void {
    let idParours = this.infosPath.snapshot.paramMap.get('idParours');
    if((idParours != null) && idParours!==''){
      this.btnLibelle="Modifier";
      this.titre="service à Modifier";
      this.paroursService.getParoursById(idParours).subscribe(x =>
        {
          this.parours= x;
          this.forme.setValue({
            libelle: this.parours.libelle,
            etape: this.parours.etape
          })
      });
    }
    this.etapes$ = this.getAllEtapes();
    this.titre=this.dataEnteteMenuService.dataEnteteMenu
  }


  get f(){
    return this.forme.controls;
  }

  onSubmit(paroursInput:any){

    this.submitted=true;
    if(this.forme.invalid) return;

    let paroursTemp : IParours={
      id: uuidv4(),
      libelle: paroursInput.libelle,
      etape: paroursInput.etape
    }

    if(this.parours != undefined){
      paroursTemp.id = this.parours.id
    }
    this.paroursService.ajouterParours(paroursTemp).subscribe(
      object => {
        this.router.navigate(['/list-parours']);
      }
    )
  }
  private getAllEtapes(){
    return this.ServiceEtape.getAllEtapes();
  }
  compareItem(etape1: IEtape, etape2: IEtape) {
    return etape2 && etape1 ? etape2.id === etape1.id : etape2 === etape1;
  }

}

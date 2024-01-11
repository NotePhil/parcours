import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray,Validators } from '@angular/forms';
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

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-new-parours',
  templateUrl: './new-parours.component.html',
  styleUrls: ['./new-parours.component.scss']
})
export class NewParoursComponent implements OnInit {
  parours : IParours = {
    id:'',
    libelle:'',
    //dateCreation?:Date,
    etape:[]
  };
  //parours : IParours|undefined;
  forme: FormGroup;
  btnLibelle: string="Ajouter";
  submitted: boolean=false;
  etape$: Observable<IEtape[]>=EMPTY;
  idService: string = ""
  //service : IService | undefined
  serviceDeEtape!: IService;
  titre:string='';

  constructor(private formBuilder:FormBuilder,private dataEnteteMenuService:DonneesEchangeService, private serviceParours:ParoursService,private router:Router, private infosPath:ActivatedRoute, private datePipe: DatePipe, private serviceEtape:EtapesService) {
    this.forme = this.formBuilder.group({
      libelle: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      //etape: ['', Validators.required]
      _etape :  new FormControl<string | IEtape[]>(''),

    })
   }

   ngOnInit(): void {
    this.etape$ = this.getAllEtapes();
    let idParours = this.infosPath.snapshot.paramMap.get('idParours');
    if((idParours != null) && idParours!==''){
      this.btnLibelle="Modifier";
      this.titre="service à Modifier";
      this.serviceParours.getParoursById(idParours).subscribe(x =>
        {
          this.parours= x;
          this.forme.setValue({
            libelle: this.parours.libelle,
            //etape: this.parours.etape
            _etape: this.parours.etape,
          })
          this.forme.controls["_etape"].setValue(this.parours.etape);
      });
    }

    this.titre=this.dataEnteteMenuService.dataEnteteMenu
  }


  get f(){
    return this.forme.controls;
  }

  onSubmit(paroursInput:any){

    this.submitted=true;
    if(this.forme.invalid|| paroursInput._etape.length<1) return;

    let paroursTemp : IParours={
      id: uuidv4(),
      libelle: paroursInput.libelle,
      etape: paroursInput._etape
    }

    if(this.parours.id != ""){
      paroursTemp.id = this.parours.id
    }
    this.serviceParours.ajouterParours(paroursTemp).subscribe(
      object => {
        this.router.navigate(['/list-parours']);
      }
    )
  }

  private getAllEtapes(){
    return this.serviceEtape.getAllEtapes();
  }
  compareItem(etape1: IEtape, etape2: IEtape) {
    return etape2 && etape1 ? etape2.id === etape1.id : etape2 === etape1;
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { IRessource } from 'src/app/modele/ressource';
import { RessourcesService } from 'src/app/services/ressources/ressources.service';
import {v4 as uuidv4} from 'uuid';
import { EMPTY, Observable } from 'rxjs';
import { IFamille } from 'src/app/modele/famille';
import { FamillesService } from 'src/app/services/familles/familles.service';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { TypeUnite } from 'src/app/modele/type-unite';

@Component({
  selector: 'app-new-ressource',
  templateUrl: './new-ressource.component.html',
  styleUrls: ['./new-ressource.component.scss']
})
export class NewRessourceComponent implements OnInit {
  ressource : IRessource|undefined;
  forme: FormGroup;
  btnLibelle: string="Ajouter";
  submitted: boolean=false;
  unites : String[] = [];
  IdRessource:string= ""
  filteredOptions: IFamille[] | undefined;
  titre:string=''
  constructor(private formBuilder:FormBuilder,private familleService:FamillesService,private dataEnteteMenuService:DonneesEchangeService,private ressourceService:RessourcesService,private serviceRessource:RessourcesService,private serviceFamille:FamillesService,private router:Router, private infosPath:ActivatedRoute, private datePipe: DatePipe) {
    this.forme = this.formBuilder.group({
      libelle: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      etat: [true],
      quantite: [''],
      unite: [''],
      prix: [''],
      famille: new FormControl<string | IFamille>(''),
      caracteristique:['']
    })
  };

  ngOnInit(): void {
    this.forme.controls["famille"].valueChanges.subscribe(
      value => {
        const libelle = typeof value === 'string' ? value : value?.libelle;
        if(libelle != undefined && libelle?.length >0){
          this.serviceFamille.getFamillesByLibelle(libelle.toLowerCase() as string).subscribe(
            reponse => {
              this.filteredOptions = reponse;
            }
          )
        }
        else{
          this.filteredOptions = [];
        }

      }
    );
    let idRessource = this.infosPath.snapshot.paramMap.get('idRessource');
    if((idRessource != null) && idRessource!==''){
      this.btnLibelle="Modifier";
      this.ressourceService.getRessourceById(idRessource).subscribe(x =>
        {
          this.ressource = x; console.log(this.ressource);
          this.ressource.id = idRessource!,
          this.forme.setValue({
            libelle: this.ressource.libelle,
            etat: this.ressource.etat,
            quantite: this.ressource.quantite,
            unite: this.ressource.unite,
            prix: this.ressource.prix,
            famille: this.ressource.famille,
            caracteristique:this.ressource.caracteristique,
          })
      });
    }
    this.familleService.getTypeUnite().subscribe(u=>{ this.unites = u.type});
    this.titre=this.dataEnteteMenuService.dataEnteteMenu
  }
  get f(){
    return this.forme.controls;
  }

  onSubmit(ressourceInput:any){
    this.submitted=true;
    if(this.forme.invalid) return;
    let ressourceTemp : IRessource={
      id: uuidv4(),
      libelle: ressourceInput.libelle,
      etat: ressourceInput.etat,
      quantite: ressourceInput.quantite,
      unite: ressourceInput.unite,
      prix: ressourceInput.prix,
      famille:ressourceInput.famille,
      caracteristique:ressourceInput.caracteristique,
    }

    if(this.ressource != undefined){
      ressourceTemp.id = this.ressource.id
    }

    this.ressourceService.ajouterRessource(ressourceTemp).subscribe(
      object => {
        this.router.navigate(['list-ressources']);
      }
    )
  }

  displayFn(famille: IFamille): string {
    return famille && famille.libelle ? famille.libelle : '';
  }
  private getAllRessources(){
    return this.serviceRessource.getAllRessources();
  }
  compareItem(unite1: IRessource, unite2: IRessource) {
    return unite2 && unite1 ? unite2.id === unite1.id : unite2 === unite1;
  }

}


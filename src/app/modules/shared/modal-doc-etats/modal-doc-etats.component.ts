import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IEtats } from 'src/app/modele/etats';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { EtatService } from 'src/app/services/etats/etats.service';

@Component({
  selector: 'app-modal-doc-etats',
  templateUrl: './modal-doc-etats.component.html',
  styleUrls: ['./modal-doc-etats.component.scss']
})
export class ModalDocEtatsComponent {
  etatControl = new FormControl<string | IEtats>('');
  filteredOptions: IEtats[] | undefined;
  constructor(
    private serviceEtat: EtatService,
    private _liveAnnouncer: LiveAnnouncer,
    private donneeExemplaireDocService:DonneesEchangeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.serviceEtat.getAllEtats().subscribe(
      (resultat) =>{
        this.filteredOptions = resultat
      }
    )
    this.etatControl.valueChanges.subscribe((value) => {
      const libelle = typeof value === 'string' ? value : value?.libelle;
      if (libelle != undefined && libelle?.length > 0) {
        this.serviceEtat
          .getEtatByLibelle(libelle.toLowerCase() as string)
          .subscribe((reponse) => {
            this.filteredOptions = reponse;
          });
      } else {
        this.filteredOptions = [];
        this.serviceEtat.getAllEtats().subscribe(
          (resultat) =>{
            this.filteredOptions = resultat
          }
        )
      }
    });
  }

  public rechercherListingEtat(option: IEtats) {
    this.serviceEtat
      .getEtatByLibelle(option.libelle.toLowerCase())
      .subscribe((valeurs) => {
        
      });
  }

  displayFn(preco: IEtats): string {
    return preco && preco.libelle ? preco.libelle : '';
  }

  private getAllEtats() {
    return this.serviceEtat.getAllEtats();
  }
}

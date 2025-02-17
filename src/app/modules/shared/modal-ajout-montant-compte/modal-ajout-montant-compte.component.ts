import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { IComptes } from 'src/app/modele/comptes';
import { ComptesService } from 'src/app/services/comptes/comptes.service';
import { PatientsService } from 'src/app/services/patients/patients.service';

@Component({
  selector: 'app-modal-ajout-montant-compte',
  templateUrl: './modal-ajout-montant-compte.component.html',
  styleUrls: ['./modal-ajout-montant-compte.component.scss']
})
export class ModalAjoutMontantCompteComponent {
  forme: FormGroup;
  btnLibelle: string = 'Ajouter';
  //titre: string="Ajouter attribut";
  submitted: boolean = false;
  titre: string = '';
  compte: IComptes | undefined;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialogRef: DialogRef,
    private formBuilder: FormBuilder,
    private compteService: ComptesService,
    private _liveAnnouncer: LiveAnnouncer,
    private userService: PatientsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.forme = this.formBuilder.group({
      montant: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.compte = this.data.element;
    console.log('compte user:', this.compte);

    /* this.compteService.getCompteById(this.compte!.id).subscribe((res) => {
      if (res) {
        this.forme.setValue({
          personnel: res.beneficiaire
        })
      }
    }) */
  }

  get f() {
    return this.forme.controls;
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, ''); // Supprime les caractères non numériques
  }

  onSubmit(selectItem: any) {
    this.submitted = true;

    if(this.forme.invalid) return;

    this.compteService.getCompteById(this.compte!.id).subscribe((res) => {

        let compte: IComptes = {
          id: res.id,
          libelle: res.libelle,
          solde: res.solde+selectItem.montant,
          dateCreation: res.dateCreation,
          montantDecouvertMax: res.montantDecouvertMax,
          beneficiaire: res.beneficiaire
        }
        
        this.compteService.ajouterCompte(compte).subscribe((obj) => {
          console.log("new solde :", compte);
        }); 
    })
    this.dialogRef.close();
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

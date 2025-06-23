import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { DetailsJson, ICaisses } from 'src/app/modele/caisses';
import { CaissesService } from 'src/app/services/caisses/caisses.service';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { MouvementCaisseService } from 'src/app/services/mouvement-caisse/mouvement-caisse.service';

@Component({
  selector: 'app-modal-billeterie',
  templateUrl: './modal-billeterie.component.html',
  styleUrls: ['./modal-billeterie.component.scss']
})
export class ModalBilleterieComponent implements OnInit {
  totalEnCours = 0;
  totalGeneral = 0;
  montantAVerser = 0;
  caisse: ICaisses | undefined;
  submitted: boolean = false;
  formePaiement: FormGroup;
  btnLibelle: string = 'Ajouter';

  constructor(
    private router: Router,
    private caisseServices: CaissesService,
    private dialogRef: MatDialogRef<ModalBilleterieComponent>,
    private formBuilder: FormBuilder,
    private donneeEchangeService: DonneesEchangeService,
    private infosPath: ActivatedRoute,
    private datePipe: DatePipe,
    private mvtCaisseService: MouvementCaisseService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formePaiement = this.formBuilder.group({
      // enregistrer la billeterie en cas de cash comme moyen de paiement
      x1: [0],
      x2: [0],
      x5: [0],
      x10: [0],
      x25: [0],
      x50: [0],
      x100: [0],
      x500: [0],
      x500B: [0],
      x1000: [0],
      x2000: [0],
      x5000: [0],
      x10000: [0],
      rendu10000: [0],
      rendu5000: [0],
      rendu2000: [0],
      rendu1000: [0],
      rendu500: [0],
      rendu500B: [0],
      rendu100: [0],
      rendu50: [0],
      rendu25: [0],
      rendu10: [0],
      rendu5: [0],
      rendu2: [0],
      rendu1: [0],
    });
    this.formePaiement.valueChanges.subscribe(values => {
      this.calculateTotals();
    });
  }

  ngOnInit(): void {
    console.log("donnee de la modal:", this.data.monaies);

    this.caisseServices.getCaissesByType('cash').subscribe((caisses) => {
      this.caisse = caisses; // Assuming you want the first cash caisse
      console.log("caisse:", this.caisse);
      this.totalEnCours = (this.caisse?.detailsJson?.x10000 || 0) * 10000 +
        (this.caisse?.detailsJson?.x5000 || 0) * 5000 +
        (this.caisse?.detailsJson?.x2000 || 0) * 2000 +
        (this.caisse?.detailsJson?.x1000 || 0) * 1000 +
        (this.caisse?.detailsJson?.x500 || 0) * 500 +
        (this.caisse?.detailsJson?.x500B || 0) * 500 +
        (this.caisse?.detailsJson?.x100 || 0) * 100 +
        (this.caisse?.detailsJson?.x50 || 0) * 50 +
        (this.caisse?.detailsJson?.x25 || 0) * 25 +
        (this.caisse?.detailsJson?.x10 || 0) * 10 +
        (this.caisse?.detailsJson?.x5 || 0) * 5 +
        (this.caisse?.detailsJson?.x2 || 0) * 2 +
        (this.caisse?.detailsJson?.x1 || 0) * 1
    });

    if (this.data.monaies) {
      this.formePaiement.setValue({
        x1: this.data.monaies.x1,
        x2: this.data.monaies.x2,
        x5: this.data.monaies.x5,
        x10: this.data.monaies.x10,
        x25: this.data.monaies.x25,
        x50: this.data.monaies.x50,
        x100: this.data.monaies.x100,
        x500: this.data.monaies.x500,
        x500B: this.data.monaies.x500B,
        x1000: this.data.monaies.x1000,
        x2000: this.data.monaies.x2000,
        x5000: this.data.monaies.x5000,
        x10000: this.data.monaies.x10000
      });
    }
  }

  get f() {
    return this.formePaiement.controls;
  }

  calculateResteAverser() {
    const values = this.formePaiement.value;
    // Calcul du total reçu
    const totalRecu =
      (values.x10000 || 0) * 10000 +
      (values.x5000 || 0) * 5000 +
      (values.x2000 || 0) * 2000 +
      (values.x1000 || 0) * 1000 +
      (values.x500 || 0) * 500 +
      (values.x500B || 0) * 500 +
      (values.x100 || 0) * 100 +
      (values.x50 || 0) * 50 +
      (values.x25 || 0) * 25 +
      (values.x10 || 0) * 10 +
      (values.x5 || 0) * 5 +
      (values.x2 || 0) * 2 +
      (values.x1 || 0) * 1;

      // Calcul du total rendu
    const totalRendu =
      (values.rendu10000 || 0) * 10000 +
      (values.rendu5000 || 0) * 5000 +
      (values.rendu2000 || 0) * 2000 +
      (values.rendu1000 || 0) * 1000 +
      (values.rendu500 || 0) * 500 +
      (values.rendu500B || 0) * 500 +
      (values.rendu100 || 0) * 100 +
      (values.rendu50 || 0) * 50 +
      (values.rendu25 || 0) * 25 +
      (values.rendu10 || 0) * 10 +
      (values.rendu5 || 0) * 5 +
      (values.rendu2 || 0) * 2 +
      (values.rendu1 || 0) * 1;

    // Calcul du reste à verser
     return this.montantAVerser = this.data.sommes - totalRecu + totalRendu;
  }

  calculateTotals() {
    const values = this.formePaiement.value;
    // Calcul du total reçu
    const totalRecu =
      (values.x10000 || 0) * 10000 +
      (values.x5000 || 0) * 5000 +
      (values.x2000 || 0) * 2000 +
      (values.x1000 || 0) * 1000 +
      (values.x500 || 0) * 500 +
      (values.x500B || 0) * 500 +
      (values.x100 || 0) * 100 +
      (values.x50 || 0) * 50 +
      (values.x25 || 0) * 25 +
      (values.x10 || 0) * 10 +
      (values.x5 || 0) * 5 +
      (values.x2 || 0) * 2 +
      (values.x1 || 0) * 1

    // Calcul du total rendu
    const totalRendu =
      (values.rendu10000 || 0) * 10000 +
      (values.rendu5000 || 0) * 5000 +
      (values.rendu2000 || 0) * 2000 +
      (values.rendu1000 || 0) * 1000 +
      (values.rendu500 || 0) * 500 +
      (values.rendu500B || 0) * 500 +
      (values.rendu100 || 0) * 100 +
      (values.rendu50 || 0) * 50 +
      (values.rendu25 || 0) * 25 +
      (values.rendu10 || 0) * 10 +
      (values.rendu5 || 0) * 5 +
      (values.rendu2 || 0) * 2 +
      (values.rendu1 || 0) * 1

    // Calcul du total général
    this.totalGeneral = this.totalEnCours + totalRecu - totalRendu;
  }

  formatNumber(value: number): string {
    return value.toLocaleString('fr-FR');
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = inputElement.value.replace(/[^0-9]/g, ''); // Supprime les caractères non numériques
  }

  onSubmit() {
    this.submitted = true;

    if (this.formePaiement.invalid) return;

    let detailjson: DetailsJson = {
      x10000: (this.caisse?.detailsJson?.x10000 || 0) + (this.formePaiement.value.x10000 || 0) - (this.formePaiement.value.rendu10000 || 0),
      x5000: (this.caisse?.detailsJson?.x5000 || 0) + (this.formePaiement.value.x5000 || 0) - (this.formePaiement.value.rendu5000 || 0),
      x2000: (this.caisse?.detailsJson?.x2000 || 0) + (this.formePaiement.value.x2000 || 0) - (this.formePaiement.value.rendu2000 || 0),
      x1000: (this.caisse?.detailsJson?.x1000 || 0) + (this.formePaiement.value.x1000 || 0) - (this.formePaiement.value.rendu1000 || 0),
      x500: (this.caisse?.detailsJson?.x500 || 0) + (this.formePaiement.value.x500 || 0) - (this.formePaiement.value.rendu500 || 0),
      x500B: (this.caisse?.detailsJson?.x500B || 0) + (this.formePaiement.value.x500B || 0) - (this.formePaiement.value.rendu500B || 0),
      x100: (this.caisse?.detailsJson?.x100 || 0) + (this.formePaiement.value.x100 || 0) - (this.formePaiement.value.rendu100 || 0),
      x50: (this.caisse?.detailsJson?.x50 || 0) + (this.formePaiement.value.x50 || 0) - (this.formePaiement.value.rendu50 || 0),
      x25: (this.caisse?.detailsJson?.x25 || 0) + (this.formePaiement.value.x25 || 0) - (this.formePaiement.value.rendu25 || 0),
      x10: (this.caisse?.detailsJson?.x10 || 0) + (this.formePaiement.value.x10 || 0) - (this.formePaiement.value.rendu10 || 0),
      x5: (this.caisse?.detailsJson?.x5 || 0) + (this.formePaiement.value.x5 || 0) - (this.formePaiement.value.rendu5 || 0),
      x2: (this.caisse?.detailsJson?.x2 || 0) + (this.formePaiement.value.x2 || 0) - (this.formePaiement.value.rendu2 || 0),
      x1: (this.caisse?.detailsJson?.x1 || 0) + (this.formePaiement.value.x1 || 0) - (this.formePaiement.value.rendu1 || 0),
    };

    let caisseTemp: ICaisses = {
      id: uuidv4(),
      libelle: this.caisse!.libelle,
      etat: this.caisse!.etat,
      solde: this.totalGeneral,
      type: this.caisse!.type,
      detailsJson: detailjson,
    };

    if (this.caisse != undefined) {
      caisseTemp.id = this.caisse.id;
    }

    this.caisseServices.ajouterCaisse(caisseTemp).subscribe((object) => {
    });

    const data = this.formePaiement.value;

    console.log("value paiement :", this.formePaiement.value);

    this.dialogRef.close({ result: 'Success', data: data });
  }
}

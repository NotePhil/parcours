import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DetailsJson, ICaisses } from 'src/app/modele/caisses';
import { CaissesService } from 'src/app/services/caisses/caisses.service';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';

@Component({
  selector: 'app-new-caisse',
  templateUrl: './new-caisse.component.html',
  styleUrls: ['./new-caisse.component.scss']
})
export class NewCaisseComponent implements OnInit {
  caisse: ICaisses | undefined;
  forme: FormGroup;
  titre: string = '';
  selectedOptions!: string;
  caisses: string[] = ['cash', 'orange money', 'mtn money', 'chèque'];
  btnLibelle: string = 'Ajouter';
  //titre: string="Ajouter Caisse";
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private dataEnteteMenuService: DonneesEchangeService,
    private caisseService: CaissesService,
    private router: Router,
    private infosPath: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.forme = this.formBuilder.group({
      libelle: [
        '',
        [
          Validators.required
        ],
      ],
      etat: [true],
      solde: [''],
      x1: [''],
      x2: [''],
      x5: [''],
      x10: [''],
      x25: [''],
      x50: [''],
      x100: [''],
      x500: [''],
      x500B: [''],
      x1000: [''],
      x2000: [''],
      x5000: [''],
      x10000: [''],
    });
  }

  ngOnInit(): void {
    let idCaisse = this.infosPath.snapshot.paramMap.get('idCaisse');
    if (idCaisse != null && idCaisse !== '') {
      this.btnLibelle = 'Modifier';
      this.titre = 'Caisse à Modifier';
      this.caisseService.getCaisseById(idCaisse).subscribe((x) => {
        this.caisse = x;
        // Remplissage du formulaire avec les données de la caisse
        this.forme.setValue({
          libelle: this.caisse.libelle,
          solde: this.caisse.solde,
          etat: this.caisse.etat,
          // Initialisation des champs de billets avec les valeurs de detailsJson ou des valeurs par défaut
          x1: this.caisse.detailsJson?.x1 || '',
          x2: this.caisse.detailsJson?.x2 || '',
          x5: this.caisse.detailsJson?.x5 || '',
          x10: this.caisse.detailsJson?.x10 || '',
          x25: this.caisse.detailsJson?.x25 || '',
          x50: this.caisse.detailsJson?.x50 || '',
          x100: this.caisse.detailsJson?.x100 || '',
          x500: this.caisse.detailsJson?.x500 || '',
          x500B: this.caisse.detailsJson?.x500B || '',
          x1000: this.caisse.detailsJson?.x1000 || '',
          x2000: this.caisse.detailsJson?.x2000 || '',
          x5000: this.caisse.detailsJson?.x5000 || '',
          x10000: this.caisse.detailsJson?.x10000 || '',
        });
        this.selectedOptions = this.caisse.type;
      });
    }
    this.titre = this.dataEnteteMenuService.dataEnteteMenu;
  }

  get f() {
    return this.forme.controls;
  }

  calculateTotals() {
    const values = this.forme.value;
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

    // Calcul du total général
    this.forme.controls['solde'].setValue(totalRecu);
  }

  verify() {
    if (this.selectedOptions == "cash") {
      this.calculateTotals();;
    }
  }

  formatNumber(value: number): string {
    return value.toLocaleString('fr-FR');
  }

  return() {
    this.router.navigate(['/parcours/caisses/list-caisses']);
  }

  onSubmit(caisseInput: ICaisses) {
    this.submitted = true;
    if (this.forme.invalid || (this.selectedOptions == undefined || this.selectedOptions == '')) return;

    let billets: DetailsJson;
    if (this.selectedOptions == 'cash') {
      const values = this.forme.value;
      billets = {
        x1: values.x1,
        x2: values.x2,
        x5: values.x5,
        x10: values.x10,
        x25: values.x25,
        x50: values.x50,
        x100: values.x100,
        x500: values.x500,
        x500B: values.x500B,
        x1000: values.x1000,
        x2000: values.x2000,
        x5000: values.x5000,
        x10000: values.x10000
      }
    }

    let caisseTemp: ICaisses = {
      libelle: caisseInput.libelle,
      solde: caisseInput.solde,
      etat: caisseInput.etat,
      type: this.selectedOptions,
      detailsJson: billets!,
      version: this.caisse?.version
    };

    if (this.caisse != undefined) {
      caisseTemp.id = this.caisse.id;
    }

    console.log('valeur final :', caisseTemp);

    this.caisseService.ajouterCaisse(caisseTemp).subscribe((object) => {
      this.router.navigate(['parcours/caisses/list-caisses']);
    });
  }
}
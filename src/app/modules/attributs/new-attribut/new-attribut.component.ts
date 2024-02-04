import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IAttributs } from 'src/app/modele/attributs';
import { AttributService } from 'src/app/services/attributs/attribut.service';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-new-attribut',
  templateUrl: './new-attribut.component.html',
  styleUrls: ['./new-attribut.component.scss'],
})
export class NewAttributComponent implements OnInit {
  attribut: IAttributs | undefined;
  forme: FormGroup;
  btnLibelle: string = 'Ajouter';
  //titre: string="Ajouter attribut";
  submitted: boolean = false;
  titre: string = '';
  typeAttribut: String[] = [];
  // La propriété pour stocker la valeur de l'input
  inputValeur: string = '';
  errorNb: boolean = false;
  textError: string = '';
  dateResultat: Date | null = null;

  /*initialDateCreation = new FormControl(new Date());
  initialDateModification = new FormControl(new Date());*/
  constructor(
    private formBuilder: FormBuilder,
    private dataEnteteMenuService: DonneesEchangeService,
    private attributService: AttributService,
    private router: Router,
    private infosPath: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    this.forme = this.formBuilder.group({
      titre: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      etat: [true],
      obligatoire: [false],
      type: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      valeursParDefaut: [''],
    });
  }

  ngOnInit(): void {
    this.attributService.getTypeAttribut().subscribe((t) => {
      this.typeAttribut = t.type;
    });
    let idAttribut = this.infosPath.snapshot.paramMap.get('idAttribut');
    if (idAttribut != null && idAttribut !== '') {
      this.btnLibelle = 'Modifier';
      this.titre = 'service à Modifier';
      this.attributService.getAttributById(idAttribut).subscribe((x) => 
      {
        this.attribut = x;
          this.forme.setValue({
            titre: this.attribut?.titre,
            description: this.attribut?.description,
            etat: this.attribut?.etat,
            obligatoire: this.attribut?.obligatoire!,
            type: this.attribut?.type,
            valeursParDefaut: this.attribut?.valeursParDefaut,
          });
          this.inputValeur = this.attribut?.valeursParDefaut
      });
    }
    this.titre = this.dataEnteteMenuService.dataEnteteMenu;
  }

  get f() {
    return this.forme.controls;
  }

  // Méthode pour gérer les changements dans l'input
  onInputChange() {
    // Vérifier le type et séparer les valeurs
    //const valeursSeparees: string[] = this.inputValeur.split(';');
    // Remplacez les espaces par des points-virgules
    this.inputValeur = this.inputValeur.replace(/\s+/g, ';');
    this.inputValeur = this.inputValeur.replace(/;+/g, ';');
    this.inputValeur = this.inputValeur.replace(/,/g, '');

    // Faire quelque chose avec les valeurs séparées
    console.log('valeur saisie :', this.inputValeur);

    // Divisez la chaîne saisie en valeurs individuelles
    const valeurs: string[] = this.inputValeur
      .split(';')
      .map((value) => value.trim());
    console.log('valeur separe :', valeurs);

    let faux: number = 0;
    this.errorNb = false;
    // Faites vos comparaisons ici avec les valeurs
    // Par exemple, comparez si la première et la deuxième valeurs sont identiques
    //----------- cas de type Number ---------------//
    if (this.forme.get('type')?.value == 'Number') {
      if (this.inputValeur.endsWith(';')) {
        faux = 0;
        for (let index = 0; index < valeurs.length - 1; index++) {
          // Test si la valeur est un nombre
          if (!isNaN(parseFloat(valeurs[index]))) {
            console.log('La valeur saisie est un nombre.', valeurs[index]);
          } else {
            faux++;
            this.textError = "La valeur par défaut doit être un nombre";
            console.log(
              "La valeur saisie n'est pas un nombre.",
              valeurs[index]
            );
          }
          console.log(' index', index);
        }
        if (faux > 0) {
          this.errorNb = true;
        } else {
          this.errorNb = false;
        }
      }
    }

    //----------- cas de type radio et checkbox ------------//
    if (this.forme.get('type')?.value == 'Radio') {
      if (valeurs.length < 2 || valeurs[1] == "") {
        this.errorNb = true;
        this.textError = "Au moins deux valeurs doivent être saisies pour ce type";
        /* faux = 0;
        for (let index = 0; index < valeurs.length - 1; index++) {
          // Test si la valeur est un nombre
          if (!isNaN(parseFloat(valeurs[index]))) {
            console.log('La valeur saisie est un nombre.', valeurs[index]);
          } else {
            faux++;
            this.textError = "La valeur saisie n'est pas un nombre.";
            console.log(
              "La valeur saisie n'est pas un nombre.",
              valeurs[index]
            );
          }
          console.log(' index', index);
        }
        if (faux > 0) {
          this.errorNb = true;
        } else {
          this.errorNb = false;
        } */
      } else {
        this.errorNb = false;
      }
    }

    if (this.forme.get('type')?.value == 'Checkbox') {
      if (valeurs.length < 1 || valeurs[0] == "") {
        this.errorNb = true;
        this.textError = "Au moins une valeur doit être saisie pour ce type";
      } else {
        this.errorNb = false;
      }
    }

    //----------- cas du type date --------//
    if (this.forme.get('type')?.value == 'Date') {
      if (this.inputValeur.endsWith(';')) {
        faux = 0;
        for (let index = 0; index < valeurs.length - 1; index++) {
          let date = new Date(valeurs[index]);
          // Séparez la chaîne en jour, mois et année
          const [jour, mois, annee] = valeurs[index].split('/').map(Number);

          // Utilisez le constructeur Date avec les valeurs séparées
          this.dateResultat = new Date(annee, mois - 1, jour); // Mois est 0-indexé dans l'objet Date
          if (isNaN(this.dateResultat.getTime())) {
            faux++;
            this.textError = 'Des valeurs de type date sont obligatoires';
            console.log(
              "La valeur saisie n'est pas une date.",
              valeurs[index],
              this.dateResultat
            );
          } else {
            // Si la conversion en date échoue, la validation échoue
            console.log('La valeur saisie est une date.', valeurs[index], this.dateResultat);
          }
        }
        if (faux > 0) {
          this.errorNb = true;
        } else {
          this.errorNb = false;
        }
      }
    }
  }

  onSubmit(attributInput: any) {
    this.submitted = true;
    if (this.forme.invalid) return;

    if ((this.forme.get('type')?.value == 'Radio' || this.forme.get('type')?.value == 'Checkbox') && this.errorNb == true) {
      
    } else {
      let attributTemp: IAttributs = {
        id: uuidv4(),
        titre: attributInput.titre,
        description: attributInput.description,
        etat: attributInput.etat,
        obligatoire: attributInput.obligatoire,
        type: attributInput.type,
        valeursParDefaut: attributInput.valeursParDefaut,
      };
  
      if (this.attribut != undefined) {
        attributTemp.id = this.attribut.id;
      }
  
      console.log("valeur final :", attributTemp);
      
      this.attributService.ajouterAttribut(attributTemp).subscribe((object) => {
        this.router.navigate(['/list-attributs']);
      });
    }

  }
}
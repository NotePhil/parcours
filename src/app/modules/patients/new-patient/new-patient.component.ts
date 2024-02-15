import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  MaxLengthValidator,
  MinLengthValidator,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { IPatient, IPersonneRattachee } from '../../../modele/Patient';
import { v4 as uuidv4 } from 'uuid';
import { MatTableDataSource } from '@angular/material/table';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.scss'],
})
export class NewPatientComponent implements OnInit {
  //patient$:Observable<patientient>=EMPTY;
  patient: IPatient | undefined;
  forme: FormGroup;
  btnLibelle: string = 'Ajouter';
  titre: string = 'Ajouter un nouveau Patient';
  myControl = new FormControl<string | IPatient>('');
  submitted: boolean = false;
  initialDate = new FormControl(new Date());
  qrCodeValue: string = '';

  ELEMENTS_TABLE: IPatient[] = [];
  personnesRatachees: IPersonneRattachee[] = [];

  dataSource = new MatTableDataSource<IPatient>(this.ELEMENTS_TABLE);

  displayFn(patient: IPatient): string {
    return patient && patient.nom
      ? patient.nom
      : patient && patient.toString
      ? patient.toString()
      : '';
  }

  filteredOptions: IPatient[] | undefined;

  public rechercherListingPersonne(option: IPatient) {
    this.servicePatient
      .getPatientsByName(option.nom.toLowerCase())
      .subscribe((valeurs) => {
        this.dataSource.data = valeurs;
      });
  }

  onSelectPersonne(event: MatAutocompleteSelectedEvent): void {
    const selectedPersonne: IPersonneRattachee = event.option.value;

    if (this.personnesRatachees.length < 2) {
      if (this.forme && this.forme.get('myControl')) {
        this.forme.get('myControl')!.setValue('');
      }

      this.personnesRatachees.push(selectedPersonne);

      this.forme.get('myControl')!.setValue('');
    } else {
      alert('Désolé! impossible de ratacher plus de deux patients');
      this.forme.get('myControl')!.setValue('');
    }
  }

  // Function to filter autocomplete options based on already selected personnesRatachees
  filterAutocompleteOptions() {
    if (
      this.filteredOptions &&
      this.filteredOptions.length > 0 &&
      this.personnesRatachees.length > 0 &&
      typeof this.myControl.value === 'string' &&
      this.myControl.value.trim().length > 0
    ) {
      const nom = this.myControl.value.trim().toLowerCase();
      // Filter out already selected personnesRatachees
      this.filteredOptions = this.filteredOptions.filter(
        (option) =>
          !this.personnesRatachees.some(
            (person) => person.id?.toLowerCase() === option.id?.toLowerCase()
          )
      );
    }
  }

  removePersonne(index: number): void {
    this.personnesRatachees.splice(index, 1);
    this.forme.get('myControl')?.setValue('');
  }

  //TODO validation du formulaire. particulièrment les mail; les dates

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientsService,
    private router: Router,
    private infosPath: ActivatedRoute,
    private datePipe: DatePipe,
    private servicePatient: PatientsService
  ) {
    this.forme = this.formBuilder.group({
      nom: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      prenom: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      sexe: [''],
      mail: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('.+@.+.{1}[a-z]{2,3}'),
        ],
      ],
      //todo initialisation du composant à une date
      dateNaissance: ['1980-01-01', Validators.required],
      telephone: [''],
      adresse: [''],
      myControl: [''],
      personnesRatachees: [[]],
    });

    this.myControl.valueChanges.subscribe((value) => {
      const nom = typeof value === 'string' ? value : value?.nom;
      if (nom && nom.length > 0) {
        // Search by name or ID
        this.servicePatient
          .getPatientsByName(nom.toLowerCase())
          .subscribe((reponse) => {
            this.filteredOptions = reponse;
            this.filterAutocompleteOptions();
          });
      } else {
        this.filteredOptions = [];
      }
    });
    this.myControl.registerOnChange(() => {
      console.log('myControl changed:', this.myControl.value);
    });
  }

  ngOnInit() {
    let idPatient = this.infosPath.snapshot.paramMap.get('idPatient');
    if (idPatient != null && idPatient !== '') {
      this.btnLibelle = 'Modifier';
      this.titre = 'Patient à Modifier';

      //trouver un autre moyen d'initialiser avec des valeurs
      this.patientService.getPatientById(idPatient).subscribe((x) => {
        this.patient = x;
        console.log('Personnes Ratachees:', this.patient.personnesRatachees);
        this.personnesRatachees = this.patient.personnesRatachees || [];
        this.forme.setValue({
          nom: this.patient.nom,
          prenom: this.patient.prenom,
          sexe: this.patient.sexe,
          mail: this.patient.mail,
          dateNaissance: this.datePipe.transform(
            this.patient.dateNaissance,
            'yyyy-MM-dd'
          ), // je change le format de la date de naissance pour pouvoir l'afficher dans mon input type date
          telephone: this.patient.telephone,
          adresse: this.patient.adresse,
          personnesRatachees: this.personnesRatachees,
          myControl: [],
        });
      });
    }
  }

  get f() {
    return this.forme.controls;
  }

  onSubmit(patientInput: any) {
    this.submitted = true;
    //Todo la validation d'element non conforme passe
    if (this.forme.invalid) return;

    let patientTemp: IPatient = {
      id: uuidv4(),
      nom: patientInput.nom,
      prenom: patientInput.prenom,
      sexe: patientInput.sexe,
      adresse: patientInput.adresse,
      mail: patientInput.mail,
      telephone: patientInput.telephone,
      dateNaissance: patientInput.dateNaissance,
      qrCodeValue: patientInput.qrCodeValue,
      personnesRatachees: this.personnesRatachees,
    };
    console.log('hello', patientTemp);

    patientTemp.dateNaissance = this.initialDate.value!;

    if (this.patient != undefined) {
      patientTemp.id = this.patient.id;
    }
    this.patientService.ajouterPatient(patientTemp).subscribe((object) => {
      this.router.navigate(['/list-patients']);
    });
  }
}

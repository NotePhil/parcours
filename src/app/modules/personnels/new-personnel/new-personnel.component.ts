import * as JsBarcode from 'jsbarcode';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IPersonnel } from 'src/app/modele/personnel';
import { PersonnelsService } from 'src/app/services/personnels/personnels.service';
import { v4 as uuidv4 } from 'uuid';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-new-personnel',
  templateUrl: './new-personnel.component.html',
  styleUrls: ['./new-personnel.component.scss'],
})
export class NewPersonnelComponent implements OnInit {
  personnel: IPersonnel | undefined;
  forme: FormGroup;
  btnLibelle: string = 'Ajouter';
  titre: string = 'Ajouter Personnel';
  submitted: boolean = false;

  @ViewChild('barcodeCanvas', { static: true }) barcodeCanvas!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private personnelService: PersonnelsService,
    private router: Router,
    private infosPath: ActivatedRoute,
    private datePipe: DatePipe
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
      sexe: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('.+@.+.{1}[a-z]{2,3}'),
        ],
      ],
      dateNaissance: ['1980-01-01', Validators.required],
      dateEntree: ['2023-01-01', Validators.required],
      dateSortie: ['0000-00-00'],
      telephone: ['', Validators.required],
      codeBarre: [''], // Add the codeBarre field to the form
    });
  }

  ngAfterViewInit() {
    let idPersonnel = this.infosPath.snapshot.paramMap.get('idPersonnel');
    console.log('idPersonnel:' + idPersonnel);

    if (!idPersonnel) {
      const generatedUuid = uuidv4();
      const barcodeValue = this.generateAndDisplayBarcode(generatedUuid);
      this.forme.patchValue({ codeBarre: barcodeValue });
    }
  }

  ngOnInit() {
    let idPersonnel = this.infosPath.snapshot.paramMap.get('idPersonnel');
    console.log('idPersonnel:' + idPersonnel);

    if (idPersonnel != null && idPersonnel !== '') {
      this.btnLibelle = 'Modifier';
      this.titre = 'Personnel à Modifier';

      this.personnelService.getPersonnelById(idPersonnel).subscribe((x) => {
        this.personnel = x;
        console.log(this.personnel);
        this.forme.setValue({
          nom: this.personnel?.nom,
          prenom: this.personnel?.prenom,
          sexe: this.personnel?.sexe,
          email: this.personnel?.email,
          dateNaissance: this.datePipe.transform(
            this.personnel?.dateNaissance,
            'yyyy-MM-dd'
          ),
          dateEntree: this.datePipe.transform(
            this.personnel?.dateEntree,
            'yyyy-MM-dd'
          ),
          dateSortie: this.datePipe.transform(
            this.personnel?.dateSortie,
            'yyyy-MM-dd'
          ),
          telephone: this.personnel?.telephone,
          codeBarre: this.personnel?.codeBarre,
        });
      });
    }

    // Generate and display barcode for a new personnel
    if (!idPersonnel) {
      const generatedUuid = uuidv4();
      const barcodeValue = this.generateAndDisplayBarcode(generatedUuid);
      this.forme.patchValue({ codeBarre: barcodeValue });
    }
  }

  generateAndDisplayBarcode(uuid: string): string {
    const barcodeElement = this.barcodeCanvas.nativeElement;
    if (barcodeElement) {
      // Generate barcode with the UUID value
      JsBarcode(barcodeElement, uuid, {
        format: 'CODE128',
        displayValue: true,
      });

      // Return the generated barcode value
      return barcodeElement.getAttribute('data-encoded');
    }

    return ''; // Return an empty string in case of an error
  }

  get f() {
    return this.forme.controls;
  }

  onSubmit(personnelInput: any) {
    this.submitted = true;

    if (this.forme.invalid) return;

    let personnelTemp: IPersonnel = {
      id: uuidv4(),
      nom: personnelInput.nom,
      prenom: personnelInput.prenom,
      sexe: personnelInput.sexe,
      email: personnelInput.email,
      telephone: personnelInput.telephone,
      dateNaissance: personnelInput.dateNaissance,
      dateEntree: personnelInput.dateEntree,
      dateSortie: personnelInput.dateSortie,
      codeBarre: this.generateAndDisplayBarcode(personnelInput.id),
    };

    console.log('the person is', personnelTemp);

    if (this.personnel != undefined) {
      personnelTemp.id = this.personnel.id;
    }

    // Save the barcode data along with user information
    const barcodeData = {
      uuid: personnelTemp.id,
      barcodeValue: personnelTemp.codeBarre,
    };

    this.personnelService.ajouterPersonnel(personnelTemp).subscribe(() => {
      // Save the barcode data to your database or storage
      this.saveBarcodeData(barcodeData);

      this.router.navigate(['/list-personnels']);
    });
  }

  saveBarcodeData(barcodeData: any) {
    // Implement the logic to save the barcode data (uuid and barcode value) to your database or storage
    // You might need to call a service or use HttpClient to perform this operation
    console.log('Saving barcode data:', barcodeData);
  }
}

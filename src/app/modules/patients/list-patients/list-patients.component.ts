import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';
import { IPatient } from 'src/app/modele/Patient';
import { IService } from 'src/app/modele/service';
import { ITicket } from 'src/app/modele/ticket';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { ServicesService } from 'src/app/services/services/services.service';
import { TicketsService } from 'src/app/services/tickets/tickets.service';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NewTicketComponent } from '../../tickets/new-ticket/new-ticket.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalCodebarreService } from '../../shared/modal-codebarre/modal-codebarre.service';
import { ModalCodebarreScanContinueComponent } from '../../shared/modal-codebarre-scan-continue/modal-codebarre-scan-continue.component';
import { PassActionService } from 'src/app/services/actions-view/pass-action.service';
import { IElements } from 'src/app/modele/elements';

export interface User {
  nom: string;
}

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss'],
})
export class ListPatientsComponent implements OnInit, AfterViewInit {
  @ViewChild('barcodeScanner', { static: false })
  barcodeScanner!: ModalCodebarreScanContinueComponent;
  patients$: Observable<IPatient[]> = EMPTY;

  id_personne: string = '0';
  id_service: number = 0;
  nom_patient: string = '';
  libelle_service: string = '';
  currentDate: Date = new Date();
  receivedActions$: Observable<IElements[]> = EMPTY;
  actions: IElements[] | undefined;

  myControl = new FormControl<string | IPatient>('');

  ELEMENTS_TABLE: IPatient[] = [];
  //filteredOptions: IPatient[] | undefined;
  filteredOptions: IPatient[] | undefined;
  displayedColumns: string[] = [
    'nom',
    'prenom',
    'anniversaire',
    'sexe',
    'mail',
    'adresse',
    'telephone',
    'actions',
  ];

  dataSource = new MatTableDataSource<IPatient>(this.ELEMENTS_TABLE);

  formPatient: FormGroup;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private servicePatient: PatientsService,
    private _liveAnnouncer: LiveAnnouncer,
    private formBuilder: FormBuilder,
    private dialogDef: MatDialog,
    private barService: ModalCodebarreService,
    private actionsview: PassActionService
  ) {
    this.formPatient = this.formBuilder.group({
      _listPatient: new FormArray([]),
    });
  }

  scan_val: any | undefined;

  ngOnInit(): void {
    this.receivedActions$ = this.actionsview.getActions();

    this.receivedActions$.subscribe(a => {

      if (a != null) {

        this.actions = a;

      }

    });
    this.barService.getCode().subscribe((dt) => {
      if (!dt) return;
      this.scan_val = dt;
      this.myControl.setValue(this.scan_val); // Définit la valeur initiale dans la barre de recherche
      this.handleScanValChange(); // Déclenche la recherche lorsque scan_val change
    });

    this.getAllPatients().subscribe((valeurs) => {
      this.dataSource.data = valeurs;
      this.filteredOptions = valeurs;
    });

    this.myControl.valueChanges.subscribe((value) => {
      const query = typeof value === 'string' ? value.toLowerCase() : value?.nom?.toLowerCase();
      if (query && query.length > 0) {
        // Search by name, ID or barcode
        this.servicePatient
          .getPatientsByNameOrId(query)
          .subscribe((reponse) => {
            this.filteredOptions = reponse;
          });
      } else {
        this.filteredOptions = [];
      }
    });
  }

  openBarcodeScanner(): void {
    console.log('Attempting to open barcode scanner');
    if (this.barcodeScanner) {
      console.log('barcodeScanner initialized');
      this.barcodeScanner.createMediaStream();
    } else {
      console.log('barcodeScanner is undefined in AfterViewInit');
    }
  }

  setIdPersonne(id_personne: string, nom_patient: string) {
    this.id_personne = id_personne;
    this.nom_patient = nom_patient;
    sessionStorage.setItem('id_patient', this.id_personne.toString());
    sessionStorage.setItem('nom_patient', this.nom_patient);
  }
  setLibelleService(id_service: number, libelleService: string) {
    this.libelle_service = libelleService;
    this.id_service = id_service;

    sessionStorage.setItem('id_service', this.id_service.toString());
    sessionStorage.setItem('libelle_service', this.libelle_service);
  }

  private getAllPatients() {
    return this.servicePatient.getAllPatients();
  }


  public get isButton(): string {
    let res = this.actions!.find((a) => a.bouton == 'true' && a.type == 'global');
    return res ? 'true' : 'false';
  }


  openNewTicketDialog() {
    this.dialogDef.open(NewTicketComponent, {
      height: '50%',
      width: '400px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }

  displayFn(user: any): string {
    if (!user) return '';
    return typeof user === 'string' ? user : (user.nom || '');
  }

  ngAfterViewInit() {
    if (this.barcodeScanner) {
      console.log('barcodeScanner initialized');
    } else {
      console.log('barcodeScanner is undefined');
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private handleScanValChange() {
    if (this.scan_val) {
      this.servicePatient.getPatientsByNameOrId(this.scan_val).subscribe((response) => {
        if (response && response.length > 0) {
          this.dataSource.data = response;
          this.filteredOptions = response;
          const exactMatch = response.find(
            (p) => p.id === this.scan_val || p.qrCodeValue === this.scan_val
          );
          if (exactMatch) {
            this.myControl.setValue(exactMatch);
            this.dataSource.data = [exactMatch];
          }
        } else {
          this.dataSource.data = [];
          this.filteredOptions = [];
        }
      });
    }
  }

  public rechercherListingPersonne(option: IPatient) {
    this.servicePatient.getPatientsByName(option.nom.toLowerCase()).subscribe(
      valeurs => { this.dataSource.data = valeurs; }
    )
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}

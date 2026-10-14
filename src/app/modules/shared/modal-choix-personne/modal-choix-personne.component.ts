import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IPatient } from 'src/app/modele/Patient';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { ModalCodebarreService } from '../../shared/modal-codebarre/modal-codebarre.service';
import { DocumentService } from 'src/app/services/documents/document.service';
import { ModalChoixSousExemplairesComponent } from '../modal-choix-sous-exemplaires/modal-choix-sous-exemplaires.component';
import { ModalCodebarreScanContinueComponent } from '../modal-codebarre-scan-continue/modal-codebarre-scan-continue.component';

@Component({
  selector: 'app-modal-choix-personne',
  templateUrl: './modal-choix-personne.component.html',
  styleUrls: ['./modal-choix-personne.component.scss']
})
export class ModalChoixPersonneComponent  implements OnInit{

  myControl = new FormControl<string | IPatient>('');
  filteredOptions: IPatient[] | undefined;
  personne : IPatient | undefined
  scan_val: any | undefined;
  url : string =""

  @ViewChild('barcodeScanner') barcodeScanner!: ModalCodebarreScanContinueComponent;

  openBarcodeScanner(): void {
    if (this.barcodeScanner) {
      this.barcodeScanner.createMediaStream();
    }
  }
  
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicePersonne:PatientsService,
    private donneeExemplairePersonneRatacheeService:DonneesEchangeService,
    private documentService:DocumentService,
    private dialogDef : MatDialog, 
    private barService: ModalCodebarreService
  ) {}
  
  ngOnInit(): void {
    this.barService.getCode().subscribe((dt) => {
      if (!dt) return;
      this.scan_val = dt;
      this.myControl.setValue(this.scan_val); // Set the initial value in the search bar
      this.handleScanValChange(); // Trigger the search when scan_val changes
    });

    this.getAllPatients().subscribe(valeurs => {
      this.filteredOptions = valeurs;
    });

    this.myControl.valueChanges.subscribe(
      value => {
        const query = typeof value === 'string' ? value.toLowerCase() : value?.nom?.toLowerCase();
        if (query && query.length > 0) {
          // Search by name, ID or barcode
          this.servicePersonne
            .getPatientsByNameOrId(query)
            .subscribe((reponse) => {
              this.filteredOptions = reponse;
            });
        }
        else{
          this.servicePersonne.getAllPatients().subscribe(
            (reponse) =>{
              this.filteredOptions=reponse;
            }
          );
        }
      }
    );
  }

  displayFn(user: any): string {
    if (!user) return '';
    return typeof user === 'string' ? user : (user.nom || '');
  }

  private getAllPatients(){
    return this.servicePersonne.getAllPatients();
  }

  /**
   * Méthode qui permet de recupérer le libelle du menu sur lequel on clic pour
   * pouvoir déterminer l'url de la page suivante
   * @returns l'url de redirection
   */
  navigate(){
    
    let valeurIdDocument = sessionStorage.getItem("idDocumentPourExemplaire")
    if (this.donneeExemplairePersonneRatacheeService.getUrlSource() == "Historique des documents") {
      this.router.navigate(['../parcours/documents/historique-par-personne'])
    }else{
        
      this.documentService.getDocumentById(valeurIdDocument!).subscribe(
        objet =>{
          if (objet.contientRessources == true) {
            this.url= "exemplaire-nouveau/".concat(valeurIdDocument!)
            const dialogRef = this.dialogDef.open(ModalChoixSousExemplairesComponent, 
              {
                maxWidth: '100vw',
                maxHeight: '100vh',
                width:'100%',
                height:'100%',
                enterAnimationDuration:'1000ms',
                exitAnimationDuration:'1000ms',
                data: valeurIdDocument
              })
          }
        }
      )
    }
  }
  
  /**
   * Methode permettant d'ouvrir la modal permettant d'associer des sous exemplaire à celui qu'on veut creer
   */
  openSousExemplaireDocumentDialog(){
    
    // else if (this.document?.beneficiaireObligatoire == false && this.document?.contientRessources == true) {
      const dialogRef = this.dialogDef.open(ModalChoixSousExemplairesComponent, 
      {
        maxWidth: '100vw',
        maxHeight: '100vh',
        width:'100%',
        height:'100%',
        enterAnimationDuration:'1000ms',
        exitAnimationDuration:'1000ms'
      })
    // }
  }
  public rechercherListingPersonnes(option: IPatient) {
    this.donneeExemplairePersonneRatacheeService.setExemplairePersonneRatachee(option)
    this.personne! = option
    if (this.myControl.value == '' || this.myControl.value == undefined) {
      this.scan_val = undefined
    }
  }
  private handleScanValChange() {
    if (this.scan_val) {
      this.servicePersonne
        .getPatientsByNameOrId(this.scan_val)
        .subscribe((response) => {
          this.filteredOptions = response;
          if (response && response.length > 0) {
            const selectedOption = response.find(
              (option) =>
                option.id === this.scan_val ||
                option.qrCodeValue === this.scan_val
            );
            if (selectedOption) {
              this.rechercherListingPersonnes(selectedOption);
              this.myControl.setValue(selectedOption);
              this.filteredOptions = [selectedOption];
            }
          }
        });
    }
  }
  /**
   * Methode permettant de reinitialiser la barre de recherche et le contenu de la variable personne
   */
  reinitialiser(){
    this.myControl.reset()
    this.personne = undefined
  }
}

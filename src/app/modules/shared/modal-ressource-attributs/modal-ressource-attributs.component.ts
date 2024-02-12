import { LiveAnnouncer } from '@angular/cdk/a11y';
import { FormControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { IAttributs } from 'src/app/modele/attributs';
import { AttributService } from 'src/app/services/attributs/attribut.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { log } from 'console';

@Component({
  selector: 'app-modal-ressource-attributs',
  templateUrl: './modal-ressource-attributs.component.html',
  styleUrls: ['./modal-ressource-attributs.component.scss']
})
export class ModalRessourceAttributsComponent implements OnInit {
  // variables attributs, pour afficher le tableau d'attributs sur l'IHM
  formeAttribut: FormGroup;
  submitted: boolean=false;
  myControl = new FormControl<string | IAttributs>('');
  ELEMENTS_TABLE_ATTRIBUTS: any[] = [];
  filteredOptions: IAttributs[] | undefined;
  displayedAttributsColumns: string[] = [
    'actions',
    'titre',
    'description',
    'type'
  ]; // structure du tableau presentant les attributs
  displayedResultAttributsColumns: string[] = [
    'actions',
    'titre',
    'type',
    'valeur'
  ];
  dataSourceAttribut = new MatTableDataSource<IAttributs>(
    this.ELEMENTS_TABLE_ATTRIBUTS
  );
  dataSourceAttributResultat = new MatTableDataSource<any>();
  idAttribut: string = '';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private infosPath: ActivatedRoute,
    private serviceAttribut: AttributService,
    private _liveAnnouncer: LiveAnnouncer,
    private donneeDocCatService:DonneesEchangeService,
    private dialogDef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formeAttribut = this.formBuilder.group({
      res: [undefined  ,Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllAttributs().subscribe((valeurs) => {
      this.dataSourceAttribut.data = valeurs;
      this.filteredOptions = valeurs
    });
    this.dataSourceAttributResultat.data = this.donneeDocCatService.dataDocumentAttributs
    this.myControl.valueChanges.subscribe((value) => {
      const titre = typeof value === 'string' ? value : value?.titre;
      if (titre != undefined && titre?.length > 0) {
        this.serviceAttribut
          .getAttributsByTitre(titre.toLowerCase() as string)
          .subscribe((reponse) => {
            this.filteredOptions = reponse;
          });
      } else {
        this.serviceAttribut.getAllAttributs().subscribe(
          (reponse) =>{
            this.filteredOptions=reponse
          }
        )
      }
    });
  }

  onCheckAttributChange(event: any) {
    let listIdAttTemp : string[] = []
    let positionsAttr = new Map()
    let indexAttrCourant : number = 0
    this.donneeDocCatService.dataDocumentAttributs.forEach(
      (element: IAttributs) => {
        listIdAttTemp.push(element.id)
        positionsAttr.set(element.id, indexAttrCourant++)
    });
    if (event.target.checked) {
      if (!listIdAttTemp.includes(this.idAttribut)) {
        this.ajoutSelectionAttribut(this.idAttribut);
      }
    } else {
      if (listIdAttTemp.includes(this.idAttribut)) {
        const index = positionsAttr.get(this.idAttribut)
        this.retirerSelectionAttribut(index);
      }
    }
  }

  getAttributId(idAttribut: string) {
    this.idAttribut = idAttribut;
  }

  ajoutSelectionAttribut(idAttribut: string) {
    this.serviceAttribut.getAttributById(idAttribut).subscribe((val) => {
      this.ELEMENTS_TABLE_ATTRIBUTS = this.dataSourceAttributResultat.data;
      this.ELEMENTS_TABLE_ATTRIBUTS.push({attributs: val, valeur: this.formeAttribut.value.res});
      this.dataSourceAttributResultat.data = this.ELEMENTS_TABLE_ATTRIBUTS;      
      this.donneeDocCatService.dataDocumentAttributs = this.ELEMENTS_TABLE_ATTRIBUTS;
      console.log("attributs selectionnés :", this.donneeDocCatService.dataDocumentAttributs);
    });
  }

  verificationModificationDansTableau(element:any, event: any, indexElement: number){
    console.log("element sélectionné :", element, event.target.value);
        this.ELEMENTS_TABLE_ATTRIBUTS[indexElement].valeur = event.target.value;
  }

  get f(){
    return this.formeAttribut.controls;
  }

  onSubmit(personnelInput:any){
    this.submitted=true;
    //Todo la validation d'element non conforme passe
    if(this.formeAttribut.invalid) return;

    /* let personnelTemp : IPersonnel={
      id: uuidv4(),
      nom:personnelInput.nom,
      prenom:personnelInput.prenom,
      sexe:personnelInput.sexe,
      email:personnelInput.email,
      telephone:personnelInput.telephone,
      dateNaissance:personnelInput.dateNaissance,
      dateEntree: personnelInput.dateEntree,
      dateSortie: personnelInput.dateSortie
    }

    if(this.personnel != undefined){
      personnelTemp.id = this.personnel.id
    }
    this.personnelService.ajouterPersonnel(personnelTemp).subscribe(
      object => {
        this.router.navigate(['/list-personnels']);
      }
    ) */
  }

  retirerSelectionAttribut(index: number) {
    this.ELEMENTS_TABLE_ATTRIBUTS = this.dataSourceAttributResultat.data;
    this.ELEMENTS_TABLE_ATTRIBUTS.splice(index, 1); // je supprime un seul element du tableau a la position 'index'
    this.dataSourceAttributResultat.data = this.ELEMENTS_TABLE_ATTRIBUTS;
    this.donneeDocCatService.dataDocumentAttributs = this.ELEMENTS_TABLE_ATTRIBUTS;
  }
  private getAllAttributs() {
    return this.serviceAttribut.getAllAttributs();
  }
  displayFn(attribue: IAttributs): string {
    return attribue && attribue.titre ? attribue.titre : '';
  }

  ngAfterViewInit() {
    this.dataSourceAttribut.paginator = this.paginator;
    this.dataSourceAttribut.sort = this.sort;
  }

  public rechercherListingAttribut(option: IAttributs) {
    this.serviceAttribut
      .getAttributsByTitre(option.titre.toLowerCase())
      .subscribe((valeurs) => {
        this.dataSourceAttribut.data = valeurs;
      });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

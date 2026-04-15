import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable } from 'rxjs';
import { IAfficheDocument } from 'src/app/modele/affiche-document';
import { IDocument } from 'src/app/modele/document';
import { IElements } from 'src/app/modele/elements';
import { PassActionService } from 'src/app/services/actions-view/pass-action.service';
import { DocumentService } from 'src/app/services/documents/document.service';

@Component({
  selector: 'app-list-form-document',
  templateUrl: './list-form-document.component.html',
  styleUrls: ['./list-form-document.component.scss']
})
export class ListFormDocumentComponent implements OnInit, AfterViewInit {

  myControl = new FormControl<string | IDocument>('');
  receivedActions$: Observable<IElements[]>=EMPTY;
  actions : IElements[] | undefined;

  ELEMENTS_TABLE: IAfficheDocument[] = [];
  filteredOptions: IDocument[] | undefined;

  displayedColumns: string[] = ['titre', 'description', 'typeMouvement', 'etat', 'missions', 'attributs', 'categories', 'actions'];

  dataSource = new MatTableDataSource<IAfficheDocument>(this.ELEMENTS_TABLE);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  tableDocuments : IAfficheDocument[] = []


  afficheDocument : IAfficheDocument = {
    idDocument: '',
    titre: '',
    description: '',
    missions: [],
    attributs: [],
    categories: [],
    listeMissions: '',
    listAttributs: '',
    listCategories: '',
    listPrecoMouvements: '',
    precoMouvements: [],
    sousDocuments: [],
    listSousDocuments: '',
    etat: false,
    estencaissable: false,
    typeMouvement: 'Neutre',
    afficherPrix: false,
    contientRessources: false,
    afficherDistributeur: false,
    listDocEtats: '',
    docEtats: [],
    formatCode: '',
    beneficiaireObligatoire: false
  }

  constructor(private translate: TranslateService, private router:Router,
    private serviceDocument: DocumentService,  private _liveAnnouncer: LiveAnnouncer,
    private actionsview: PassActionService
  ) { }

  ngOnInit(): void {
    this.receivedActions$ = this.actionsview.getActions();

    this.receivedActions$.subscribe(a => {

      if (a != null) {

        this.actions = a;

      }

    });
    this.getAllDocuments().subscribe(valeurs => {
     const tableDocuments : IAfficheDocument[] = [];

      valeurs.forEach(
        x =>{
          tableDocuments.push(this.convertDocToDocAffiche(x))
        }
      )
      this.dataSource.data = tableDocuments;
      this.filteredOptions = valeurs
    });

    this.myControl.valueChanges.subscribe(
      value => {
        const titre = typeof value === 'string' ? value : value?.titre;
        if(titre != undefined && titre?.length >0){
          this.serviceDocument.getDocumentByTitre(titre.toLowerCase() as string).subscribe(
            reponse => {
              this.filteredOptions = reponse;
            }
          )
        }
        else{
          this.serviceDocument.getAllDocuments().subscribe(
            (resultat) =>{
              this.filteredOptions = resultat
            }
          )
        }
      }
    );
  }
  displayFn(document: IDocument): string {
    return document && document.titre ? document.titre : '';
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  public rechercherListingDocument(option: IDocument){
    this.serviceDocument.getDocumentByTitre(option.titre.toLowerCase()).subscribe(
        valeurs => {
          const tableDocuments : IAfficheDocument[] = [];
          valeurs.forEach(
            x =>{
              tableDocuments.push(this.convertDocToDocAffiche(x))
            }
          )
          this.dataSource.data = tableDocuments;
        }
    )
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  private getAllDocuments(){
    return this.serviceDocument.getAllDocuments();
  }

  private convertDocToDocAffiche(x: IDocument) : IAfficheDocument {
   let  afficheDocument  : IAfficheDocument = {
     listeMissions: '',
     listAttributs: '',
     listCategories: '',
     listPrecoMouvements: '',
     listSousDocuments: '',
     listDocEtats: '',
     idDocument: x.idDocument,
     titre: x.titre,
     description: x.description,
     etat: x.etat,
     estencaissable: x.estencaissable,
     typeMouvement: x.typeMouvement,
     afficherPrix:  x.afficherPrix,
     contientRessources:  x.contientRessources,
     afficherDistributeur:  x.afficherDistributeur,
     missions:  x.missions,
     attributs:  x.attributs,
     categories:  x.categories,
     precoMouvements:  x.precoMouvements,
     docEtats:  x.docEtats,
     formatCode:  x.formatCode,
     beneficiaireObligatoire:  x.beneficiaireObligatoire
   }

   if (x.missions) {
      x.missions.forEach(
        m => {
          afficheDocument.listeMissions += m.libelle + ", ";
        }
      )
   }
   if (x.attributs) {
      x.attributs.forEach(
        a => afficheDocument.listAttributs += a.titre + ", "
      )
   }
   if (x.categories) {
      x.categories.forEach(
        c => afficheDocument.listCategories += c.libelle + ", "
      )
   }
   if (x.precoMouvements) {
      x.precoMouvements.forEach(
        p => afficheDocument.listPrecoMouvements += p.libelle + ", "
      )
   }
   if (x.docEtats) {
    x.docEtats.forEach(
      de => afficheDocument.listDocEtats += de.etat.libelle + ", "
    )
   }
    return afficheDocument;
  }
}

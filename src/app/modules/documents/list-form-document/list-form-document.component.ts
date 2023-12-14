import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, EMPTY } from 'rxjs';
import { IAfficheDocument } from 'src/app/modele/affiche-document';
import { IAttributs } from 'src/app/modele/attributs';
import { IDocument } from 'src/app/modele/document';
import { DocumentService } from 'src/app/services/documents/document.service';

@Component({
  selector: 'app-list-form-document',
  templateUrl: './list-form-document.component.html',
  styleUrls: ['./list-form-document.component.scss']
})
export class ListFormDocumentComponent implements OnInit, AfterViewInit {

  myControl = new FormControl<string | IDocument>('');
 
  ELEMENTS_TABLE: IDocument[] = [];
  filteredOptions: IDocument[] | undefined;

  displayedColumns: string[] = ['id', 'titre', 'description', 'etat', 'missions', 'attributs', 'categories', 'preconisations', 'sousDocuments', 'actions'];

  dataSource = new MatTableDataSource<IDocument>(this.ELEMENTS_TABLE);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  tableDocuments : IAfficheDocument[] = []
  
  
  afficheDocument : IAfficheDocument = {
    id: '',
    titre: '',
    description: '',
    missions: [],
    attributs: [],
    categories: [],
    listeMissions: '',
    listAttributs: '',
    listCategories: '',
    listPreconisations: '',
    preconisations: [],
    sousDocuments: [],
    listSousDocuments: '',
    etat: false,
    affichagePrix: false,
    contientRessources: false,
    contientDistributeurs: false
  }


  constructor(private translate: TranslateService, private router:Router, private serviceDocument: DocumentService,  private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.getAllDocuments().subscribe(valeurs => {
     const tableDocuments : IAfficheDocument[] = this.tableDocuments
     
      valeurs.forEach(
        x =>{
          this.afficheDocument  = {
            id: x.id,
            titre: x.titre,
            description: x.description,
            etat: x.etat,
            affichagePrix: x.affichagePrix,
            contientRessources: x.contientRessources,
            contientDistributeurs: x.contientDistributeurs,
            missions: x.missions,
            attributs: x.attributs,
            categories: x.categories,
            preconisations: x.preconisations,
            sousDocuments:x.sousDocuments!,
            listeMissions: '',
            listAttributs: '',
            listCategories: '',
            listPreconisations: '',
            listSousDocuments:''
          }
            x.missions.forEach(
              m => {
                this.afficheDocument.listeMissions += m.libelle + ", ";
              } 
            )
            x.attributs.forEach(
              a => this.afficheDocument.listAttributs += a.titre + ", "
            )
            x.categories.forEach(
              c => this.afficheDocument.listCategories += c.nom + ", "
            ) 
            x.preconisations.forEach(
              p => this.afficheDocument.listPreconisations += p.libelle + ", "
            )
            if (x.sousDocuments != undefined) {
              x.sousDocuments.forEach(
                d => this.afficheDocument.listSousDocuments += d.titre + ", "
              )
            } 
          tableDocuments.push(this.afficheDocument)
        }
      )
      this.dataSource.data = tableDocuments;
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
          this.filteredOptions = [];
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
        valeurs => {this.dataSource.data = valeurs;}
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

}

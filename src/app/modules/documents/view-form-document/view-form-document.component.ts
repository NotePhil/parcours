import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IDocument } from 'src/app/modele/document';
import { TypeMvt } from 'src/app/modele/type-mvt';
import { Typemvt } from 'src/app/modele/typemvt';
import { DocumentService } from 'src/app/services/documents/document.service';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';

@Component({
  selector: 'app-view-form-document',
  templateUrl: './view-form-document.component.html',
  styleUrls: ['./view-form-document.component.scss']
})
export class ViewFormDocumentComponent implements OnInit {

  document : IDocument = {
    id: '',
    titre: '',
    description: '',
    missions: [],
    attributs: [],
    categories: [],
    preconisations: [],
    etat: false,
    affichagePrix: false,
    contientRessources: false,
    contientDistributeurs: false,
    typeMouvement: TypeMvt.Neutre
  };
  titre:string='';
  constructor(private router:Router,private dataEnteteMenuService:DonneesEchangeService, private infosPath:ActivatedRoute, private serviceDocument:DocumentService) {}

  ngOnInit(): void {
    let idDocument = this.infosPath.snapshot.paramMap.get('idDocument');
    if((idDocument != null) && idDocument!==''){
      this.serviceDocument.getDocumentById(idDocument).subscribe(
        x =>{
          this.document = x;
        });
    }

    this.titre=this.dataEnteteMenuService.dataEnteteMenu
  }

}

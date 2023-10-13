import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IDocument } from 'src/app/modele/document';
import { IExemplaireDocument } from 'src/app/modele/exemplaire-document';
import { IRessource } from 'src/app/modele/ressource';
import { DocumentService } from 'src/app/services/documents/document.service';
import { ExemplaireDocumentService } from 'src/app/services/exemplaire-document/exemplaire-document.service';

@Component({
  selector: 'app-view-exemplaire',
  templateUrl: './view-exemplaire.component.html',
  styleUrls: ['./view-exemplaire.component.scss']
})
export class ViewExemplaireComponent implements OnInit {
  
  exemplaire : IExemplaireDocument = {
    id: '',
    titre: '',
    description: '',
    missions: [],
    attributs: [],
    idDocument: '',
    objetEnregistre: [],
    categories: [],
    preconisations: []
  }; 
  document : IDocument = {
    id: '',
    titre: '',
    description: '',
    missions: [],
    attributs: [],
    categories: [],
    preconisations: []
  };
  ressourcesExemplaire:IRessource[]=[]

  constructor(private router:Router, private infosPath:ActivatedRoute, private serviceDocument:DocumentService, private serviceExemplaire:ExemplaireDocumentService) {}

  ngOnInit(): void {
    let idExemplaire = this.infosPath.snapshot.paramMap.get('idExemplaire');
    if((idExemplaire != null) && idExemplaire!==''){
      this.serviceExemplaire.getExemplaireDocumentById(idExemplaire).subscribe(
        x =>{
          this.exemplaire = x;
          this.initialiseRessoures()
        });
    }
  }
  initialiseRessoures(){
    this.exemplaire.preconisations[0].precomvtqte.forEach(
      precoMvtQte => {
        if (precoMvtQte.ressource != undefined) {
          this.ressourcesExemplaire.push(precoMvtQte.ressource)
        }
    });
  }
}

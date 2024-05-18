import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDocEtats } from 'src/app/modele/doc-etats';
import { IExemplaireDocument } from 'src/app/modele/exemplaire-document';
import { IMouvement } from 'src/app/modele/mouvement';
import { TypeMouvement } from 'src/app/modele/typeMouvement';
import { DocumentService } from 'src/app/services/documents/document.service';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { ExemplaireDocumentService } from 'src/app/services/exemplaire-document/exemplaire-document.service';
import { IOrdreEtat } from 'src/app/modele/ordreEtat';

@Component({
  selector: 'app-view-exemplaire',
  templateUrl: './view-exemplaire.component.html',
  styleUrls: ['./view-exemplaire.component.scss'],
})
export class ViewExemplaireComponent implements OnInit {
  exemplaire: IExemplaireDocument = {
    id: '',
    titre: '',
    description: '',
    missions: [],
    attributs: [],
    idDocument: '',
    objetEnregistre: [],
    categories: [],
    preconisations: [],
    mouvements: [],
    ordreEtats: [],
    etat: false,
    affichagePrix: false,
    contientRessources: false,
    contientDistributeurs: false,
    typeMouvement: TypeMouvement.Neutre,
    docEtats: [],
    dateCreation: new Date,
    personneRattachee: {
      id: '',
      nom: '',
      adresse: '',
      mail: '',
      telephone: '',
      qrCodeValue: ''
    }
  };
  titre: string = '';
  courant: string = '';
  req: boolean = false;
  error: string = '';
  selectedEtatsMap: IDocEtats | undefined;
  reponse: { ele: IOrdreEtat; sol: boolean; in: number } | undefined;
  mouvements: IMouvement[] = [];
  EtatsSuivant: IDocEtats[] = [];
  TabOrdre: IOrdreEtat[] = [];
  ExempleOrdre: IOrdreEtat[] = [];
  NextEtats!: IOrdreEtat;
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private infosPath: ActivatedRoute,
    private dataEnteteMenuService: DonneesEchangeService,
    private serviceDocument: DocumentService,
    private serviceExemplaire: ExemplaireDocumentService
  ) {}

  ngOnInit(): void {
    let idExemplaire = this.infosPath.snapshot.paramMap.get('idExemplaire');
    if (idExemplaire != null && idExemplaire !== '') {
      this.serviceExemplaire
        .getExemplaireDocumentById(idExemplaire)
        .subscribe((x) => {
          this.exemplaire = x;
          this.courant = x.ordreEtats![x.ordreEtats!.length - 1].etat.libelle;

          if (this.exemplaire.mouvements != undefined) {
            this.mouvements = this.exemplaire.mouvements;
          }
        });
    }
    this.titre = this.dataEnteteMenuService.dataEnteteMenu;
  }
}
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { IAttributs } from 'src/app/modele/attributs';
import { ICategoriesAttributs } from 'src/app/modele/categories-attributs';
import { IDocument } from 'src/app/modele/document';
import { IDocumentsAssocies } from 'src/app/modele/documents-associes';
import { IMission } from 'src/app/modele/mission';
import { IService } from 'src/app/modele/service';
import { DocumentService } from 'src/app/services/documents/document.service';
import { MissionsService } from 'src/app/services/missions/missions.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalCategoriesComponent } from '../../shared/modal-categories/modal-categories.component';
import { ICategorieAffichage } from 'src/app/modele/categorie-affichage';
import { IType } from 'src/app/modele/type';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { ModalChoixAttributsComponent } from '../../shared/modal-choix-attributs/modal-choix-attributs.component';
import { ModalChoixPreconisationsComponent } from '../../shared/modal-choix-preconisations/modal-choix-preconisations.component';
import { IPrecoMvt } from 'src/app/modele/precomvt';
import { ModalChoixSousDocumentComponent } from '../../shared/modal-choix-sous-document/modal-choix-sous-document.component';
import { IAssociationCategorieAttributs } from 'src/app/modele/association-categorie-attributs';
import { TypeMouvement } from 'src/app/modele/typeMouvement';
import { ModalDocEtatsComponent } from '../../shared/modal-document-doc-etats/modal-document-doc-etats.component';
import { IDocEtats } from 'src/app/modele/doc-etats';

@Component({
  selector: 'app-new-form-document',
  templateUrl: './new-form-document.component.html',
  styleUrls: ['./new-form-document.component.scss'],
})
export class NewFormDocumentComponent implements OnInit {
  document: IDocument = {
    titre: '',
    description: '',
    etat: false,
    missions: [],
    attributs: [],
    categories: [],
    precoMouvements: [],
    documentsAssocies: [],
    afficherPrix: false,
    estencaissable: false,
    contientRessources: false,
    afficherDistributeur: false,
    typeMouvement: TypeMouvement.Neutre,
    docEtats: [],
    formatCode: '',
    beneficiaireObligatoire: false
  };
  mission$: Observable<IMission[]> = EMPTY;
  forme: FormGroup;
  btnLibelle: string = 'Ajouter';
  submitted: boolean = false;
  validation: boolean = false;
  serviceDeMission!: IService;
  titre: string = '';

  // variables attributs, pour afficher le tableau d'attributs sur l'IHM
  ELEMENTS_TABLE_ATTRIBUTS: IAttributs[] = [];
  dataSourceAttribut = new MatTableDataSource<IAttributs>(
    this.ELEMENTS_TABLE_ATTRIBUTS
  );
  dataSourceAttributResultat = new MatTableDataSource<IAttributs>();

  ELEMENTS_TABLE_CATEGORIES: IAttributs[] = []; //tableau de listing des attributs a affecter a chaque categorie

  // variables pour la gestion des categories
  categorieAttributs: ICategoriesAttributs = {
    libelle: '',
    ordre: 0,
    attributs: [],
  };
  TABLE_CATEGORIE_AFFICHAGE_TEMP: ICategoriesAttributs[] = []; // tableau qui doit contenir la synthese des categories du doc
  TABLE_CATEGORIE_AFFICHAGE_TEMPO: ICategorieAffichage[] = []; // tableau contenant les categories creees dans la modale

  //tableau contenant les precoMouvements
  ELEMENTS_TABLE_PRECONISATIONS: IPrecoMvt[] = [];

  // MODIFICATION: Remplacement de ELEMENTS_TABLE_SOUS_DOCUMENTS par le tableau d'objets IDocumentsAssocies
  ELEMENTS_TABLE_DOCUMENTS_ASSOCIES: IDocumentsAssocies[] = [];

  //tableau contenant les etats du documents
  ELEMENTS_TABLE_DOC_ETATS: IDocEtats[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  typeMvt: string[] = [];
  formatsCode: string[] = [];
  documentParentDesactive = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private infosPath: ActivatedRoute,
    private dataEnteteMenuService: DonneesEchangeService,
    private serviceDocument: DocumentService,
    private serviceMission: MissionsService,
    private donneeDocCatService: DonneesEchangeService,
    private dialogDef: MatDialog
  ) {
    this.forme = this.formBuilder.group({
      _missions: new FormControl<string | IMission[]>(''),
      _attributs: new FormArray([]),
      titre: ['', [Validators.required]],
      description: [''],
      typeMouvement: ['', [Validators.required]],
      etat: new FormControl(true),
      estencaissable: new FormControl(true),
      afficherPrix: new FormControl(false),
      contientRessources: new FormControl(false),
      afficherDistributeur: new FormControl(false),
      beneficiaireObligatoire: new FormControl(true),
      formatCode: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.mission$ = this.getAllMissions();
    this.forme.controls['afficherPrix'].disable();
    this.forme.controls['afficherDistributeur'].disable();
    this.documentParentDesactive = true;
    this.donneeDocCatService.getTypeMvt().subscribe((x) => (this.typeMvt = x.type));
    this.donneeDocCatService.getFormatCode().subscribe((f) => (this.formatsCode = f.type));

    // chargement de la page a partir d'un Id pour la modification d'un document
    let idDocument = this.infosPath.snapshot.paramMap.get('idDocument');
    console.log('id ', this.infosPath.snapshot.paramMap.get('idDocument'));

    if (idDocument != null && idDocument !== '') {
      this.btnLibelle = 'Modifier';
      this.titre = 'Document à Modifier';
      this.serviceDocument.getDocumentById(idDocument).subscribe((x) => {
        this.document = x;
        if (this.document.contientRessources == true) {
          this.forme.controls['afficherPrix'].enable();
          this.forme.controls['afficherDistributeur'].enable();
          this.documentParentDesactive = false;
        }
        this.forme.setValue({
          titre: this.document.titre,
          description: this.document.description,
          etat: this.document.etat,
          estencaissable: this.document.estencaissable,
          typeMouvement: this.document.typeMouvement,
          afficherPrix: this.document.afficherPrix,
          contientRessources: this.document.contientRessources,
          afficherDistributeur: this.document.afficherDistributeur,
          beneficiaireObligatoire: true,
          _missions: this.document.missions,
          _attributs: [],
          formatCode: this.document.formatCode
        });
        this.forme.controls['_missions'].setValue(this.document.missions);

        // Initialisation du tableau d'attributs du document
        this.ELEMENTS_TABLE_ATTRIBUTS = this.document.attributs;

        // Initialisation du tableau de precoMouvements du document
        this.ELEMENTS_TABLE_PRECONISATIONS = this.document.precoMouvements;

        // MODIFICATION: Initialisation du tableau de documents associés
        if (this.document.documentsAssocies != undefined) {
          this.ELEMENTS_TABLE_DOCUMENTS_ASSOCIES = this.document.documentsAssocies;
        } else {
          this.ELEMENTS_TABLE_DOCUMENTS_ASSOCIES = [];
        }

        // Initialisation du tableau des etats du document avec securisation si docEtats est indefini
        this.ELEMENTS_TABLE_DOC_ETATS = this.document.docEtats ? this.document.docEtats : [];

        // Initialisation du tableau de categories temp du document qui reconstitue
        // le deuxieme tableau de la modal
        let categorieAfficheFinal: ICategorieAffichage[] = [];
        this.document.categories.forEach((catAttribut) => {
          catAttribut.attributs.forEach((att) => {
            let categorieAfficheTemp: ICategorieAffichage = {
              nom: '',
              ordre: 0,
              attributCategories: {
                ordre: 0,
                obligatoire: false,
                attribut: {
                  titre: '',
                  description: '',
                  etat: false,
                  dateCreation: new Date(),
                  dateModification: new Date(),
                  valeurParDefaut: '',
                  type_attribut: IType.Int,
                },
              },
            };
            categorieAfficheTemp.id = catAttribut.id;
            categorieAfficheTemp.nom = catAttribut.libelle;
            categorieAfficheTemp.ordre = catAttribut.ordre;
            categorieAfficheTemp.attributCategories = att;
            categorieAfficheFinal.push(categorieAfficheTemp);
          });
        });

        // sauvegarde dans le service pour le communiquer aux modales
        this.donneeDocCatService.dataDocumentCategorie = categorieAfficheFinal;
        this.donneeDocCatService.dataDocumentPrecoMvts = this.document.precoMouvements;
        this.donneeDocCatService.dataDocumentAttributs = this.document.attributs;
        // MODIFICATION: Initialisation sécurisée avec le tableau de IDocumentsAssocies dans dataDocumentRessourcesAttributs
        this.donneeDocCatService.dataDocumentRessourcesAttributs = this.document.documentsAssocies || [];
        this.donneeDocCatService.dataDocumentDocumentsAssocies = this.document.documentsAssocies || [];
        // Affectation explicite des etats dans le service d'echange
        this.donneeDocCatService.dataDocumentEtats = this.ELEMENTS_TABLE_DOC_ETATS;

        // synthese du tableau de categories du document pour afficher les differentes categories dans l'espace dedie
        this.syntheseCategorieAttribut();
      });
    } else {
      this.donneeDocCatService.dataDocumentAttributs = [];
      this.donneeDocCatService.dataDocumentCategorie = [];
      this.donneeDocCatService.dataDocumentPrecoMvts = [];
      this.donneeDocCatService.dataDocumentRessourcesAttributs = [];
      this.donneeDocCatService.dataDocumentDocumentsAssocies = [];
      this.donneeDocCatService.dataDocumentEtats = [];
    }
    this.titre = this.dataEnteteMenuService.dataEnteteMenu;
  }

  /**
   * Methode permettant d'ouvrir la modal de creation des categories du document
   */
  openCategorieDialog() {
    const dialogRef = this.dialogDef.open(ModalCategoriesComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.syntheseCategorieAttribut();
    });
  }

  /**
   * Methode permettant d'ouvrir la modal de selection des attributs du document
   */
  openAttributDialog() {
    const dialogRef = this.dialogDef.open(ModalChoixAttributsComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '100%',
      height: '100%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ELEMENTS_TABLE_ATTRIBUTS =
        this.donneeDocCatService.dataDocumentAttributs;
      this.syntheseCategorieAttribut();
    });
  }

  /**
   * Methode permettant d'ouvrir la modal de selection des precoMouvements du document
   */
  openPrecoMvtDialog() {
    const dialogRef = this.dialogDef.open(ModalChoixPreconisationsComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '100%',
      height: '100%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ELEMENTS_TABLE_PRECONISATIONS =
        this.donneeDocCatService.dataDocumentPrecoMvts;
    });
  }

  /**
   * MODIFICATION: Méthode permettant d'ouvrir la modale de choix des documents associés (IDocumentsAssocies)
   */
  openSousDocumentDialog() {
    const dialogConfig = new MatDialogConfig();
    // Extrait les IDs des documents sous-jacents déjà associés
    if (this.ELEMENTS_TABLE_DOCUMENTS_ASSOCIES && this.ELEMENTS_TABLE_DOCUMENTS_ASSOCIES.length > 0) {
      const documentIds = this.ELEMENTS_TABLE_DOCUMENTS_ASSOCIES
        .map(item => item.document ? (item.document.idDocument || item.document.id) : item.id)
        .filter((id): id is string => !!id);
      dialogConfig.data = { documentIds: documentIds };
    } else {
      dialogConfig.data = { documentIds: [] };
    }

    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    dialogConfig.enterAnimationDuration = '1000ms';
    dialogConfig.exitAnimationDuration = '1000ms';

    const dialogRef = this.dialogDef.open(ModalChoixSousDocumentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      // MODIFICATION: Recupration des objets IDocumentsAssocies depuis dataDocumentRessourcesAttributs ou la valeur retournee
      const res = result || this.donneeDocCatService.dataDocumentRessourcesAttributs || this.donneeDocCatService.dataDocumentDocumentsAssocies || [];
      this.ELEMENTS_TABLE_DOCUMENTS_ASSOCIES = res;
      this.document.documentsAssocies = this.ELEMENTS_TABLE_DOCUMENTS_ASSOCIES;
    });
  }

  /**
   * Methode permettant d'ouvrir la modal de manipulation des etats du document
   */
  openDocEtatDialog() {
    const dialogRef = this.dialogDef.open(ModalDocEtatsComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.ELEMENTS_TABLE_DOC_ETATS =
        this.donneeDocCatService.dataDocumentEtats || [];
      this.document.docEtats = this.ELEMENTS_TABLE_DOC_ETATS;
    });
  }

  /**
   * methode qui permet de fusionner les categories en fonction du meme nom tout en regroupant leurs attributs
   */
  syntheseCategorieAttribut() {
    let tmpCatAtt = new Map();
    let categorieAttributsFinal: ICategoriesAttributs[] = [];

    const rawCategories: ICategorieAffichage[] =
      this.donneeDocCatService.dataDocumentCategorie ?? [];

    const activeAttributIds = (
      this.donneeDocCatService.dataDocumentAttributs ?? []
    ).map((att: IAttributs) => att.id);

    this.TABLE_CATEGORIE_AFFICHAGE_TEMPO = rawCategories.filter(
      (objet) =>
        objet &&
        objet.attributCategories &&
        objet.attributCategories.attribut &&
        activeAttributIds.includes(objet.attributCategories.attribut.id)
    );

    this.donneeDocCatService.dataDocumentCategorie =
      this.TABLE_CATEGORIE_AFFICHAGE_TEMPO;
    this.TABLE_CATEGORIE_AFFICHAGE_TEMPO.forEach((objet) => {
      let categorieAttributTemp: ICategoriesAttributs = {
        libelle: '',
        ordre: 0,
        attributs: [],
      };
      if (tmpCatAtt.get(objet.nom) == null) {
        categorieAttributTemp.id = objet.id;
        categorieAttributTemp.libelle = objet.nom;
        categorieAttributTemp.ordre = objet.ordre;
        categorieAttributTemp.attributs.push(
          objet.attributCategories
        );

        let index: number = categorieAttributsFinal.push(categorieAttributTemp);
        tmpCatAtt.set(objet.nom, index - 1);
      } else {
        let index: number = tmpCatAtt.get(objet.nom);
        categorieAttributTemp = categorieAttributsFinal[index];
        categorieAttributTemp.attributs.push(
          objet.attributCategories
        );
        categorieAttributsFinal[index] = categorieAttributTemp;
      }
    });
    this.TABLE_CATEGORIE_AFFICHAGE_TEMP = categorieAttributsFinal;
  }

  return() {
    this.router.navigate(['parcours/documents/list-documents']);
  }

  onSubmit(documentInput: any) {
    this.submitted = true;
    if (
      this.forme.invalid ||
      documentInput._missions.length < 1 ||
      this.ELEMENTS_TABLE_ATTRIBUTS.length < 1
    )
      return;

    let documentTemp: IDocument = {
      titre: documentInput.titre,
      description: documentInput.description,
      etat: documentInput.etat,
      estencaissable: documentInput.estencaissable,
      typeMouvement: documentInput.typeMouvement,
      missions: documentInput._missions,
      attributs: [],
      categories: [],
      precoMouvements: [],
      documentsAssocies: [],
      afficherPrix: documentInput.afficherPrix,
      contientRessources: documentInput.contientRessources,
      afficherDistributeur: documentInput.afficherDistributeur,
      beneficiaireObligatoire: documentInput.beneficiaireObligatoire,
      docEtats: [],
      formatCode: documentInput.formatCode
    };

    if (this.document.idDocument != undefined && this.document.idDocument != '') {
      documentTemp.id = this.document.idDocument;
      documentTemp.idDocument = this.document.idDocument;
    }

    this.ELEMENTS_TABLE_ATTRIBUTS.forEach((a) =>
      documentTemp.attributs.push(a)
    );

    this.ELEMENTS_TABLE_PRECONISATIONS.forEach((preco) =>
      documentTemp.precoMouvements.push(preco)
    );

    // MODIFICATION: Affectation de la liste des documents associés (IDocumentsAssocies) au document temporaire
    documentTemp.documentsAssocies = [];
    if (this.ELEMENTS_TABLE_DOCUMENTS_ASSOCIES && this.ELEMENTS_TABLE_DOCUMENTS_ASSOCIES.length > 0) {
      this.ELEMENTS_TABLE_DOCUMENTS_ASSOCIES.forEach((docAssoc) =>
        documentTemp.documentsAssocies?.push(docAssoc)
      );
    }
    this.document.documentsAssocies = documentTemp.documentsAssocies;

    if (this.documentParentDesactive == true) {
      documentTemp.afficherPrix = false;
      documentTemp.afficherDistributeur = false;
    }

    // Affectation explicite et securisee des etats selectionnes au document temporaire avant enregistrement
    documentTemp.docEtats = [];
    if (this.ELEMENTS_TABLE_DOC_ETATS && this.ELEMENTS_TABLE_DOC_ETATS.length > 0) {
      this.ELEMENTS_TABLE_DOC_ETATS.forEach(
        docEtat => documentTemp.docEtats.push(docEtat)
      );
    }
    this.document.docEtats = documentTemp.docEtats;

    if (this.TABLE_CATEGORIE_AFFICHAGE_TEMP.length < 1) {
      let categorieAttributs: ICategoriesAttributs = {
        libelle: 'Autres',
        ordre: 100,
        attributs: [],
      };
      this.ELEMENTS_TABLE_ATTRIBUTS.forEach((element) => {
        let associationCategorieAttributs: IAssociationCategorieAttributs = {
          ordre: 0,
          obligatoire: false,
          attribut: element,
        };
        categorieAttributs.attributs.push(
          associationCategorieAttributs
        );
      });
      documentTemp.categories.push(categorieAttributs);
    } else {
      this.TABLE_CATEGORIE_AFFICHAGE_TEMP.forEach((cat) =>
        documentTemp.categories.push(cat)
      );
    }

    this.serviceDocument.ajouterDocument(documentTemp).subscribe((object) => {
      this.router.navigate(['parcours/documents/list-documents']);
    });
    this.donneeDocCatService.dataDocumentAttributs = [];
    this.donneeDocCatService.dataDocumentCategorie = [];
    this.donneeDocCatService.dataDocumentPrecoMvts = [];
    this.donneeDocCatService.dataDocumentDocumentsAssocies = [];
    this.donneeDocCatService.dataDocumentEtats = [];
  }

  get f() {
    return this.forme.controls;
  }
  private getAllMissions() {
    return this.serviceMission.getAllMissions();
  }
  compareItem(mission1: IMission, mission2: IMission) {
    return mission2 && mission1
      ? mission2.id === mission1.id
      : mission2 === mission1;
  }
  desactiveElementsLieRessource(event: any) {
    if (!event.target.checked) {
      this.forme.controls['afficherPrix'].disable();
      this.forme.controls['afficherDistributeur'].disable();
      this.documentParentDesactive = true;
    } else {
      this.forme.controls['afficherPrix'].enable();
      this.forme.controls['afficherDistributeur'].enable();
      this.documentParentDesactive = false;
    }
  }
}

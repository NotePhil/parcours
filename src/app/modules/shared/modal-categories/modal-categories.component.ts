import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { IAttributs } from 'src/app/modele/attributs';
import { ICategorieAffichage } from 'src/app/modele/categorie-affichage';
import { ICategoriesAttributs } from 'src/app/modele/categories-attributs';
import { AttributService } from 'src/app/services/attributs/attribut.service';
import { CategorieAttributService } from 'src/app/services/categorie-attribut/categorie-attribut.service';
import { DocumentService } from 'src/app/services/documents/document.service';
import { IType } from 'src/app/modele/type';
import { v4 as uuidv4 } from 'uuid';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { IAssociationCategorieAttributs } from 'src/app/modele/association-categorie-attributs';

@Component({
  selector: 'app-modal-categories',
  templateUrl: './modal-categories.component.html',
  styleUrls: ['./modal-categories.component.scss'],
})
export class ModalCategoriesComponent implements OnInit {
  selectedCategoriesIds: string[] = [];
  formeCategorieAttribut: FormGroup;
  btnLibelle: string = 'Enregistrer';
  titre: string = 'Ajouter une categorie';
  submitted: boolean = false;
  validation: boolean = false;

  // structure du tableau presentant les categories creees avec leurs attributs
  displayedCategoriesAttributsColumns: string[] = [
    'actions',
    'libelleCategorie',
    'ordreCat',
    'libelleAttribut',
    'ordreAtrParCat',
    'obligatoire',
  ];
  // structure du tableau presentant les choix des attributs lors de la creation des categories
  displayedCategoriesColumns: string[] = [
    'actions',
    'titre',
    'description',
    'ordreAtrParCat',
    'obligatoire',
  ];

  nomValide: boolean = false;

  //tableau de listing des attributs a affecter a chaque categorie
  dataSourceAttributTemp =
    new MatTableDataSource<IAssociationCategorieAttributs>();

  categorieAttributs: ICategoriesAttributs = {
    id: '',
    libelle: '',
    ordre: 0,
    attributs: [],
  };
  attributTemp: IAttributs = {
    id: '',
    titre: '',
    description: '',
    etat: false,
    dateCreation: new Date(),
    dateModification: new Date(),
    valeurParDefaut: '',
    type_attribut: IType.Int,
  };

  // tableau contenant les categories creees a partir du premier tableau de la modal
  TABLE_CATEGORIE_AFFICHAGE_TEMP: ICategorieAffichage[] = [];
  tableResultatsCategoriesAffichage =
    new MatTableDataSource<ICategorieAffichage>(
      this.TABLE_CATEGORIE_AFFICHAGE_TEMP
    );

  tableauAttributsTemp: IAssociationCategorieAttributs[] = [];
  tableauIndexSelectionner = new Map();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private infosPath: ActivatedRoute,
    private serviceDocument: DocumentService,
    private serviceCategorieAttribut: CategorieAttributService,
    private serviceAttribut: AttributService,
    private donneeDocCatService: DonneesEchangeService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialogRef: MatDialogRef<ModalCategoriesComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formeCategorieAttribut = this.formBuilder.group({
      ordreCategorie: ['', [Validators.required, Validators.minLength(1)]],
      libelleCategorie: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    const savedCategories = this.donneeDocCatService.dataDocumentCategorie ?? [];
    const savedAttributs = this.donneeDocCatService.dataDocumentAttributs ?? [];

    this.TABLE_CATEGORIE_AFFICHAGE_TEMP = JSON.parse(JSON.stringify(savedCategories));
    this.tableResultatsCategoriesAffichage.data = [];
    this.TABLE_CATEGORIE_AFFICHAGE_TEMP.forEach((categorieAffiche) => {
      if (categorieAffiche.ordre != 100) {
        this.tableResultatsCategoriesAffichage.data.push(categorieAffiche);
      }
    });

    if (savedCategories.length > 0) {
      // Création du premier tableau si le deuxième n'est pas vide
      const listAtt: string[] = [];
      const listCatAtt: ICategorieAffichage[] = this.tableResultatsCategoriesAffichage.data;

      // récupération des ids des attributs déjà en catégorie
      listCatAtt.forEach((valeur) => {
        listAtt.push(valeur.attributCategories.attribut.id!);
      });

      // comparaison avec les ids du tableau initial pour exclure ceux présents dans le second
      this.tableauAttributsTemp = [];
      savedAttributs.forEach((att: IAttributs) => {
        if (!listAtt.includes(att.id!)) {
          const jointureAttCat: IAssociationCategorieAttributs = {
            ordre: 0,
            obligatoire: false,
            attribut: att,
          };
          this.tableauAttributsTemp.push(jointureAttCat);
        }
      });
      this.dataSourceAttributTemp = new MatTableDataSource<IAssociationCategorieAttributs>(this.tableauAttributsTemp);

      // suppression des éléments du second tableau si les attributs ont été retirés du tableau initial
      const filteredCategories: ICategorieAffichage[] = [];
      listCatAtt.forEach((attCat) => {
        if (savedAttributs.some((element: IAttributs) => element.id === attCat.attributCategories.attribut.id)) {
          filteredCategories.push(attCat);
        }
      });

      this.tableResultatsCategoriesAffichage = new MatTableDataSource<ICategorieAffichage>(filteredCategories);
      this.tableauIndexSelectionner = new Map();
      this.donneeDocCatService.dataDocumentCategorie = filteredCategories;
    } else {
      // Création du premier tableau si le deuxième est vide
      this.tableauAttributsTemp = this.creerTabAssociationCatAtr(savedAttributs);
    }

    this.dataSourceAttributTemp.data = this.tableauAttributsTemp;
  }

  creerTabAssociationCatAtr(tmpTab: any): IAssociationCategorieAttributs[] {
    this.tableauAttributsTemp = [];
    tmpTab = tmpTab ?? [];
    tmpTab.forEach((att: IAttributs) => {
      const jointureAttCat: IAssociationCategorieAttributs = {
        ordre: 0,
        obligatoire: false,
        attribut: att,
      };
      this.tableauAttributsTemp.push(jointureAttCat);
    });
    return this.tableauAttributsTemp;
  }

  /**
   * fonction qui permet d'ajouter des categories au check dans un tableau temporaire
   * avant des les enregistrer dans le deuxieme tableau de la modale
   * @param categorieAttributInput
   * @param attribut
   * @param index
   * @param event
   * @returns
   */
  selectionnerCategorieCheck(
    categorieAttributInput: any,
    attribut: any,
    index: number,
    event: any
  ) {
    this.validation = true;
    if (this.formeCategorieAttribut.invalid) return;

    //controle des doublons dans le premier tableau
    if (event.target.checked == true) {
      let ordreExist: boolean = this.verifierSiOrdreExistePremierTableau(
        attribut.ordre
      );
      if (ordreExist) {
        alert("interdit doublon d'ordre d'attribut");
        event.target.checked = false;
        return;
      }

      //controle des doublons dans le second tableau au check
      let ordreAttributExiste: number =
        this.verifierSiExisteCategorieAttributOrdre(
          attribut.ordre,
          categorieAttributInput.libelleCategorie,
          categorieAttributInput.ordreCategorie
        );
      if (ordreAttributExiste == 1) {
        alert("doublon d'ordre d'attribut interdit");
        event.target.checked = false;
        return;
      } else if (ordreAttributExiste == 2) {
        alert('Catégorie avec deux ordres différents interdit');
        event.target.checked = false;
        return;
      } else if (ordreAttributExiste == 3) {
        alert('Catégorie différente avec un ordre existant interdit');
        event.target.checked = false;
        return;
      } else {
        let categorieAttributsTemp: ICategorieAffichage = {
          // id optional
          nom: categorieAttributInput.libelleCategorie,
          ordre: categorieAttributInput.ordreCategorie,
          attributCategories: attribut,
        };

        this.tableauIndexSelectionner.set(index, categorieAttributsTemp);
      }
    } else if (event.target.checked == false) {
      //si pas de doublon, on sauvegarde l'information cochée
      this.tableauIndexSelectionner.delete(index);

    }
  }

  /**
   * vérifie que l'ordre de l'attribut nouvelle selectionnée n'existe pas dans le meme tableau
   * @param ordre
   * @returns
   */
  verifierSiOrdreExistePremierTableau(ordre: number): boolean {
    let tmpTab = this.tableauIndexSelectionner;
    let ordreAttributExiste = false;
    tmpTab.forEach((cat: ICategorieAffichage) => {
      if (cat.attributCategories.ordre == ordre) {
        ordreAttributExiste = true;
      }
    });
    return ordreAttributExiste;
  }

  /**
   * Methode qui permet de vérifier dans le second tableau si chaque catégorie a un ordre distinct
   * et si tous les attributs d'une même catégorie ont des ordres distincts
   * @param ordreAttribut
   * @param libelleCategorie
   * @param ordreCategorie
   * @returns
   */
  verifierSiExisteCategorieAttributOrdre(
    ordreAttribut: number,
    libelleCategorie: string,
    ordreCategorie: number
  ): number {
    let tmpTab = this.tableResultatsCategoriesAffichage.data;
    let ordreAttributExiste: number = 0;

    for (let index = 0; index < tmpTab.length; index++) {
      const element = tmpTab[index];
      if (element.nom.localeCompare(libelleCategorie) == 0) {
        //si deux attributs de la meme catégorie ont un meme ordre
        if (element.attributCategories.ordre == ordreAttribut) {
          ordreAttributExiste = 1;
          break;
        }
        //si la même catégorie a un ordre différent
        if (element.ordre != ordreCategorie) {
          ordreAttributExiste = 2;
          break;
        }
      } else {
        //si c'est une nouvelle catégorie dans le tableau
        if (element.ordre == ordreCategorie) {
          //si la même catégorie a un ordre différent
          ordreAttributExiste = 3;
          break;
        }
      }
    }
    return ordreAttributExiste;
  }

  AjouterCategorieTemp() {
    this.validation = true;
    if (this.formeCategorieAttribut.invalid) return;

    //Ajout des valeurs dans le second tableau

    this.TABLE_CATEGORIE_AFFICHAGE_TEMP =
      this.tableResultatsCategoriesAffichage.data;
    this.tableauIndexSelectionner.forEach((valeur, cle) => {
      this.TABLE_CATEGORIE_AFFICHAGE_TEMP.push(valeur);

    });
    this.tableResultatsCategoriesAffichage.data =
      this.TABLE_CATEGORIE_AFFICHAGE_TEMP;

    //récupération des id attributs selectionnés

    let listAtt: String[] = [];
    let listOrdre: number[] = [];
    this.tableauIndexSelectionner.forEach((valeur, cle) => {
      listAtt.push(valeur.attributCategories.attribut.id);
      listOrdre.push(valeur.attributCategories.attribut.ordre);
    });

    //construction du tableau résiduel

    this.tableauAttributsTemp = [];
    let tmpTab = this.dataSourceAttributTemp.data;
    tmpTab.forEach((att: IAssociationCategorieAttributs) => {
  if (!listAtt.includes(att.attribut.id!)) {
        this.tableauAttributsTemp.push(att);
      }
    });
    this.dataSourceAttributTemp =
      new MatTableDataSource<IAssociationCategorieAttributs>(
        this.tableauAttributsTemp
      );
    this.tableauIndexSelectionner = new Map();
  }

  /**
   * methode de suppression des categories deja enregistrees dans le deuxieme tableau
   * @param categorieAffichage
   * @param index
   */
  supprimerCategorieAffiche(
    categorieAffichage: ICategorieAffichage,
    index: number
  ) {
    //suppression des valeurs dans le second tableau

    this.TABLE_CATEGORIE_AFFICHAGE_TEMP =
      this.tableResultatsCategoriesAffichage.data;
    this.TABLE_CATEGORIE_AFFICHAGE_TEMP.splice(index, 1);
    this.tableResultatsCategoriesAffichage.data =
      this.TABLE_CATEGORIE_AFFICHAGE_TEMP;

    //construction du premier tableau
    this.tableauAttributsTemp.push(categorieAffichage.attributCategories);
    this.dataSourceAttributTemp =
      new MatTableDataSource<IAssociationCategorieAttributs>(
        this.tableauAttributsTemp
      );
    //suppression dans les index selectionnés
    let indexASupprimer: number = -1;
    this.tableauIndexSelectionner.forEach((valeur, cle) => {
      if (
        valeur.attribut.id == categorieAffichage.attributCategories.attribut.id
      )
        indexASupprimer = cle;
    });
    if (indexASupprimer >= 0)
      this.tableauIndexSelectionner.delete(indexASupprimer);
  }

  retirerSelectionCategorieAttribut(index: number) {
    this.TABLE_CATEGORIE_AFFICHAGE_TEMP.splice(index, 1);
  }

  ajouterCategorieParDefaut() {
    this.dataSourceAttributTemp.data.forEach((element) => {
      let categorieAttributs: ICategorieAffichage = {
        id: '',
        nom: 'Autres',
        ordre: 100,
        attributCategories: {
          ordre: 0,
          obligatoire: false,
          attribut: {
            id: '',
            titre: '',
            description: '',
            etat: false,
            valeurParDefaut: '',
            type_attribut: IType.Int,
          },
        },
      };
      categorieAttributs.attributCategories = element;
      this.TABLE_CATEGORIE_AFFICHAGE_TEMP.push(categorieAttributs);

      // ajout d'une categorie par defaut à la fermeture de la modale
      this.donneeDocCatService.dataDocumentCategorie =
        this.TABLE_CATEGORIE_AFFICHAGE_TEMP;
    });
  }
  // Sauvegarder les changements et fermer la boîte de dialogue
  onSave() {
    this.donneeDocCatService.dataDocumentCategorie = this.TABLE_CATEGORIE_AFFICHAGE_TEMP
  }

  get f() {
    return this.formeCategorieAttribut.controls;
  }
  private getAllAttributs() {
    return this.serviceAttribut.getAllAttributs();
  }
  isAttributeSelected(attributeId: string): boolean {
    return this.tableResultatsCategoriesAffichage.data.some(categorieAffiche => categorieAffiche.attributCategories.attribut.id === attributeId);
  }

  ngAfterViewInit() {
    this.dataSourceAttributTemp.paginator = this.paginator;
    this.dataSourceAttributTemp.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}

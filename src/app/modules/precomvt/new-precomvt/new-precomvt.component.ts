import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { EMPTY, Observable } from 'rxjs';

import { PrecoMvtsService } from 'src/app/services/precomvts/precomvts.service';
import { IPrecoMvt } from 'src/app/modele/precomvt';
import { IRessource } from 'src/app/modele/ressource';
import { IFamille } from 'src/app/modele/famille';
import { RessourcesService } from 'src/app/services/ressources/ressources.service';
import { FamillesService } from 'src/app/services/familles/familles.service';
import { IPrecoMvtQte } from 'src/app/modele/precomvtqte';
import { IDistributeur } from 'src/app/modele/distributeur';
import { DistributeursService } from 'src/app/services/distributeurs/distributeurs.service';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';

@Component({
  selector: 'app-new-precomvt',
  templateUrl: './new-precomvt.component.html',
  styleUrls: ['./new-precomvt.component.scss'],
})
export class NewPrecomvtComponent implements OnInit {
  LIBELLE_PRECO = 'Libelle : ';
  forme: FormGroup;
  submitted: boolean = false;
  //permet d'identifier la section du formulaire à ouvrir
  steps: any = 1;

  filteredOptions: IRessource[] | undefined;
  distributeurs$: Observable<IDistributeur[]> = EMPTY;
  familles$: Observable<IFamille[]> = EMPTY;
  typeMvt: string[] = [];

  //représente l'ensemble des éléments de précoMvtQte en cours de création
  eltsPreco: IPrecoMvt[] = [];
  eltsPrecoMvtQte: IPrecoMvtQte[] = [];
  //précise l'index de eltPreco qu'on souhaite modifier
  indexModification = -1;

  idPrecoMvt: string = '';

  //submitted=false;
  tabError: Map<String, String> = new Map();
  passStep2: boolean = false;
  passStep3: boolean = false;
  @ViewChild(FormGroupDirective)
  formDirective!: FormGroupDirective;
  titre: string = '';
  btnLibelle: string = 'Ajouter';
  constructor(
    private formBuilder: FormBuilder,
    private serviceFamille: FamillesService,
    private dataEnteteMenuService: DonneesEchangeService,
    private serviceDistributeur: DistributeursService,
    private precoMvtService: PrecoMvtsService,
    private serviceRessource: RessourcesService,
    private router: Router,
    private infosPath: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    const storedStep = sessionStorage.getItem('Etape courante');
    if (storedStep) {
      this.steps = parseInt(storedStep);
    }
    const storedEltPreco = sessionStorage.getItem('Preco');
    if (storedEltPreco) {
      this.eltsPreco = JSON.parse(storedEltPreco);
    }
    this.forme = this.formBuilder.group({
      id: new FormControl(),
      libelle: new FormControl(),
      type: new FormControl(),
      etat: new FormControl(),
      ressource: new FormControl<string | IRessource>(''),
      quantiteMin: new FormControl(),
      quantiteMax: new FormControl(),
      montantMin: new FormControl(),
      montantMax: new FormControl(),
      famille: new FormControl<string | IFamille[]>(''),
      distributeur: new FormControl<string | IDistributeur[]>(''),
    });
    this.dataEnteteMenuService.getTypeMvt().subscribe((x) => {
      this.typeMvt = x.type;
    });
  }

  ngOnInit(): void {
    this.familles$ = this.getAllFamilles();
    this.distributeurs$ = this.getAllDistributeurs();
    this.serviceRessource.getAllRessources().subscribe((reponse) => {
      this.filteredOptions = reponse;
    });

    //code autocompletion qui retourne les éléments du type déclaré
    this.forme.controls['ressource'].valueChanges.subscribe((value) => {
      const libelle = typeof value === 'string' ? value : value?.libelle;
      if (libelle != undefined && libelle?.length > 0) {
        this.serviceRessource
          .getRessourcesByLibelle(libelle.toLowerCase() as string)
          .subscribe((reponse) => {
            this.filteredOptions = reponse;
          });
      } else {
        this.serviceRessource.getAllRessources().subscribe((reponse) => {
          this.filteredOptions = reponse;
        });
      }
    });
    let idPrecoMvt = this.infosPath.snapshot.paramMap.get('idPrecoMvt');
    if (idPrecoMvt != null && idPrecoMvt !== '') {
      // Si une préconisation existe déjà, on la recharge puis on la reconstruit
      // sous forme de lignes dans le tableau de droite pour permettre l'édition.
      this.precoMvtService
        .getPrecomvtById(idPrecoMvt)
        .subscribe((PrecoMvtCourant) => {
          //premier elt du tableau
          this.eltsPreco = [];

          let premvtqte: IPrecoMvtQte = {
            ressource: undefined,
            quantiteMax: 0,
            quantiteMin: 0,
            montantMax: 0,
            montantMin: 0,
            distributeurs: [],
          };
          let precoMvtTemp: IPrecoMvt = {
            id: PrecoMvtCourant.id,
            etat: PrecoMvtCourant.etat,
            libelle: this.LIBELLE_PRECO + PrecoMvtCourant.libelle,
            typeMouvement: PrecoMvtCourant.typeMouvement,
            precoMouvementsQtes: [],
          };

          precoMvtTemp.precoMouvementsQtes.push(premvtqte);
          this.eltsPreco.push(precoMvtTemp);
          this.saveToSessionStorage();

          PrecoMvtCourant.precoMouvementsQtes.forEach((element) => {
            let precoMvtTemp: IPrecoMvt = {
              libelle: '',
              etat: true,
              typeMouvement: '',
              precoMouvementsQtes: [],
            };

            precoMvtTemp.precoMouvementsQtes.push(element);
            if (element.ressource != undefined && element.ressource != null) {
              let rsrce = ' Ressource :  ';
              const ressource = element.ressource!.libelle;
              rsrce = rsrce + ressource;

              precoMvtTemp.libelle = rsrce;
              this.eltsPreco.push(precoMvtTemp);
              this.saveToSessionStorage();
            } else if (element.famille != null && element.famille.length > 0) {
              precoMvtTemp.libelle = this.mettre3PointsdeSuspension(
                element.famille
              );
              this.eltsPreco.push(precoMvtTemp);
              this.saveToSessionStorage();
            }
          });
        });
        
      this.steps = 2;
    }
    this.titre = this.dataEnteteMenuService.dataEnteteMenu;
  }

  get formeControls(): any {
    return this.forme['controls'];
  }

  get f() {
    return this.forme.controls;
  }

  private getAllFamilles() {
    return this.serviceFamille.getAllFamilles();
  }

  private getAllDistributeurs() {
    return this.serviceDistributeur.getAllDistributeurs();
  }
  /**
 *methode qui nous retient sur l'interface 1 si elle n'est pas enregistrée dans
 le tableau de droite
 * @param numbre valeur qui va etre affecté à la variable steps
 * pour pouvoir basculé sur l'interface 2 ou 3
 *
 */
  blocklibelle(numbre: number) {
    if (this.steps != 1) {
      this.steps = numbre;
    }
    this.saveStepToSession();
  }
  /**
   *
   */
  enregistrerPreco() {
    // On reconstruit la liste des lignes à envoyer au backend à partir du tableau de droite.
    // L'élément d'en-tête (index 0) est utilisé uniquement comme conteneur du libellé et du type.
    const qtes = this.eltsPreco
      .slice(1)
      .map((valeur) => valeur.precoMouvementsQtes?.[0])
      .filter((qte): qte is IPrecoMvtQte => Boolean(qte));

    if (qtes.length === 0) {
      alert('vous devez enregistrer au moins une ressource ou une famille');
      return;
    }

    let precomvtTemp: IPrecoMvt = {
      id: this.eltsPreco[0]?.id,
      etat: this.eltsPreco[0]?.etat,
      libelle: this.eltsPreco[0]?.libelle.replace(this.LIBELLE_PRECO, ''),
      typeMouvement: this.eltsPreco[0]?.typeMouvement,
      precoMouvementsQtes: [],
    };
    this.saveToSessionStorage();

    if (this.eltsPreco[0]?.id != null && this.eltsPreco[0]?.id != '')
      precomvtTemp.id = this.eltsPreco[0].id;

    precomvtTemp.precoMouvementsQtes = qtes;

    this.precoMvtService.ajouterPrecomvt(precomvtTemp).subscribe((object) => {
      this.router.navigate(['parcours/preconisations/list-precomvts']);
    });
  }
  //fonction onSubmit fin

  //début fonction afficher message d'erreur
  validerControleStep(etape: number, valeurs: any) {
    let controleVerif = true;
    //controle sur l'étape courante
    if (this.steps == 1) {
      let valLibelle: string = this.forme.controls['libelle'].value;
      let valLibel = valLibelle;
      if (valLibelle != null && valLibelle.length > 0)
        valLibel = valLibelle.trimStart().trimEnd();
      if (valLibel == null || valLibel == '' || valLibel.length < 2) {
        controleVerif = false;
        this.tabError.set('libelle', 'Taille doit etre supérieure à 2');
      }
      let valType: string = this.forme.controls['type'].value;
      //let valType = valType.trimStart().trimEnd();
      if (valType == null || valType == '') {
        controleVerif = false;
        this.tabError.set('type', 'Le type doit avoir une valeur');
      }
      this.saveToSessionStorage();
    } else {
      if (this.steps == 2) {
        let valFamille: string[] = this.forme.controls['famille'].value;
        if (valFamille == null || valFamille.length == 0) {
          controleVerif = false;
          this.tabError.set(
            'famille',
            'Une famille au moins doit être selectionnée'
          );
        }
        this.saveToSessionStorage();
      } else if (this.steps == 3) {
        let valRessource: string = this.forme.controls['ressource'].value;

        if (
          valRessource == null ||
          valRessource == '' ||
          valRessource.length < 0
        ) {
          controleVerif = false;
          this.tabError.set('ressource', 'Une ressource est obligatoire');
        }
        this.saveToSessionStorage();
      }
      //controle commun ie montantMin et MontantMax
      if (this.steps == 2 || this.steps == 3) {
        let valMontantMin: number = this.forme.controls['montantMin'].value;

        if (valMontantMin == null || valMontantMin < 0) {
          controleVerif = false;
          this.tabError.set('montantMin', 'Montant Min est obligatoire');
        }
        let valMontantMax: number = this.forme.controls['montantMax'].value;

        if (valMontantMax == null || valMontantMax < 0) {
          controleVerif = false;
          this.tabError.set('montantMax', 'Montant Max est  obligatoire');
        }
        if (valMontantMin > valMontantMax) {
          controleVerif = false;
          this.tabError.set(
            'montantMinMax',
            'Montant Max doit être supérieur au montant Min'
          );
        }

        let valQuantiteMin: number = this.forme.controls['quantiteMin'].value;

        if (valQuantiteMin == null || valQuantiteMin < 0) {
          controleVerif = false;
          this.tabError.set('quantiteMin', 'Quantite Min est obligatoire');
        }

        let valQuantiteMax: number = this.forme.controls['quantiteMax'].value;

        if (valQuantiteMax == null || valQuantiteMax < 0) {
          controleVerif = false;
          this.tabError.set('quantiteMax', 'Quantite Max est obligatoire');
        }
        if (valQuantiteMin > valQuantiteMax) {
          controleVerif = false;
          this.tabError.set(
            'quantiteMinMax',
            'Quantite Max doit être supérieur à Quantite Min'
          );
        }
      }
    }
    if (controleVerif) {
      const nextStep = this.steps === 1 ? 2 : this.steps;
      this.steps = nextStep;
        // NOTE (modification): avant d'ajouter/modifier la ligne du tableau, on normalise
        // les distributeurs fournis par le formulaire pour conserver une structure
        // cohérente (propriété canonique `distributeur`) dans les éléments du tableau.
        this.enregistrerValeurPrecomvtqte(valeurs);
    }
    this.saveStepToSession();
  }
  //début fonction afficher message d'erreur

  //Suppression d'un element dans le boitier début
  supprimerElt(element: IPrecoMvt) {
    this.eltsPreco.forEach((value, index) => {
      if (value == element) this.eltsPreco.splice(index, 1);
    });
    this.saveToSessionStorage();
  }
  //Suppression d'un element dans le boitier fin

  displayFn(ressource: IRessource): string {
    return ressource && ressource.libelle ? ressource.libelle : '';
  }

  // NOTE (modification): méthode ajoutée pour formater l'affichage des distributeurs
  // dans la vue du tableau de droite. Cette méthode centralise le formatage afin
  // d'éviter des expressions complexes dans le template et d'assurer la compatibilité
  // en utilisant la propriété canonique `distributeur` (acceptation rétrocompatible
  // avec `distributeurs` si présent dans des données plus anciennes).
  getDistributeurLabel(elt: IPrecoMvt): string {
    // Normaliser directement depuis la ligne (préférer `distributeur`).
    const qte0 = elt.precoMouvementsQtes?.[0] as any;
    let raw = qte0?.distributeur ?? qte0?.distributeurs ?? [];
    const distributeurs = Array.isArray(raw) ? raw : raw ? [raw] : [];

    if (distributeurs.length === 0) {
      return 'Aucun';
    }

    return distributeurs
      .map((distributeur) => distributeur?.raisonSociale || distributeur?.id)
      .filter((value): value is string => Boolean(value))
      .join(', ');
  }

  reset(): void {
    this.forme.reset();
    //reset de l'index pour laisser le choix à l'utilisateur de remplir des nouvelles precoMvtQte
    this.indexModification = -1;
  }

  /**
   * Permet de sauvegarder l'enchainement des precoMvtQte chacune dans une precoMvt
   * @param precomvtqteInput
   * @returns
   */
  // NOTE (modification): Cette méthode assemble le payload à partir des valeurs
  // du formulaire et normalise explicitement la(s) valeur(s) `distributeur` afin
  // de toujours attacher un tableau d'`IDistributeur` aux lignes créées. Le champ
  // canonique utilisé est `distributeur` (tableau).
  enregistrerValeurPrecomvtqte(precomvtInput: any) {
    // On rassemble les valeurs du formulaire courant avant de les convertir en ligne
    // du tableau de droite, selon l'étape active du processus.
    // Normaliser la valeur `distributeur(s)` fournie par le formulaire
    const raw = precomvtInput?.distributeur ?? precomvtInput?.distributeurs ?? [];
    const distributeurs = Array.isArray(raw) ? raw : raw ? [raw] : [];

    // Payload contient la propriété canonique `distributeur` (tableau)
    const payload = {
      ...precomvtInput,
      distributeur: distributeurs,
      typeMouvement: this.getTypeMouvementValue(precomvtInput),
    };

    // Lorsque l'utilisateur modifie une ligne déjà présente, on remplace cette ligne
    // à l'index correspondant ; sinon on ajoute une nouvelle ligne au tableau.
    if (payload.libelle != null && payload.libelle != '') {
      if (this.indexModification == -1)
        //si vaut -1 alors création
        this.eltsPreco.push(this.creerPrecoMvtQteLibelle(payload));
      //si différent de -1 alors modification
      else
        this.eltsPreco[this.indexModification] =
          this.creerPrecoMvtQteLibelle(payload);
    } else if (
      payload.ressource != null &&
      payload.ressource != ''
    ) {
      if (this.indexModification == -1)
        this.eltsPreco.push(this.creerPrecoMvtQteRessource(payload));
      else
        this.eltsPreco[this.indexModification] =
          this.creerPrecoMvtQteRessource(payload);
    } else if (
      payload.famille != null &&
      payload.famille.length > 0
    ) {
      if (this.indexModification == -1)
        this.eltsPreco.push(this.creerPrecoMvtQteFamille(payload));
      else
        this.eltsPreco[this.indexModification] =
          this.creerPrecoMvtQteFamille(payload);
    }

    this.reset();
    this.saveToSessionStorage();
  } //fonction valPrecomvtqte fin

  /**
   * retrouve l'index du tableau eltPreco pour l'afficher dans la partie gauche
   * @param i
   */
  chargerValeurPrecoMvt(i: number): void {
    // On réinitialise le formulaire puis on charge les données de la ligne sélectionnée
    // dans le formulaire afin de permettre une modification directe.
    this.reset();

    this.indexModification = i;
    let precoTmp = this.eltsPreco[i];
    //l'index 0 correspond toujours au premier écran de precoMvt
    if (i == 0) {
      this.steps = 1;
      this.forme.controls['libelle'].setValue(
        precoTmp.libelle.replace(this.LIBELLE_PRECO, '')
      );
      this.forme.controls['type'].setValue(precoTmp.typeMouvement);
      this.forme.controls['etat'].setValue(precoTmp.etat);
      //ajouter un unique champ caché id pour conserver l'id en cas modification
      this.forme.controls['id'].setValue(precoTmp.id);
    }
    //si ressource absente de précoMvtQt alors par élimitation c'est une famille
    else if (
      precoTmp.precoMouvementsQtes[0].ressource != undefined &&
      precoTmp.precoMouvementsQtes[0].ressource != null
    ) {
      this.steps = 3;
      this.forme.controls['ressource'].setValue(
        precoTmp.precoMouvementsQtes[0].ressource
      );
      this.forme.controls['id'].setValue(precoTmp.precoMouvementsQtes[0].id);
      this.forme.controls['montantMax'].setValue(
        precoTmp.precoMouvementsQtes[0].montantMax
      );
      this.forme.controls['montantMin'].setValue(
        precoTmp.precoMouvementsQtes[0].montantMin
      );
      this.forme.controls['quantiteMax'].setValue(
        precoTmp.precoMouvementsQtes[0].quantiteMax
      );
      this.forme.controls['quantiteMin'].setValue(
        precoTmp.precoMouvementsQtes[0].quantiteMin
      );
      // NOTE (modification): on recharge la sélection des distributeurs en
      // normalisant la valeur depuis la ligne (préférer `distributeur`, tolérance
      // pour `distributeurs` présent dans d'anciennes données).
      // Normaliser la valeur `distributeur(s)` provenant de la ligne
      const qte1 = precoTmp.precoMouvementsQtes[0] as any;
      const rawD1 = qte1?.distributeur ?? qte1?.distributeurs ?? [];
      const distribs1 = Array.isArray(rawD1) ? rawD1 : rawD1 ? [rawD1] : [];
      this.forme.controls['distributeur'].setValue(distribs1);
    } else if (
      precoTmp.precoMouvementsQtes[0].famille != undefined &&
      precoTmp.precoMouvementsQtes[0].famille != null &&
      precoTmp.precoMouvementsQtes[0].famille.length > 0
    ) {
      this.steps = 2;
      this.forme.controls['famille'].setValue(precoTmp.precoMouvementsQtes[0].famille);
      //this.famille.setValue(precoTmp.precoMouvementsQtes[0].famille);
      this.forme.controls['id'].setValue(precoTmp.precoMouvementsQtes[0].id);
      this.forme.controls['montantMax'].setValue(
        precoTmp.precoMouvementsQtes[0].montantMax
      );
      this.forme.controls['montantMin'].setValue(
        precoTmp.precoMouvementsQtes[0].montantMin
      );
      this.forme.controls['quantiteMax'].setValue(
        precoTmp.precoMouvementsQtes[0].quantiteMax
      );
      this.forme.controls['quantiteMin'].setValue(
        precoTmp.precoMouvementsQtes[0].quantiteMin
      );
      // NOTE (modification): idem pour les lignes de type 'famille' : restauration
      // des distributeurs dans le formulaire à partir de la ligne sélectionnée.
      // Normaliser la valeur `distributeur(s)` provenant de la ligne
      const qte2 = precoTmp.precoMouvementsQtes[0] as any;
      const rawD2 = qte2?.distributeur ?? qte2?.distributeurs ?? [];
      const distribs2 = Array.isArray(rawD2) ? rawD2 : rawD2 ? [rawD2] : [];
      this.forme.controls['distributeur'].setValue(distribs2);
    }
    this.saveToSessionStorage();
  }

  /**
   * a partir des inputs html on crée un occurrence de PrecoMvt
   * @param precomvtInput
   * @returns
   */
  // NOTE (modification): Lors de la création d'une ligne famille, on récupère
  // et normalise les distributeurs provenant du formulaire et on les attache
  // à la structure `IPrecoMvtQte` sous la clé canonique `distributeur` afin
  // d'assurer la persistance et la compatibilité.
  creerPrecoMvtQteFamille(precomvtInput: any): IPrecoMvt {
    // Normaliser la sélection des distributeurs fournie par le formulaire
    const rawD = precomvtInput?.distributeur ?? precomvtInput?.distributeurs ?? [];
    const distributeurs = Array.isArray(rawD) ? rawD : rawD ? [rawD] : [];
    let premvtqte: IPrecoMvtQte = {
      famille: precomvtInput.famille,
      quantiteMax: precomvtInput.quantiteMax,
      quantiteMin: precomvtInput.quantiteMin,
      montantMax: precomvtInput.montantMax,
      montantMin: precomvtInput.montantMin,
      distributeurs: distributeurs,
    };
    let libel = this.mettre3PointsdeSuspension(precomvtInput.famille);
    let precomvtTemp: IPrecoMvt = {
      // id optional
      etat: precomvtInput.etat,
      libelle: libel,
      typeMouvement: this.getTypeMouvementValue(precomvtInput),
      precoMouvementsQtes: [],
    };
    precomvtTemp.precoMouvementsQtes.push(premvtqte);
    return precomvtTemp;
  }

  /**
   * pour le libelle de la famille, sil est trop long mettre 3 point de suspension
   */
  mettre3PointsdeSuspension(tableauFamille: any): string {
    this.saveToSessionStorage();
    let libel = 'Familles : ';
    for (let index = 0; index < tableauFamille!.length; index++) {
      libel += tableauFamille![index].libelle + ', ';
    }
    libel = libel.substring(0, libel.length - 2);
    if (libel.length > 30) {
      libel = libel.substring(0, 30);
      libel = libel + '...';
    }
    return libel;
  }
  saveToSessionStorage(): void {
    // stocker eltsPreco dans sessionStorage
    sessionStorage.setItem('Preco', JSON.stringify(this.eltsPreco));
  }
  saveStepToSession(): void {
    sessionStorage.setItem('Etape courante', this.steps.toString());
  }

  /**
   * a partir des inputs html on crée un occurrence de PrecoMvt
   * uniquement pour le cas des ressources
   * @param precomvtInput
   * @returns
   */
  // NOTE (modification): idem pour les ressources — normalisation des
  // distributeurs et duplication des champs pour le backend.
  creerPrecoMvtQteRessource(precomvtInput: any): IPrecoMvt {
    const rawD = precomvtInput?.distributeur ?? precomvtInput?.distributeurs ?? [];
    const distributeurs = Array.isArray(rawD) ? rawD : rawD ? [rawD] : [];
    let premvtqte: IPrecoMvtQte = {
      ressource: precomvtInput.ressource,
      quantiteMax: precomvtInput.quantiteMax,
      quantiteMin: precomvtInput.quantiteMin,
      montantMax: precomvtInput.montantMax,
      montantMin: precomvtInput.montantMin,
      distributeurs: distributeurs,
      id: precomvtInput.id,
    };
    let precomvtTemp: IPrecoMvt = {
      id: precomvtInput.id,
      etat: precomvtInput.etat,
      libelle: 'Ressource : ' + precomvtInput.ressource.libelle,
      typeMouvement: this.getTypeMouvementValue(precomvtInput),
      precoMouvementsQtes: [],
    };
    precomvtTemp.precoMouvementsQtes.push(premvtqte);
    return precomvtTemp;
  }

  /**
   * a partir des inputs html on crée un occurrence de PrecoMvt
   * uniquement pour le step 1 (premier ecran)
   * @param precomvtInput
   * @returns
   */
  // NOTE (modification): pour l'élément d'en-tête (libellé) on conserve aussi
  // la sélection des distributeurs si fournie, pour cohérence avec les autres
  // lignes et pour que la soumission finale contienne l'information.
  creerPrecoMvtQteLibelle(precomvtInput: any): IPrecoMvt {
    const rawD = precomvtInput?.distributeur ?? precomvtInput?.distributeurs ?? [];
    const distributeurs = Array.isArray(rawD) ? rawD : rawD ? [rawD] : [];
    let premvtqte: IPrecoMvtQte = {
      ressource: undefined,
      quantiteMax: 0,
      quantiteMin: 0,
      montantMax: 0,
      montantMin: 0,
      // id: precomvtInput.id,
      distributeurs: distributeurs,
    };
    // use provided id if any, otherwise leave undefined (backend will assign)
    let precomvtTemp: IPrecoMvt = {
      id: precomvtInput.id ? precomvtInput.id : undefined,
      etat: precomvtInput.etat,
      libelle: this.LIBELLE_PRECO + precomvtInput.libelle,
      typeMouvement: this.getTypeMouvementValue(precomvtInput),
      precoMouvementsQtes: [],
    };
    precomvtTemp.precoMouvementsQtes.push(premvtqte);
    return precomvtTemp;
  }
  compareItem(famille1: IFamille, famille2: IFamille) {
    return famille2 && famille1
      ? famille2.id === famille1.id
      : famille2 === famille1;
  }
  compareItem1(distributeur1: IDistributeur, distributeur2: IDistributeur) {
    return distributeur2 && distributeur1
      ? distributeur2.id === distributeur1.id
      : distributeur2 === distributeur1;
  }
  ngOnDestroy(): void {
    // Reset le sessionStorage
    sessionStorage.removeItem('Preco');
    sessionStorage.removeItem('Etape courante');
  }
  onReturn() {
    this.router.navigate(['parcours/preconisations/list-precomvts']);
  }

  private getTypeMouvementValue(precomvtInput: any): string {
    return precomvtInput?.typeMouvement ?? precomvtInput?.type ?? '';
  }
}

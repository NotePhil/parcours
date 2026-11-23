import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AuthentificationService } from 'src/app/services/authentifications/authentification.service';
import { DonneesEchangeService } from 'src/app/services/donnees-echange/donnees-echange.service';
import { PassActionService } from 'src/app/services/actions-view/pass-action.service';
import { AccueilComponent } from './accueil.component';

describe('AccueilComponent', () => {
  let component: AccueilComponent;
  let fixture: ComponentFixture<AccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      declarations: [AccueilComponent],
      providers: [
        {
          provide: AuthentificationService,
          useValue: {
            currentUserValue: {
              user: { nom: 'Dupont', prenom: 'Jean' },
              groupe: { libelle: 'Admin', menu: [] },
            },
          },
        },
        {
          provide: DonneesEchangeService,
          useValue: {
            dataEnteteMenu: '',
            setUrlSource: () => {},
          },
        },
        {
          provide: PassActionService,
          useValue: {
            setActions: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and display current user name', () => {
    expect(component).toBeTruthy();
    expect(component.nomComplet).toBe('Jean Dupont');
  });
});

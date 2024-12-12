import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAjoutMontantCompteComponent } from './modal-ajout-montant-compte.component';

describe('ModalAjoutMontantCompteComponent', () => {
  let component: ModalAjoutMontantCompteComponent;
  let fixture: ComponentFixture<ModalAjoutMontantCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAjoutMontantCompteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAjoutMontantCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcartCaisseComponent } from './ecart-caisse.component';

describe('EcartCaisseComponent', () => {
  let component: EcartCaisseComponent;
  let fixture: ComponentFixture<EcartCaisseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcartCaisseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcartCaisseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

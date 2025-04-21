import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGrapheParcoursComponent } from './modal-graphe-parcours.component';

describe('ModalGrapheParcoursComponent', () => {
  let component: ModalGrapheParcoursComponent;
  let fixture: ComponentFixture<ModalGrapheParcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalGrapheParcoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGrapheParcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

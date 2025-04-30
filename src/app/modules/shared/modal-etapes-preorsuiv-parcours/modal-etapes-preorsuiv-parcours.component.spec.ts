import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEtapesPreorsuivParcoursComponent } from './modal-etapes-preorsuiv-parcours.component';

describe('ModalEtapesPreorsuivParcoursComponent', () => {
  let component: ModalEtapesPreorsuivParcoursComponent;
  let fixture: ComponentFixture<ModalEtapesPreorsuivParcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEtapesPreorsuivParcoursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEtapesPreorsuivParcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewParcoursComponent } from './new-parcours.component';

describe('NewParcoursComponent', () => {
  let component: NewParcoursComponent;
  let fixture: ComponentFixture<NewParcoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewParcoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewParcoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

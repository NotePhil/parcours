import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ModalCodebarreComponent } from './modal-codebarre.component';

describe('ModalCodebarreComponent', () => {
  let component: ModalCodebarreComponent;
  let fixture: ComponentFixture<ModalCodebarreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ModalCodebarreComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { multipleScan: false } },
        { provide: MatDialogRef, useValue: { close: () => {} } },
      ],
    });

    fixture = TestBed.createComponent(ModalCodebarreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

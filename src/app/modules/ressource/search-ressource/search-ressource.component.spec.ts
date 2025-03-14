import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRessourceComponent } from './search-ressource.component';

describe('SearchRessourceComponent', () => {
  let component: SearchRessourceComponent;
  let fixture: ComponentFixture<SearchRessourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchRessourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

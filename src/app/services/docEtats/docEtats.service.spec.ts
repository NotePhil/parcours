import { TestBed } from '@angular/core/testing';

import { DocEtatsService } from './docEtats.service';

describe('DocEtatsService', () => {
  let service: DocEtatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocEtatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


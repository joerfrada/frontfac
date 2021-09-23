import { TestBed } from '@angular/core/testing';

import { CuerpoService } from './cuerpo.service';

describe('CuerpoService', () => {
  let service: CuerpoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CuerpoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

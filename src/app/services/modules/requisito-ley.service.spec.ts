import { TestBed } from '@angular/core/testing';

import { RequisitoLeyService } from './requisito-ley.service';

describe('RequisitoLeyService', () => {
  let service: RequisitoLeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequisitoLeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

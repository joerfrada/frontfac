import { TestBed } from '@angular/core/testing';

import { ListaDinamicaService } from './lista-dinamica.service';

describe('ListaDinamicaService', () => {
  let service: ListaDinamicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaDinamicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

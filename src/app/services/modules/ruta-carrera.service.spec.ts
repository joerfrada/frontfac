import { TestBed } from '@angular/core/testing';

import { RutaCarreraService } from './ruta-carrera.service';

describe('RutaCarreraService', () => {
  let service: RutaCarreraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RutaCarreraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

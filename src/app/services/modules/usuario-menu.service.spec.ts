import { TestBed } from '@angular/core/testing';

import { UsuarioMenuService } from './usuario-menu.service';

describe('UsuarioMenuService', () => {
  let service: UsuarioMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

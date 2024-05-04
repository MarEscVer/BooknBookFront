import { TestBed } from '@angular/core/testing';

import { GeneroTipoService } from './genero-tipo.service';

describe('GeneroTipoService', () => {
  let service: GeneroTipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneroTipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

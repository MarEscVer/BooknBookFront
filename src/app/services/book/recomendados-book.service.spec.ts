import { TestBed } from '@angular/core/testing';

import { RecomendadosBookService } from './recomendados-book.service';

describe('RecomendadosBookService', () => {
  let service: RecomendadosBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecomendadosBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { NovedadesBookService } from './novedades-book.service';

describe('NovedadesBookService', () => {
  let service: NovedadesBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovedadesBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

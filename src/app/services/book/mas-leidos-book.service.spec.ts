import { TestBed } from '@angular/core/testing';

import { MasLeidosBookService } from './mas-leidos-book.service';

describe('MasLeidosBookService', () => {
  let service: MasLeidosBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasLeidosBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

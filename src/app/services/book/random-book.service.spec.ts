import { TestBed } from '@angular/core/testing';

import { RandomBookService } from './random-book.service';

describe('RandomBookService', () => {
  let service: RandomBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

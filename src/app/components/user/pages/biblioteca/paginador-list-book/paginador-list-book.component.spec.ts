import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadorListBookComponent } from './paginador-list-book.component';

describe('PaginadorListBookComponent', () => {
  let component: PaginadorListBookComponent;
  let fixture: ComponentFixture<PaginadorListBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginadorListBookComponent]
    });
    fixture = TestBed.createComponent(PaginadorListBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

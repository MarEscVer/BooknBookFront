import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookCardComponent } from './list-book-card.component';

describe('ListBookCardComponent', () => {
  let component: ListBookCardComponent;
  let fixture: ComponentFixture<ListBookCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBookCardComponent]
    });
    fixture = TestBed.createComponent(ListBookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBookLecturaComponent } from './list-book-lectura.component';

describe('ListBookLecturaComponent', () => {
  let component: ListBookLecturaComponent;
  let fixture: ComponentFixture<ListBookLecturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBookLecturaComponent]
    });
    fixture = TestBed.createComponent(ListBookLecturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

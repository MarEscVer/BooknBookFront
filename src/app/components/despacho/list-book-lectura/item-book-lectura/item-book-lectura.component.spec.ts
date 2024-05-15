import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBookLecturaComponent } from './item-book-lectura.component';

describe('ItemBookLecturaComponent', () => {
  let component: ItemBookLecturaComponent;
  let fixture: ComponentFixture<ItemBookLecturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemBookLecturaComponent]
    });
    fixture = TestBed.createComponent(ItemBookLecturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

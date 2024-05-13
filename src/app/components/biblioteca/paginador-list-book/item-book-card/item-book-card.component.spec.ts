import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBookCardComponent } from './item-book-card.component';

describe('ItemBookCardComponent', () => {
  let component: ItemBookCardComponent;
  let fixture: ComponentFixture<ItemBookCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemBookCardComponent]
    });
    fixture = TestBed.createComponent(ItemBookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

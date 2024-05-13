import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemClubListAllComponent } from './item-club-list-all.component';

describe('ItemClubListAllComponent', () => {
  let component: ItemClubListAllComponent;
  let fixture: ComponentFixture<ItemClubListAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemClubListAllComponent]
    });
    fixture = TestBed.createComponent(ItemClubListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

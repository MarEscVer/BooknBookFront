import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemClubListComponent } from './user-item-club-list.component';

describe('UserItemClubListComponent', () => {
  let component: UserItemClubListComponent;
  let fixture: ComponentFixture<UserItemClubListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserItemClubListComponent]
    });
    fixture = TestBed.createComponent(UserItemClubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClubListComponent } from './user-club-list.component';

describe('UserClubListComponent', () => {
  let component: UserClubListComponent;
  let fixture: ComponentFixture<UserClubListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserClubListComponent]
    });
    fixture = TestBed.createComponent(UserClubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

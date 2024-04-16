import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageClubsComponent } from './admin-page-clubs.component';

describe('AdminPageClubsComponent', () => {
  let component: AdminPageClubsComponent;
  let fixture: ComponentFixture<AdminPageClubsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageClubsComponent]
    });
    fixture = TestBed.createComponent(AdminPageClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

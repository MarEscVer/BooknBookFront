import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageModeracionComponent } from './admin-page-moderacion.component';

describe('AdminPageModeracionComponent', () => {
  let component: AdminPageModeracionComponent;
  let fixture: ComponentFixture<AdminPageModeracionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageModeracionComponent]
    });
    fixture = TestBed.createComponent(AdminPageModeracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

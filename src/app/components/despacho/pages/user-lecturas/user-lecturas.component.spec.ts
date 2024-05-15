import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLecturasComponent } from './user-lecturas.component';

describe('UserLecturasComponent', () => {
  let component: UserLecturasComponent;
  let fixture: ComponentFixture<UserLecturasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLecturasComponent]
    });
    fixture = TestBed.createComponent(UserLecturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

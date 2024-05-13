import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserValoracionModalComponent } from './user-valoracion-modal.component';

describe('UserValoracionModalComponent', () => {
  let component: UserValoracionModalComponent;
  let fixture: ComponentFixture<UserValoracionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserValoracionModalComponent]
    });
    fixture = TestBed.createComponent(UserValoracionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

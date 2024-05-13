import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserValoracionButtonComponent } from './user-valoracion-button.component';

describe('UserValoracionButtonComponent', () => {
  let component: UserValoracionButtonComponent;
  let fixture: ComponentFixture<UserValoracionButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserValoracionButtonComponent]
    });
    fixture = TestBed.createComponent(UserValoracionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

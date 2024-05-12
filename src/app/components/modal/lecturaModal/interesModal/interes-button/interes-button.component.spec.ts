import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteresButtonComponent } from './interes-button.component';

describe('InteresButtonComponent', () => {
  let component: InteresButtonComponent;
  let fixture: ComponentFixture<InteresButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InteresButtonComponent]
    });
    fixture = TestBed.createComponent(InteresButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

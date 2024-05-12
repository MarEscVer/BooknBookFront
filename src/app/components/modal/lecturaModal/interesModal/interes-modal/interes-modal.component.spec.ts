import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteresModalComponent } from './interes-modal.component';

describe('InteresModalComponent', () => {
  let component: InteresModalComponent;
  let fixture: ComponentFixture<InteresModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InteresModalComponent]
    });
    fixture = TestBed.createComponent(InteresModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

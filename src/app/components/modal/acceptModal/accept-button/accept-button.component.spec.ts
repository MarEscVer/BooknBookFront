import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptButtonComponent } from './accept-button.component';

describe('AcceptButtonComponent', () => {
  let component: AcceptButtonComponent;
  let fixture: ComponentFixture<AcceptButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptButtonComponent]
    });
    fixture = TestBed.createComponent(AcceptButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

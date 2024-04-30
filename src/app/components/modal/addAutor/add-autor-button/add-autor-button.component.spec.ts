import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAutorButtonComponent } from './add-autor-button.component';

describe('AddAutorButtonComponent', () => {
  let component: AddAutorButtonComponent;
  let fixture: ComponentFixture<AddAutorButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAutorButtonComponent]
    });
    fixture = TestBed.createComponent(AddAutorButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

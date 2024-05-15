import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditValoracionButtonComponent } from './edit-valoracion-button.component';

describe('EditValoracionButtonComponent', () => {
  let component: EditValoracionButtonComponent;
  let fixture: ComponentFixture<EditValoracionButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditValoracionButtonComponent]
    });
    fixture = TestBed.createComponent(EditValoracionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

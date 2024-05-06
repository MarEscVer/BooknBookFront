import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoracionButtonComponent } from './valoracion-button.component';

describe('ValoracionButtonComponent', () => {
  let component: ValoracionButtonComponent;
  let fixture: ComponentFixture<ValoracionButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValoracionButtonComponent]
    });
    fixture = TestBed.createComponent(ValoracionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoracionModalComponent } from './valoracion-modal.component';

describe('ValoracionModalComponent', () => {
  let component: ValoracionModalComponent;
  let fixture: ComponentFixture<ValoracionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValoracionModalComponent]
    });
    fixture = TestBed.createComponent(ValoracionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionDesactivarModalComponent } from './confirmacion-desactivar-modal.component';

describe('ConfirmacionDesactivarModalComponent', () => {
  let component: ConfirmacionDesactivarModalComponent;
  let fixture: ComponentFixture<ConfirmacionDesactivarModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmacionDesactivarModalComponent]
    });
    fixture = TestBed.createComponent(ConfirmacionDesactivarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

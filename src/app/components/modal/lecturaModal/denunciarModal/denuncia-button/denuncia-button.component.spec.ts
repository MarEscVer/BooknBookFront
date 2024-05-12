import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenunciaButtonComponent } from './denuncia-button.component';

describe('DenunciaButtonComponent', () => {
  let component: DenunciaButtonComponent;
  let fixture: ComponentFixture<DenunciaButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DenunciaButtonComponent]
    });
    fixture = TestBed.createComponent(DenunciaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

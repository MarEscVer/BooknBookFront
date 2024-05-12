import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarSesionModalComponent } from './iniciar-sesion-modal.component';

describe('IniciarSesionModalComponent', () => {
  let component: IniciarSesionModalComponent;
  let fixture: ComponentFixture<IniciarSesionModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IniciarSesionModalComponent]
    });
    fixture = TestBed.createComponent(IniciarSesionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

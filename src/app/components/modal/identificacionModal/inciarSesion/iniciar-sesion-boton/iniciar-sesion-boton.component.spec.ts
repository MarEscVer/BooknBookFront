import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarSesionBotonComponent } from './iniciar-sesion-boton.component';

describe('IniciarSesionBotonComponent', () => {
  let component: IniciarSesionBotonComponent;
  let fixture: ComponentFixture<IniciarSesionBotonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IniciarSesionBotonComponent]
    });
    fixture = TestBed.createComponent(IniciarSesionBotonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

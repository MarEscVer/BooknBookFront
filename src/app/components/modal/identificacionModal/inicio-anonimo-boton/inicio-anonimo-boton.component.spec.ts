import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAnonimoBotonComponent } from './inicio-anonimo-boton.component';

describe('InicioAnonimoBotonComponent', () => {
  let component: InicioAnonimoBotonComponent;
  let fixture: ComponentFixture<InicioAnonimoBotonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioAnonimoBotonComponent]
    });
    fixture = TestBed.createComponent(InicioAnonimoBotonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

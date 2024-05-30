import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComentariosUsuarioComponent } from './list-comentarios-usuario.component';

describe('ListComentariosUsuarioComponent', () => {
  let component: ListComentariosUsuarioComponent;
  let fixture: ComponentFixture<ListComentariosUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComentariosUsuarioComponent]
    });
    fixture = TestBed.createComponent(ListComentariosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

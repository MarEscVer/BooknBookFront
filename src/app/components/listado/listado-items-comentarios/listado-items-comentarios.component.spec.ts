import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoItemsComentariosComponent } from './listado-items-comentarios.component';

describe('ListadoItemsComentariosComponent', () => {
  let component: ListadoItemsComentariosComponent;
  let fixture: ComponentFixture<ListadoItemsComentariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoItemsComentariosComponent]
    });
    fixture = TestBed.createComponent(ListadoItemsComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

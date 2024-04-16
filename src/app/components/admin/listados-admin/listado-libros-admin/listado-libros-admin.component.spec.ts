import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoLibrosAdminComponent } from './listado-libros-admin.component';

describe('ListadoLibrosAdminComponent', () => {
  let component: ListadoLibrosAdminComponent;
  let fixture: ComponentFixture<ListadoLibrosAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoLibrosAdminComponent]
    });
    fixture = TestBed.createComponent(ListadoLibrosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoUsuarioAdminComponent } from './listado-usuario-admin.component';

describe('ListadoUsuarioAdminComponent', () => {
  let component: ListadoUsuarioAdminComponent;
  let fixture: ComponentFixture<ListadoUsuarioAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoUsuarioAdminComponent]
    });
    fixture = TestBed.createComponent(ListadoUsuarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

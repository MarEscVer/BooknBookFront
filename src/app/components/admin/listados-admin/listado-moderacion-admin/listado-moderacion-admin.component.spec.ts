import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoModeracionAdminComponent } from './listado-moderacion-admin.component';

describe('ListadoModeracionAdminComponent', () => {
  let component: ListadoModeracionAdminComponent;
  let fixture: ComponentFixture<ListadoModeracionAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoModeracionAdminComponent]
    });
    fixture = TestBed.createComponent(ListadoModeracionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

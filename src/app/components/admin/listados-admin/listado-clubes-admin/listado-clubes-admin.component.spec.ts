import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoClubesAdminComponent } from './listado-clubes-admin.component';

describe('ListadoClubesAdminComponent', () => {
  let component: ListadoClubesAdminComponent;
  let fixture: ComponentFixture<ListadoClubesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoClubesAdminComponent]
    });
    fixture = TestBed.createComponent(ListadoClubesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

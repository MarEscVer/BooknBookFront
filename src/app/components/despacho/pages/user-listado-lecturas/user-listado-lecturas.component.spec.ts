import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListadoLecturasComponent } from './user-listado-lecturas.component';

describe('UserListadoLecturasComponent', () => {
  let component: UserListadoLecturasComponent;
  let fixture: ComponentFixture<UserListadoLecturasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserListadoLecturasComponent]
    });
    fixture = TestBed.createComponent(UserListadoLecturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

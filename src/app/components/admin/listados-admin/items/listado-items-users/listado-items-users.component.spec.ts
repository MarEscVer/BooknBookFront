import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoItemsUsersComponent } from './listado-items-users.component';

describe('ListadoItemsUsersComponent', () => {
  let component: ListadoItemsUsersComponent;
  let fixture: ComponentFixture<ListadoItemsUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoItemsUsersComponent]
    });
    fixture = TestBed.createComponent(ListadoItemsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

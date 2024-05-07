import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDesplegableItemComponent } from './menu-desplegable-item.component';

describe('MenuDesplegableItemComponent', () => {
  let component: MenuDesplegableItemComponent;
  let fixture: ComponentFixture<MenuDesplegableItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuDesplegableItemComponent]
    });
    fixture = TestBed.createComponent(MenuDesplegableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

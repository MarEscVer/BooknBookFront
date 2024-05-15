import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavDespachoComponent } from './sidenav-despacho.component';

describe('SidenavDespachoComponent', () => {
  let component: SidenavDespachoComponent;
  let fixture: ComponentFixture<SidenavDespachoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavDespachoComponent]
    });
    fixture = TestBed.createComponent(SidenavDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

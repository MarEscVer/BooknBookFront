import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoItemComponent } from './listado-item.component';

describe('ListadoItemComponent', () => {
  let component: ListadoItemComponent;
  let fixture: ComponentFixture<ListadoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoItemComponent]
    });
    fixture = TestBed.createComponent(ListadoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoracionTableItemComponent } from './valoracion-table-item.component';

describe('ValoracionTableItemComponent', () => {
  let component: ValoracionTableItemComponent;
  let fixture: ComponentFixture<ValoracionTableItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValoracionTableItemComponent]
    });
    fixture = TestBed.createComponent(ValoracionTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

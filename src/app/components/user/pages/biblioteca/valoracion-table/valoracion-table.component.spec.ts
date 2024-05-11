import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoracionTableComponent } from './valoracion-table.component';

describe('ValoracionTableComponent', () => {
  let component: ValoracionTableComponent;
  let fixture: ComponentFixture<ValoracionTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValoracionTableComponent]
    });
    fixture = TestBed.createComponent(ValoracionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

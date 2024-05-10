import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaLibroComponent } from './ficha-libro.component';

describe('FichaLibroComponent', () => {
  let component: FichaLibroComponent;
  let fixture: ComponentFixture<FichaLibroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichaLibroComponent]
    });
    fixture = TestBed.createComponent(FichaLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

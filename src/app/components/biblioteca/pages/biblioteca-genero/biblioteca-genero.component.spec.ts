import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaGeneroComponent } from './biblioteca-genero.component';

describe('BibliotecaGeneroComponent', () => {
  let component: BibliotecaGeneroComponent;
  let fixture: ComponentFixture<BibliotecaGeneroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BibliotecaGeneroComponent]
    });
    fixture = TestBed.createComponent(BibliotecaGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

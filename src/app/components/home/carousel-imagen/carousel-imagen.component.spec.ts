import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselImagenComponent } from './carousel-imagen.component';

describe('CarouselImagenComponent', () => {
  let component: CarouselImagenComponent;
  let fixture: ComponentFixture<CarouselImagenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselImagenComponent]
    });
    fixture = TestBed.createComponent(CarouselImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

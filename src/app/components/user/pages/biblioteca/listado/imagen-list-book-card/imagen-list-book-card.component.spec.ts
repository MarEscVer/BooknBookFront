import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenListBookCardComponent } from './imagen-list-book-card.component';

describe('ImagenListBookCardComponent', () => {
  let component: ImagenListBookCardComponent;
  let fixture: ComponentFixture<ImagenListBookCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagenListBookCardComponent]
    });
    fixture = TestBed.createComponent(ImagenListBookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

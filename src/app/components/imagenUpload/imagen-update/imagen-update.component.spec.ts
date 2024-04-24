import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenUpdateComponent } from './imagen-update.component';

describe('ImagenUpdateComponent', () => {
  let component: ImagenUpdateComponent;
  let fixture: ComponentFixture<ImagenUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagenUpdateComponent]
    });
    fixture = TestBed.createComponent(ImagenUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

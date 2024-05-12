import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechasButtonComponent } from './fechas-button.component';

describe('FechasButtonComponent', () => {
  let component: FechasButtonComponent;
  let fixture: ComponentFixture<FechasButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FechasButtonComponent]
    });
    fixture = TestBed.createComponent(FechasButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

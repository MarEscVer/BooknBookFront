import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechasModalComponent } from './fechas-modal.component';

describe('FechasModalComponent', () => {
  let component: FechasModalComponent;
  let fixture: ComponentFixture<FechasModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FechasModalComponent]
    });
    fixture = TestBed.createComponent(FechasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

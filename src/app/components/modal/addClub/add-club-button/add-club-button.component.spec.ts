import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClubButtonComponent } from './add-club-button.component';

describe('AddClubButtonComponent', () => {
  let component: AddClubButtonComponent;
  let fixture: ComponentFixture<AddClubButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddClubButtonComponent]
    });
    fixture = TestBed.createComponent(AddClubButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

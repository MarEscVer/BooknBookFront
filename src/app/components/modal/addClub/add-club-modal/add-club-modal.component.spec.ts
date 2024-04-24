import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClubModalComponent } from './add-club-modal.component';

describe('AddClubModalComponent', () => {
  let component: AddClubModalComponent;
  let fixture: ComponentFixture<AddClubModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddClubModalComponent]
    });
    fixture = TestBed.createComponent(AddClubModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

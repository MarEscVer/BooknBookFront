import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubListAllComponent } from './club-list-all.component';

describe('ClubListAllComponent', () => {
  let component: ClubListAllComponent;
  let fixture: ComponentFixture<ClubListAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClubListAllComponent]
    });
    fixture = TestBed.createComponent(ClubListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageAddBookComponent } from './admin-page-add-book.component';

describe('AdminPageAddBookComponent', () => {
  let component: AdminPageAddBookComponent;
  let fixture: ComponentFixture<AdminPageAddBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPageAddBookComponent]
    });
    fixture = TestBed.createComponent(AdminPageAddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

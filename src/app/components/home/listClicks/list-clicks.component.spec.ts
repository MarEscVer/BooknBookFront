import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClicksComponent } from './list-clicks.component';

describe('ListClicksComponent', () => {
  let component: ListClicksComponent;
  let fixture: ComponentFixture<ListClicksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListClicksComponent]
    });
    fixture = TestBed.createComponent(ListClicksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

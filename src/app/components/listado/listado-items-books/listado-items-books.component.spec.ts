import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoItemsBooksComponent } from './listado-items-books.component';

describe('ListadoItemsBooksComponent', () => {
  let component: ListadoItemsBooksComponent;
  let fixture: ComponentFixture<ListadoItemsBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoItemsBooksComponent]
    });
    fixture = TestBed.createComponent(ListadoItemsBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

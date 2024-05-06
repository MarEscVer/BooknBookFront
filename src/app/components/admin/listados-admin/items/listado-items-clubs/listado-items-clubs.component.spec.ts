import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoItemsClubsComponent } from './listado-items-clubs.component';

describe('ListadoItemsClubsComponent', () => {
  let component: ListadoItemsClubsComponent;
  let fixture: ComponentFixture<ListadoItemsClubsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoItemsClubsComponent]
    });
    fixture = TestBed.createComponent(ListadoItemsClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

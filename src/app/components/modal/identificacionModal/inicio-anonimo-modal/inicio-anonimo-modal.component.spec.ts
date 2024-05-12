import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAnonimoModalComponent } from './inicio-anonimo-modal.component';

describe('InicioAnonimoModalComponent', () => {
  let component: InicioAnonimoModalComponent;
  let fixture: ComponentFixture<InicioAnonimoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioAnonimoModalComponent]
    });
    fixture = TestBed.createComponent(InicioAnonimoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

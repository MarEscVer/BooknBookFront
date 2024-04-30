import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddAutorModalComponent } from '../add-autor-modal/add-autor-modal.component';

@Component({
  selector: 'app-add-autor-button',
  templateUrl: './add-autor-button.component.html',
  styleUrls: ['./add-autor-button.component.scss']
})
export class AddAutorButtonComponent implements OnDestroy {

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddAutorModalComponent);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

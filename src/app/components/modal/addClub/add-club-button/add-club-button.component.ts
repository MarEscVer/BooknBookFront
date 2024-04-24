import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddClubModalComponent } from '../add-club-modal/add-club-modal.component';

@Component({
  selector: 'app-add-club-button',
  templateUrl: './add-club-button.component.html',
  styleUrls: ['./add-club-button.component.scss']
})
export class AddClubButtonComponent implements OnDestroy {

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddClubModalComponent, {
      width: '50%'});
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

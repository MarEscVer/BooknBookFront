import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddClubModalComponent } from '../add-club-modal/add-club-modal.component';

@Component({
  selector: 'app-add-club-button',
  templateUrl: './add-club-button.component.html',
  styleUrls: ['./add-club-button.component.scss']
})
export class AddClubButtonComponent implements OnDestroy {

  @Input() clubId?: number;
  @Input() icono?: boolean = false;

  private subscriptions: Subscription = new Subscription();

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddClubModalComponent, {
      width: '100%',
      data: { clubId: this.clubId }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

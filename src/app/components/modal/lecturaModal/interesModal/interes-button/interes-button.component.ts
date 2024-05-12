import { Component, Input } from '@angular/core';
import { InteresModalComponent } from '../interes-modal/interes-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-interes-button',
  templateUrl: './interes-button.component.html',
  styleUrls: ['./interes-button.component.scss']
})
export class InteresButtonComponent {
  @Input() modalInfo?: Book;

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(InteresModalComponent, {
      width: '50%',
      data: {
        modalInfo: this.modalInfo
      }
    });
  }
}
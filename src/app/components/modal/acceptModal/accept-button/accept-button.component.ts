import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfo } from 'src/app/shared/models/modal/modal';
import { AcceptModalComponent } from '../accept-modal/accept-modal.component';

@Component({
  selector: 'app-accept-button',
  templateUrl: './accept-button.component.html',
  styleUrls: ['./accept-button.component.scss']
})
export class AcceptButtonComponent {

  @Input() modalInfo?: ModalInfo;

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AcceptModalComponent, {
      data: {
        modalInfo: this.modalInfo
      }
    });
  }
}

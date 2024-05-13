import { Component, Input } from '@angular/core';
import { FechasModalComponent } from '../fechas-modal/fechas-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfoPages } from 'src/app/shared/models/modal/modal';

@Component({
  selector: 'app-fechas-button',
  templateUrl: './fechas-button.component.html',
  styleUrls: ['./fechas-button.component.scss']
})
export class FechasButtonComponent {
  @Input() modalInfo!: ModalInfoPages;

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(FechasModalComponent, {
      width: '50%',
      data: {
        modalInfo: this.modalInfo
      }
    });
  }
}
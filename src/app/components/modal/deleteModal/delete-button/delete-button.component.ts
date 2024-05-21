import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfo } from 'src/app/shared/models/modal/modal';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent{

  @Input() modalInfo?: ModalInfo;
  @Input() deleteService: any;
  @Output() actionCompleted = new EventEmitter<void>();
  
  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {
        modalInfo: this.modalInfo,
        deleteService: this.deleteService
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.actionCompleted.emit();
      }
    });
  }

}


import { Component, EventEmitter, Inject, OnDestroy, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ModalInfo } from 'src/app/shared/models/modal/modal';
import { deleteObject } from 'src/app/services/interfaces';
import { IdComboResponse } from 'src/app/shared/models/combo/combo';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnDestroy {

  modalInfo: ModalInfo = {
    id: 0,
    title: ''
  };
  deleteService: any;
  usuario: boolean = false;

  @Output() actionCompleted = new EventEmitter<void>();
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: ModalInfo, deleteService: any, usuario: boolean },
    private dialogRef: MatDialogRef<DeleteModalComponent>,
    private notification: NotificationService) {
    if (data && data.modalInfo && data.deleteService) {
      this.modalInfo = data.modalInfo;
      this.deleteService = data.deleteService;
      this.usuario = data.usuario;
    }
  }

  onConfirmClick(): void {
    if (this.usuario) {
      this.subscriptions.add(this.deleteService.deleteUser(this.modalInfo.title).subscribe({
        next: (data: IdComboResponse) => {
          if (data) {
            this.dialogRef.close(true);
            this.actionCompleted.emit();
            this.notification.show(data.message, 'success');
          }
        }
      }))
    } else {
      this.subscriptions.add(this.deleteService.delete(this.modalInfo.id).subscribe({
        next: (data: IdComboResponse) => {
          if (data) {
            this.dialogRef.close(true);
            this.actionCompleted.emit();
            this.notification.show(data.message, 'success');
          }
        }
      }));
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
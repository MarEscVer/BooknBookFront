import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ModalInfo } from 'src/app/shared/models/modal/modal';
import { deleteObject } from 'src/app/services/interfaces';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnDestroy{

  modalInfo: ModalInfo = {
    id: 0,
    title: ''
  };
  deleteService: any;

  /**
   * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: ModalInfo, deleteService: any },
    private dialogRef: MatDialogRef<DeleteModalComponent>) {

    if (data && data.modalInfo && data.deleteService) {
      this.modalInfo = data.modalInfo;
      this.deleteService = data.deleteService;
    }
  }

  //TODO comprobar que servicio instace of intrfaz --> servicio delete
  onConfirmClick(): void {

    //if(this.deleteService instanceof deleteObject)
    this.subscriptions.add(this.deleteService.delete(this.modalInfo.id).subscribe(() => {
      this.dialogRef.close(true);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
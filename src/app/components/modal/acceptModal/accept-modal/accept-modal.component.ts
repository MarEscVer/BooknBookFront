import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ComentarioService } from 'src/app/services/comentario/comentario.service';
import { ModalInfo } from 'src/app/shared/models/modal/modal';

@Component({
  selector: 'app-accept-modal',
  templateUrl: './accept-modal.component.html',
  styleUrls: ['./accept-modal.component.scss']
})
export class AcceptModalComponent implements OnDestroy{

  modalInfo: ModalInfo = {
    id: 0,
    title: ''
  };

  /**
 * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
 */
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: ModalInfo},
    private comentarioService: ComentarioService,
    private dialogRef: MatDialogRef<AcceptModalComponent>) {

    if (data && data.modalInfo) {
      this.modalInfo = data.modalInfo;
    }
  }

  onConfirmClick(): void {
    this.subscriptions.add(this.comentarioService.acceptComentario(this.modalInfo.id, "ACEPTADA").subscribe(() => {
      this.dialogRef.close(true);
    }));
  }

  public ngOnDestroy(): void{
    this.subscriptions.unsubscribe();
  }
}

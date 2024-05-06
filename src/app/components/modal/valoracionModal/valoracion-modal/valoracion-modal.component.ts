import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComentarioDenunciadoInfo } from 'src/app/shared/models/comentario/comentario';
import { ModalInfo } from 'src/app/shared/models/modal/modal';

@Component({
  selector: 'app-valoracion-modal',
  templateUrl: './valoracion-modal.component.html',
  styleUrls: ['./valoracion-modal.component.scss']
})
export class ValoracionModalComponent {

  modalInfo?: ComentarioDenunciadoInfo;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: ComentarioDenunciadoInfo},
    private dialogRef: MatDialogRef<ValoracionModalComponent>) {

    if (data && data.modalInfo) {
      this.modalInfo = data.modalInfo;
    }
  }
}

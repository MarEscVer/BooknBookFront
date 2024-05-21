import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComentarioResponse } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-valoracion-modal',
  templateUrl: './valoracion-modal.component.html',
  styleUrls: ['./valoracion-modal.component.scss']
})
export class ValoracionModalComponent {

  modalInfo!: ComentarioResponse;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: ComentarioResponse},
    private dialogRef: MatDialogRef<ValoracionModalComponent>) {

    if (data && data.modalInfo) {
      this.modalInfo = data.modalInfo;
    }
  }
}

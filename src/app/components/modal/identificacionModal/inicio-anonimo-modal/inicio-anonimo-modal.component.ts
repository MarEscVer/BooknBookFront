import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalInfo } from 'src/app/shared/models/modal/modal';

@Component({
  selector: 'app-inicio-anonimo-modal',
  templateUrl: './inicio-anonimo-modal.component.html',
  styleUrls: ['./inicio-anonimo-modal.component.scss']
})
export class InicioAnonimoModalComponent {

  modalInfo: ModalInfo = {
    id: 0,
    title: ''
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: ModalInfo},
    private dialogRef: MatDialogRef<InicioAnonimoModalComponent>) {

    if (data && data.modalInfo) {
      this.modalInfo = data.modalInfo;
    }
  }

}

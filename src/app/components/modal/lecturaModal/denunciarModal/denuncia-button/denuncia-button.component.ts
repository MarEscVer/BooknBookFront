import { Component, Input } from '@angular/core';
import { DenunciaModalComponent } from '../denuncia-modal/denuncia-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfoDenuciaComentario } from 'src/app/shared/models/modal/modal';

@Component({
  selector: 'app-denuncia-button',
  templateUrl: './denuncia-button.component.html',
  styleUrls: ['./denuncia-button.component.scss']
})
export class DenunciaButtonComponent {
  @Input() modalInfo!: ModalInfoDenuciaComentario;

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DenunciaModalComponent, {
      width: '50%',
      data: {
        modalInfo: this.modalInfo
      }
    });
  }
}
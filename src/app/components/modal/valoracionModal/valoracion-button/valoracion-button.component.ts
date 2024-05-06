import { Component, Input } from '@angular/core';
import { ValoracionModalComponent } from '../valoracion-modal/valoracion-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfo } from 'src/app/shared/models/modal/modal';
import { ComentarioDenunciadoInfo } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-valoracion-button',
  templateUrl: './valoracion-button.component.html',
  styleUrls: ['./valoracion-button.component.scss']
})
export class ValoracionButtonComponent {

  @Input() modalInfo?: ComentarioDenunciadoInfo;

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(ValoracionModalComponent, {
      data: {
        modalInfo: this.modalInfo
      }
    });
  }
}

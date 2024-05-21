import { Component, Input } from '@angular/core';
import { ValoracionModalComponent } from '../valoracion-modal/valoracion-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ComentarioResponse } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-valoracion-button',
  templateUrl: './valoracion-button.component.html',
  styleUrls: ['./valoracion-button.component.scss']
})
export class ValoracionButtonComponent {

  @Input() modalInfo?: ComentarioResponse;

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

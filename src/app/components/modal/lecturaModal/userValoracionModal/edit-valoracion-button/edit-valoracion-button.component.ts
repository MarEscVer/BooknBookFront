import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ValoracionData, ValoracionResponse } from 'src/app/shared/models/comentario/comentario';
import { UserValoracionModalComponent } from '../user-valoracion-modal/user-valoracion-modal.component';

@Component({
  selector: 'app-edit-valoracion-button',
  templateUrl: './edit-valoracion-button.component.html',
  styleUrls: ['./edit-valoracion-button.component.scss']
})
export class EditValoracionButtonComponent {
  @Input() modalInfo!: ValoracionResponse;
  @Input() titulo!: string;

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserValoracionModalComponent, {
      width: '50%',
      data: {
        modalInfo: this.modalInfo,
        titulo: this.titulo,
      }
    });
  }
}

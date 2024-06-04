import { Component, Input } from '@angular/core';
import { UserValoracionModalComponent } from '../user-valoracion-modal/user-valoracion-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ValoracionData, ValoracionResponse } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-user-valoracion-button',
  templateUrl: './user-valoracion-button.component.html',
  styleUrls: ['./user-valoracion-button.component.scss']
})
export class UserValoracionButtonComponent {
  @Input() modalInfo!: ValoracionResponse;
  @Input() titulo!: string;


  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserValoracionModalComponent, {
      width: '50%',
      data: {
        modalInfo: this.modalInfo,
        titulo: this.titulo
      }
    });
  }
}

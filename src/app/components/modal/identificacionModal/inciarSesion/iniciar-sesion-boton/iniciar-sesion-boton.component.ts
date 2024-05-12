import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IniciarSesionModalComponent } from '../iniciar-sesion-modal/iniciar-sesion-modal.component';
import { ModalInfo } from 'src/app/shared/models/modal/modal';
import { InicioAnonimoModalComponent } from '../../inicio-anonimo-modal/inicio-anonimo-modal.component';

@Component({
  selector: 'app-iniciar-sesion-boton',
  templateUrl: './iniciar-sesion-boton.component.html',
  styleUrls: ['./iniciar-sesion-boton.component.scss']
})
export class IniciarSesionBotonComponent {
  @Input() modalInfo?: ModalInfo;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<InicioAnonimoModalComponent>
  ) {
  }

  openDialog() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(IniciarSesionModalComponent, {
      width: '50%',
      data: {
        modalInfo: this.modalInfo
      }
    });
  }
}
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfo } from 'src/app/shared/models/modal/modal';
import { InicioAnonimoModalComponent } from '../inicio-anonimo-modal/inicio-anonimo-modal.component';

@Component({
  selector: 'app-inicio-anonimo-boton',
  templateUrl: './inicio-anonimo-boton.component.html',
  styleUrls: ['./inicio-anonimo-boton.component.scss']
})
export class InicioAnonimoBotonComponent {
  @Input() modalInfo?: ModalInfo;

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(InicioAnonimoModalComponent, {
      width: '50%',
      data: {
        modalInfo: this.modalInfo
      }
    });
  }
}
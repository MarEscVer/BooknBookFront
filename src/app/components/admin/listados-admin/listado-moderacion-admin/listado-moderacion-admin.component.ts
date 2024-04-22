import { Component } from '@angular/core';
import { ComentarioDenunciadoItemList } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-listado-moderacion-admin',
  templateUrl: './listado-moderacion-admin.component.html',
  styleUrls: ['./listado-moderacion-admin.component.scss']
})
export class ListadoModeracionAdminComponent {

    // MOCK DATA
    data: ComentarioDenunciadoItemList[] = [];

    constructor() {
      for (let i = 1; i <= 20; i++) {
        this.data.push({
          id: i,
          username: `user_${i}`,
          date: `Date${i}`,
          comentario: `comentario${i}`,
          razon: `razon${i}`,
        });
      }
    }
}

import { Component } from '@angular/core';
import { UserItemList } from 'src/app/shared/models/users/user';

@Component({
  selector: 'app-listado-usuario-admin',
  templateUrl: './listado-usuario-admin.component.html',
  styleUrls: ['./listado-usuario-admin.component.scss']
})
export class ListadoUsuarioAdminComponent {

  // MOCK DATA
  data: UserItemList[] = [];
  imagenPrueba: string = '';

  constructor() {
    for (let i = 1; i <= 20; i++) {
      this.data.push({
        id: i,
        img: this.imagenPrueba,
        username: `user_${i}`,
        name: `Name${i}`,
        surname1: `Surname${i}`,
        surname2: `Surname${i}`,
        email: `user${i}@example.com`,
        rol: i % 2 === 0 ? 'Admin' : 'User' // Alternar entre 'Admin' y 'User'
      });
    }
  }

}

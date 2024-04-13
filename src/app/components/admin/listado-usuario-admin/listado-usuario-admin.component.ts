import { Component } from '@angular/core';
import { ItemType } from 'src/app/shared/models/enum/itemtype';
import { UserItemList } from 'src/app/shared/models/users/user';

@Component({
  selector: 'app-listado-usuario-admin',
  templateUrl: './listado-usuario-admin.component.html',
  styleUrls: ['./listado-usuario-admin.component.scss']
})
export class ListadoUsuarioAdminComponent {
  itemType: ItemType = ItemType.User;
  //MOCK DATA
  users: UserItemList[] = [
    {
      id: 1,
      img: 'url_de_la_imagen1',
      username: 'john_doe',
      name: 'John',
      surname1: 'Doe',
      surname2: 'Smith',
      email: 'john@example.com',
      rol: 'Admin'
    },
    {
      id: 2,
      img: 'url_de_la_imagen2',
      username: 'alice_smith',
      name: 'Alice',
      surname1: 'Smith',
      surname2: 'Jones',
      email: 'alice@example.com',
      rol: 'User'
    },
  ]

   // Método para manejar la edición de un ítem
   editItem(item: any) {
      console.log("editado -->", item.username);
  }

  // Método para manejar la eliminación de un ítem
  deleteItem(item: any) {
    console.log("eliminado -->", item.username);
  }

}

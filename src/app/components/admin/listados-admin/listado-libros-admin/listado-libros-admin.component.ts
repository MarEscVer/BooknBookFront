import { Component } from '@angular/core';
import { BookItemList } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-listado-libros-admin',
  templateUrl: './listado-libros-admin.component.html',
  styleUrls: ['./listado-libros-admin.component.scss']
})
export class ListadoLibrosAdminComponent {
  // MOCK DATA
  data: BookItemList[] = [];

  constructor() {
    for (let i = 1; i <= 20; i++) {
      this.data.push({
        id: i,
        img: `url_de_la_imagen_${i}`,
        title: `Título ${i}`,
        author: `Autor ${i}`,
        tipe: `Tipo ${i}`,
        gender: `Género ${i}`,
        isbn: 1000000000000 + i,
        year: 2000 + i,
      });
    }
  }
}
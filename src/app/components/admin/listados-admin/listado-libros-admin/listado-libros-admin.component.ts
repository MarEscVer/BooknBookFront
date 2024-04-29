import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookItemList } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-listado-libros-admin',
  templateUrl: './listado-libros-admin.component.html',
  styleUrls: ['./listado-libros-admin.component.scss']
})
export class ListadoLibrosAdminComponent {
  // MOCK DATA
  data: BookItemList[] = [];
  imagenPrueba: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    for (let i = 1; i <= 20; i++) {
      this.data.push({
        id: i,
        img: this.imagenPrueba,
        title: `Título ${i}`,
        author: `Autor ${i}`,
        tipe: `Tipo ${i}`,
        gender: `Género ${i}`,
        year: 2000 + i,
      });
    }
  }

  agregarLibro(): void {
    //TODO redireccionar a add libro
    this.router.navigate(['/admin/book']);
  }

  agregarAutor(): void {
    //TODO redireccionar a add autor
    this.router.navigate(['/']);
  }
}
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { Book, BookItemCard } from 'src/app/shared/models/book/book';
import { sinDiacriticos } from 'src/app/shared/utils/acentos';

@Component({
  selector: 'app-item-book-card',
  templateUrl: './item-book-card.component.html',
  styleUrls: ['./item-book-card.component.scss'],
})
export class ItemBookCardComponent {

  @Input() libro!: BookItemCard;
  imgNoData: string = '/assets/img/iconoLibro.jpg';

  libroSeleccionado?: Book;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  fichaLibro(id: number) {
    //TODO GET LIBRO POR ID --> obtener BOOK completo
    // libroSeleccionado = MOCKDATA
    if (this.libroSeleccionado) {
      this.bookService.setLibro(this.libroSeleccionado);

      let genero: string = '';
      let titulo: string = this.libroSeleccionado.titulo.toLowerCase().replaceAll(' ', '-');

      if (this.libroSeleccionado.genero.nombre) {
        genero = this.libroSeleccionado.genero.nombre.toLowerCase();
      } else {
        genero = this.libroSeleccionado.tipo.nombre.toLowerCase();
      }

      this.router.navigate(['/biblioteca', sinDiacriticos(genero), sinDiacriticos(titulo)]);
    }
  }

}

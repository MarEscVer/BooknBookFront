import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { MasLeidosBookService } from 'src/app/services/book/mas-leidos-book.service';
import { Book } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.scss']
})
export class LibroComponent implements OnInit {

  libro?: Book;

  stars = [0, 1, 2, 3, 4];
  valoracionMedia: number = 0;

  //TODO VALORACION NECESITO
  contadorComentario: number = 0;

  constructor(
    public masLeidosBookService: MasLeidosBookService,
    private bookService: BookService,
  ) {}

  ngOnInit(): void {
    this.bookService.libroSeleccionado$.subscribe(libro => {
      this.libro = libro;
      if (this.libro) {
        this.valoracionMedia = this.libro.valoracionMedia ?? 0;
        this.contadorComentario = 20 ?? 0;
      }
    });
  }

  generarComentario() {

  }

}

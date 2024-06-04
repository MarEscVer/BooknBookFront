import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FechasModalComponent } from 'src/app/components/modal/lecturaModal/fechasModal/fechas-modal/fechas-modal.component';
import { BookService } from 'src/app/services/book/book.service';
import { Book, BookListadoLectura } from 'src/app/shared/models/book/book';
import { applyColors } from 'src/app/shared/models/combo/combo';
import { ValoracionData } from 'src/app/shared/models/comentario/comentario';
import { sinDiacriticos } from 'src/app/shared/utils/acentos';

@Component({
  selector: 'app-item-book-lectura',
  templateUrl: './item-book-lectura.component.html',
  styleUrls: ['./item-book-lectura.component.scss']
})
export class ItemBookLecturaComponent implements OnInit, OnDestroy {

  @Input() libro!: BookListadoLectura;
  @Input() estado?: string;

  libroSeleccionado?: Book;
  imgNoData: string = '/assets/img/iconoLibro.jpg';
  tipoStyle: any = {};
  generoStyle: any = {};

  modalInfo: ValoracionData = {
    id: 1,
  };

  /**
* Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
*/
  private subscriptions: Subscription = new Subscription();

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    if (this.libro) {
      const libroConColores = applyColors([this.libro])[0];
      this.libro = libroConColores;

      if (this.libro.tipo) {
        this.tipoStyle = {
          'background-color': '#' + this.libro.tipo.color,
          'color': 'black',
          'border-radius': '20px',
          'padding': '5px',
        };
        console.log('COLOR 1' + this.libro.tipo.color);
      }
      if (this.libro.genero) {
        this.generoStyle = {
          'background-color': '#' + this.libro.genero.color,
          'color': 'black',
          'border-radius': '5px',
          'padding': '5px',
        };
        console.log('COLOR 2' + this.libro.tipo.color);
      }
    }
  }

  fichaLibro(id: number) {
    this.subscriptions.add(
      this.bookService.getBookById(id).subscribe(data => {
        if (data) {
          this.libroSeleccionado = data;
          this.bookService.setLibro(this.libroSeleccionado);

          let genero: string = '';
          let titulo: string = this.libroSeleccionado.titulo.toLowerCase().replaceAll(' ', '-');

          if (this.libroSeleccionado.genero) {
            genero = this.libroSeleccionado.genero.nombre.toLowerCase().replaceAll(' ', '-');
          } else {
            genero = this.libroSeleccionado.tipo.nombre.toLowerCase().replaceAll(' ', '-');
          }

          this.router.navigate(['/biblioteca', sinDiacriticos(genero), sinDiacriticos(titulo)]);
        }
      })
    );
  }

  eliminarLibro(id: number) {

  }

  editarLectura(id: number) {
    //TODO GET VALORACION LIBRO PARA MANDARLO AL MODAL --> this.modalInfo --> PANTALLA USUARIO LECTURAS
    const dialogValoracion = this.dialog.open(FechasModalComponent, {
      width: '50%',
      data: {
        modalInfo: this.modalInfo,
        titulo: this.libro.titulo,
        pages: this.libro.id,
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

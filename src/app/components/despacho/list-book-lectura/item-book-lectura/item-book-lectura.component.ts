import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FechasModalComponent } from 'src/app/components/modal/lecturaModal/fechasModal/fechas-modal/fechas-modal.component';
import { BookService } from 'src/app/services/book/book.service';
import { UserService } from 'src/app/services/user/user.service';
import { Book, BookListadoLectura } from 'src/app/shared/models/book/book';
import { applyColors } from 'src/app/shared/models/combo/combo';
import { ValoracionResponse } from 'src/app/shared/models/comentario/comentario';
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
  coloresGeneroTipo: boolean = false;

  modalInfo?: ValoracionResponse;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    if (this.libro) {
      const libroConColores = applyColors([this.libro])[0];
      this.libro = libroConColores;

      if (this.libro.tipo) {
        this.tipoStyle = {
          'background-color': this.libro.tipo.color,
          'color': 'black',
          'border-radius': '20px',
          'padding': '5px',
        };
      }
      if (this.libro.genero) {
        this.generoStyle = {
          'background-color': this.libro.genero.color,
          'color': 'black',
          'border-radius': '5px',
          'padding': '5px',
        };
      }
      this.coloresGeneroTipo = true;
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
    if (this.estado) {
      this.subscriptions.add(
        this.usuarioService.vincularUsuarioLibro(this.libro.id, this.estado).subscribe({
          next: (valoracion) => {
            this.modalInfo = valoracion;
            this.abrirModalEditarLectura();
          }
        }));
    }
  }

  abrirModalEditarLectura() {
    const dialogValoracion = this.dialog.open(FechasModalComponent, {
      width: '50%',
      data: {
        modalInfo: this.modalInfo,
        titulo: this.libro.titulo,
        pages: this.libro.id,
        procedenciaModal: false
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FechasModalComponent } from 'src/app/components/modal/lecturaModal/fechasModal/fechas-modal/fechas-modal.component';
import { BookService } from 'src/app/services/book/book.service';
import { BookListadoLectura } from 'src/app/shared/models/book/book';
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
      this.tipoStyle = {
        'background-color': '#' + this.libro.tipo.color,
        'color': 'black',
        'border-radius': '20px',
        'padding': '5px',
      };

      this.generoStyle = {
        'background-color': '#' + this.libro.genero.color,
        'color': 'black',
        'border-radius': '5px',
        'padding': '5px',
      };
    }
  }
  
  fichaLibro(id: number) {
    //TODO GET LIBRO POR ID --> obtener BOOK completo

    if (this.libro) {
      //this.bookService.setLibro(this.libro);

      let genero: string = '';
      let titulo: string = this.libro.titulo.toLowerCase().replaceAll(' ', '-');

      if (this.libro.genero.nombre) {
        genero = this.libro.genero.nombre.toLowerCase();
      } else {
        genero = this.libro.tipo.nombre.toLowerCase();
      }

      this.router.navigate(['/biblioteca', sinDiacriticos(genero), sinDiacriticos(titulo)]);
    }
  }


  eliminarLibro(id: number) {
    
  }

  editarLectura(id: number) {
    //TODO GET VALORAICON LIBRO PARA MANDARLO AL MODAL --> this.modalInfo
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

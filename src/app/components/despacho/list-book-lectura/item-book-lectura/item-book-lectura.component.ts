import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookListadoLectura } from 'src/app/shared/models/book/book';

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

  /**
* Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
*/
  private subscriptions: Subscription = new Subscription();

  constructor() {

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

  eliminarLibro(id: number) {
    
  }

  editarLectura(id: number) {
    
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

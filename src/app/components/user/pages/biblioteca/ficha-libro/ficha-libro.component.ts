import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-ficha-libro',
  templateUrl: './ficha-libro.component.html',
  styleUrls: ['./ficha-libro.component.scss']
})
export class FichaLibroComponent implements OnInit {

  @Input() libro?: Book;
  stars = [0, 1, 2, 3, 4];
  valoracionMedia: number = 0;
  isExpanded: boolean = false;
  tipoStyle: any = {};
  generoStyle: any = {};

  constructor() { }

  ngOnInit(): void {
    if (this.libro) {
      this.valoracionMedia = this.libro.valoracionMedia ?? 0;
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

  toggleDescription() {
    this.isExpanded = !this.isExpanded;
  }

  //TODO LLAMAR AL MODAL DE SELECCIONAR ESTADO
  seleccionarEstado(){
    console.log('CAMBIAR ESTADO');
  }

}


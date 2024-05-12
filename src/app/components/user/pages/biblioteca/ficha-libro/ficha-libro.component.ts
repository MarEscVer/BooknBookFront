import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutorService } from 'src/app/services/autor/autor.service';
import { AutorData } from 'src/app/shared/models/autor/autor';
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

  autorSeleccionado: AutorData = {
    "id": 1,
    "imagen": "",
    "pseudonimo": "Patrick Rothfuss",
    "localidad": "Patrick Rothfuss",
    "biografia": "Patrick Rothfuss",
  }

  constructor(
    private autorService: AutorService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

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

  autorLibro(id: number) {
    //TODO GET AUTOR POR ID --> obtener LIBRO completo

    if(this.autorSeleccionado) {
      this.autorService.setAutor(this.autorSeleccionado);
      
      let autor: string = this.autorSeleccionado.pseudonimo.toLowerCase().replaceAll(' ', '-');

      this.router.navigate(['/biblioteca/autores/perfil', autor]);
    }

  }

  //TODO LLAMAR AL MODAL DE SELECCIONAR ESTADO
  seleccionarEstado() {
    console.log('CAMBIAR ESTADO');
  }

}


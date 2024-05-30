import { Component, Input, OnInit } from '@angular/core';
import { BookListadoLectura } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-list-book-lectura',
  templateUrl: './list-book-lectura.component.html',
  styleUrls: ['./list-book-lectura.component.scss']
})
export class ListBookLecturaComponent implements OnInit{

  libros: BookListadoLectura[] = [
    {
      id: 1,
      imagen: '',
      titulo: 'El Señor de los Anillos',
      saga: 'La Comunidad del Anillo',
      autor: 'J.R.R. Tolkien',
      descripcion: 'Una épica aventura en la tierra media.',
      genero: {
        "id": 1,
        "nombre": "ROMÁNTICA",
        "color": "FD9D9D"
      },
      tipo: {
        "id": 8,
        "nombre": "JUVENIL",
        "color": "ECCEC5"
      },
      paginasTotales: 1178,
      fechaInicio: '2023-01-01',
      fechaFinal: '2023-02-01',
      paginasLeidas: 1178,
    },
    {
      id: 2,
      imagen: '',
      titulo: 'Dune',
      saga: '',
      autor: 'Frank Herbert',
      descripcion: 'Una historia de ciencia ficción en un planeta desértico.',
      genero: {
        "id": 1,
        "nombre": "ROMÁNTICA",
        "color": "FD9D9D"
      },
      tipo: {
        "id": 8,
        "nombre": "JUVENIL",
        "color": "ECCEC5"
      },
      paginasTotales: 896,
      fechaInicio: '2023-02-15',
      fechaFinal: '2023-03-15',
      paginasLeidas: 896,
    },
    {
      id: 3,
      imagen: '',
      titulo: 'El Código Da Vinci',
      saga: 'Robert Langdon',
      autor: 'Dan Brown',
      descripcion: 'Un thriller de misterio que combina arte e historia.',
      genero: {
        "id": 1,
        "nombre": "ROMÁNTICA",
        "color": "FD9D9D"
      },
      tipo: {
        "id": 8,
        "nombre": "JUVENIL",
        "color": "ECCEC5"
      },
      paginasTotales: 689,
      fechaInicio: '2023-03-20',
      fechaFinal: '2023-04-10',
      paginasLeidas: 689,
    },
    {
      id: 4,
      imagen: '',
      titulo: 'Orgullo y Prejuicio',
      saga: '',
      autor: 'Jane Austen',
      descripcion: '',
      genero: {
        "id": 1,
        "nombre": "ROMÁNTICA",
        "color": "FD9D9D"
      },
      tipo: {
        "id": 8,
        "nombre": "JUVENIL",
        "color": "ECCEC5"
      },
      paginasTotales: 432,
      fechaInicio: '2023-04-15',
      fechaFinal: '2023-05-01',
      paginasLeidas: 432,
    },
    {
      id: 5,
      imagen: '',
      titulo: 'It',
      saga: '',
      autor: 'Stephen King',
      descripcion: '',
      genero: {
        "id": 1,
        "nombre": "ROMÁNTICA",
        "color": "FD9D9D"
      },
      tipo: {
        "id": 8,
        "nombre": "JUVENIL",
        "color": "ECCEC5"
      },
      paginasTotales: 1138,
      fechaInicio: '2023-05-10',
      fechaFinal: '2023-06-10',
      paginasLeidas: 1138,
    }
  ]

  @Input() estado?: string;

  constructor() { }

  ngOnInit() {
    
  }

  //TODO hacer llamada con el estado (PROGRESO, FAVORITO, LEIDO) --> obtener listado de libros del usuario

}

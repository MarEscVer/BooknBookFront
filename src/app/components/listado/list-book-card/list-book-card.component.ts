import { Component } from '@angular/core';
import { BookItemCard } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-list-book-card',
  templateUrl: './list-book-card.component.html',
  styleUrls: ['./list-book-card.component.scss']
})
export class ListBookCardComponent {

  libros: BookItemCard[] = [
    {
      id: 1,
      imagen: "/assets/img/iconoLibro.jpg",
      titulo: "El señor de los anillos",
      autor: "J.R.R. Tolkien",
      saga: "El señor de los anillos"
    },
    {
      id: 2,
      imagen: "/assets/img/iconoLibro.jpg",
      titulo: "Harry Potter y la piedra filosofal",
      autor: "J.K. Rowling",
      saga: "Harry Potter"
    },
    {
      id: 3,
      imagen: "/assets/img/iconoLibro.jpg",
      titulo: "Cien años de soledad",
      autor: "Gabriel García Márquez",
      saga: ""
    },
    {
      id: 4,
      imagen: "/assets/img/iconoLibro.jpg",
      titulo: "1984",
      autor: "George Orwell",
      saga: ""
    },
    {
      id: 5,
      imagen: "/assets/img/iconoLibro.jpg",
      titulo: "Orgullo y prejuicio",
      autor: "Jane Austen",
      saga: ""
    },
    {
      id: 6,
      imagen: "/assets/img/iconoLibro.jpg",
      titulo: "Don Quijote de la Mancha",
      autor: "Miguel de Cervantes",
      saga: ""
    },
    {
      id: 7,
      imagen: "/assets/img/iconoLibro.jpg",
      titulo: "Crónicas de una muerte anunciada",
      autor: "Gabriel García Márquez",
      saga: ""
    },
    {
      id: 8,
      imagen: "/assets/img/iconoLibro.jpg",
      titulo: "El Hobbit",
      autor: "J.R.R. Tolkien",
      saga: ""
    },
    {
      id: 9,
      imagen: "/assets/img/iconoLibro.jpg",
      titulo: "Las crónicas de Narnia: El león, la bruja y el armario",
      autor: "C.S. Lewis",
      saga: "Las crónicas de Narnia"
    },
    {
      id: 10,
      imagen: "/assets/img/iconoLibro.jpg",
      titulo: "Matar a un ruiseñor",
      autor: "Harper Lee",
      saga: ""
    }
  ];
}

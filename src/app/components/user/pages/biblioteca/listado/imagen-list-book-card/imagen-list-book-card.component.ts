import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { BookItemCard } from 'src/app/shared/models/book/book';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-imagen-list-book-card',
  templateUrl: './imagen-list-book-card.component.html',
  styleUrls: ['./imagen-list-book-card.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})

export class ImagenListBookCardComponent implements OnInit, OnDestroy {

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

  librosPorPagina: BookItemCard[][] = [];
  isMobile: boolean = false;
  current = 0;

  @Input() listadoService: any;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor() { }

  ngOnInit() {
    // this.loadData();

    this.onResize();
    setInterval(() => {
      this.current = ++this.current % this.librosPorPagina.length;
    }, 6000);
  }

  // loadData() {
  //   this.subscriptions.add(this.listadoService.getListado().subscribe((data: BookItemCard[]) => {
  //     if (data) {
  //       this.libros = data;
  //     }
  //   }));
  // }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.isMobile = window.innerWidth <= 576;
    this.dividirLibrosPorPagina();
  }

  dividirLibrosPorPagina() {
    this.librosPorPagina = [];
    let librosPorPagina = 1;

    const screenWidth = window.innerWidth;
    if (!this.isMobile) {
      if (screenWidth >= 1300) { // Pantalla grande
        librosPorPagina = 5;
      } else if (screenWidth >= 1000) { // Pantalla grande
        librosPorPagina = 4;
      } else if (screenWidth >= 790) { // Tableta
        librosPorPagina = 3;
      } else if (screenWidth >= 577) {
        librosPorPagina = 2;
      }
    }

    for (let i = 0; i < this.libros.length; i += librosPorPagina) {
      this.librosPorPagina.push(this.libros.slice(i, i + librosPorPagina));
    }
  }

  nextCarouselItem() {
    this.current = (this.current + 1) % this.librosPorPagina.length;
  }

  prevCarouselItem() {
    this.current = (this.current - 1 + this.librosPorPagina.length) % this.librosPorPagina.length;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

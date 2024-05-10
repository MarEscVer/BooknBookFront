import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { BookItemCard } from 'src/app/shared/models/book/book';
import { BibliotecaGeneroComponent } from '../pages/biblioteca-genero/biblioteca-genero.component';

@Component({
  selector: 'app-paginador-list-book',
  templateUrl: './paginador-list-book.component.html',
  styleUrls: ['./paginador-list-book.component.scss']
})
export class PaginadorListBookComponent implements OnInit, OnDestroy {

  listadoLibros: BookItemCard[] = [
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

  @Input() generoObs?: Observable<string>;
  genero!: string;
  dataSource: MatTableDataSource<BookItemCard> = new MatTableDataSource<BookItemCard>(this.listadoLibros);
  observable?: Observable<any>;

  length = 10;
  pageIndex = 0;
  pageSize = 10;
  pageEvent?: PageEvent;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    public bookServie: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.dataSource = new MatTableDataSource<BookItemCard>([]);
  }

  ngOnInit() {

    this.subscriptions.add(this.generoObs?.subscribe(genero => {
      this.genero = genero;
    }));

    // this.loadData();

    if (this.listadoLibros) {
      this.dataSource = new MatTableDataSource<BookItemCard>(this.listadoLibros);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.observable = this.dataSource.connect();
    }
  }

  loadData() {
    //TODO LLAMAR SERVICIO CON EL GENERO(TIPO) QUE QUIERO OBTENER LIBROS
  }

  applyFilter(event: Event) {

  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.subscriptions.unsubscribe();
  }

}
import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { BookListadoLectura } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-list-book-lectura',
  templateUrl: './list-book-lectura.component.html',
  styleUrls: ['./list-book-lectura.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class ListBookLecturaComponent implements OnInit{

  @Input() libros?: BookListadoLectura[];
  @Input() estado?: string;

  itemsPerPage = 5;
  currentPage = 0;
  totalItems = 0;
  filter: string = '';
  isLoading: boolean = true;

  private subscriptions: Subscription = new Subscription();

  constructor(private bookService: BookService,) { }

  ngOnInit() {
    this.loadData(this.estado);
  }

  loadData(estado?: string) {
    const newPage = Math.floor((this.currentPage * this.itemsPerPage) / this.itemsPerPage);
    this.currentPage = newPage;
    this.isLoading = true;
    if (estado) {
      this.subscriptions.add(this.bookService.getListadoLibrosEstado(this.currentPage, this.itemsPerPage, estado).subscribe(data => {
        if (data) {
          this.libros = data.libros;
          this.totalItems = data.pageInfo.totalElements;
          this.isLoading = false;
        }
      })
      );
    }
  }

  nextPage() {
    const totalPages = this.totalPages();
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
      this.loadData(this.estado);
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadData(this.estado);
    }
  }

  onLibroEliminado(id: number) {
    this.libros = this.libros?.filter(libro => libro.id !== id);
  }

  totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
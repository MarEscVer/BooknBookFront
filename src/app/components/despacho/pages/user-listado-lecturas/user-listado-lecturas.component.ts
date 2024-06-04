import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { BookListadoLectura } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-user-listado-lecturas',
  templateUrl: './user-listado-lecturas.component.html',
  styleUrls: ['./user-listado-lecturas.component.scss']
})
export class UserListadoLecturasComponent implements OnInit, OnDestroy {

  url$?: Observable<string | undefined>;

  libros?: BookListadoLectura[];
  estado?: string;

  itemsPerPage = 5;
  currentPage = 0;
  totalItems = 0;
  filter: string = '';
  isLoading: boolean = true;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.url$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('estado')?.toUpperCase() ?? undefined)
    );

    this.subscriptions.add(this.url$.subscribe(url => {
      this.loadData(url);
      this.estado = url;
    }));
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
      this.loadData();
      console.log('NEXT');
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadData();
      console.log('NEXT');
    }
  }

  totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

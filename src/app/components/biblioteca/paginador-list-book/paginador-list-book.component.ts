import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { BookItemCard } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-paginador-list-book',
  templateUrl: './paginador-list-book.component.html',
  styleUrls: ['./paginador-list-book.component.scss']
})
export class PaginadorListBookComponent implements OnInit, OnDestroy {

  listadoLibros?: BookItemCard[];

  @Input() generoObs?: Observable<string>;
  genero!: string;
  dataSource: MatTableDataSource<BookItemCard> = new MatTableDataSource<BookItemCard>(this.listadoLibros);
  observable?: Observable<any>;

  itemsPerPageOptions = [5, 10, 25, 50];
  itemsPerPage = 5;
  currentPage = 0;
  totalItems = 0;
  filter: string = '';
  loading: boolean = true;

  @ViewChild(MatSort) sort?: MatSort;
  private subscriptions: Subscription = new Subscription();
  @Output() datosCargados = new EventEmitter<boolean>();

  constructor(
    public bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.dataSource = new MatTableDataSource<BookItemCard>([]);
  }

  ngOnInit() {
    this.subscriptions.add(this.generoObs?.subscribe(genero => {
      this.genero = genero;
      this.loadData();
    }));
    this.observable = this.dataSource.connect();
  }

  loadData() {
    const newPage = Math.floor((this.currentPage * this.itemsPerPage) / this.itemsPerPage);
    this.currentPage = newPage;
    this.loading = true;
    this.subscriptions.add(
      this.bookService.getListGeneroBook(this.currentPage, this.itemsPerPage, this.genero, this.filter).subscribe(data => {
        this.listadoLibros = data.libros || [];
        this.totalItems = data.pageInfo.totalElements;
        this.dataSource.data = this.listadoLibros;
        this.loading = false;
        this.datosCargados.emit(true);
      }, () => {
        this.loading = false;
      })
    );
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.subscribeToSort();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filter = filterValue;
    this.currentPage = 0;
    this.loadData();
  }

  subscribeToSort() {
    if (this.sort) {
      this.subscriptions.add(
        this.sort.sortChange.subscribe((sort: Sort) => {
          this.loadData();
        })
      );
    }
  }

  nextPage() {
    const totalPages = this.totalPages();
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
      this.loadData();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadData();
    }
  }

  totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onItemsPerPageChange(newItemsPerPage: number) {
    this.itemsPerPage = newItemsPerPage;
    this.currentPage = 0;
    this.loadData();
  }
  
  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.subscriptions.unsubscribe();
  }

}
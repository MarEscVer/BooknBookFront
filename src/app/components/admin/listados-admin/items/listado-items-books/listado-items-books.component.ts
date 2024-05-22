import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { BookItemList } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-listado-items-books',
  templateUrl: './listado-items-books.component.html',
  styleUrls: ['./listado-items-books.component.scss']
})
export class ListadoItemsBooksComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['img', 'title', 'author', 'tipe', 'gender', 'year', 'actions'];

  imgNoData: string = '/assets/img/iconoLibro.jpg';
  dataSource: MatTableDataSource<BookItemList>;

  itemsPerPageOptions = [5, 10, 25, 50];
  itemsPerPage = 5;
  currentPage = 0;
  totalItems = 0;
  filter: string = '';
  isLoading: boolean = true;

  @ViewChild(MatSort) sort?: MatSort;
  private subscriptions: Subscription = new Subscription();

  constructor(
    public bookServie: BookService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.dataSource = new MatTableDataSource<BookItemList>([]);
  }

  ngOnInit() {
    this.loadData();
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

  loadData() {
    const newPage = Math.floor((this.currentPage * this.itemsPerPage) / this.itemsPerPage);
    this.currentPage = newPage;
    this.isLoading = true;
    this.subscriptions.add(
      this.bookServie.getListBook(this.currentPage, this.itemsPerPage, this.filter).subscribe(data => {
        if (data.libros) {
          this.dataSource.data = data.libros;
          this.totalItems = data.pageInfo.totalElements;
          this.isLoading = false;
        }
      })
    );
  }

  editBook(bookId: number) {
    this.router.navigate(['/admin/book', bookId]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
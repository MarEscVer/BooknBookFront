import { trigger, transition, style, animate } from '@angular/animations';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { BookItemList } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-listado-items-books',
  templateUrl: './listado-items-books.component.html',
  styleUrls: ['./listado-items-books.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
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
  filterSubject: Subject<string> = new Subject<string>();

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

    this.subscriptions.add(
      this.filterSubject.pipe(debounceTime(300)).subscribe(filterValue => {
        this.filter = filterValue;
        this.currentPage = 0;
        this.loadData();
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
    this.filterSubject.next(filterValue);
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

  handleCommentAction() {
    this.loadData();
  }
  
  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.subscriptions.unsubscribe();
  }

}
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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

  length = 10;
  pageIndex = 0;
  pageSize = 10;
  pageEvent?: PageEvent;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
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
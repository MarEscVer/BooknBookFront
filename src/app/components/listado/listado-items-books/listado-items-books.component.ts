import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookService } from 'src/app/services/book/book.service';
import { BookItemList } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-listado-items-books',
  templateUrl: './listado-items-books.component.html',
  styleUrls: ['./listado-items-books.component.scss']
})
export class ListadoItemsBooksComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'title', 'author', 'tipe', 'gender', 'year', 'actions'];

  @Input() data?: BookItemList[];

  imgNoData: string = '../../../../assets/img/iconoLibro.jpg';
  dataSource: MatTableDataSource<BookItemList>;
  editedItems: BookItemList[] = [];
  originalRol: string = '';

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    public bookServie: BookService
  ) {
    this.dataSource = new MatTableDataSource<BookItemList>([]);
  }

  ngOnInit() {
    if (this.data) {
      this.dataSource = new MatTableDataSource<BookItemList>(this.data);
    }
  }

  ngAfterViewInit() {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.dataSource && this.sort) {
      this.dataSource.sort = this.sort;
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
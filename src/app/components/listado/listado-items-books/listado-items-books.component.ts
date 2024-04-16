import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookItemList } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-listado-items-books',
  templateUrl: './listado-items-books.component.html',
  styleUrls: ['./listado-items-books.component.scss']
})
export class ListadoItemsBooksComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'title', 'author', 'tipe', 'gender', 'isbn', 'year', 'actions'];

  @Input() data?: BookItemList[];

  dataSource: MatTableDataSource<BookItemList>;
  editedItems: BookItemList[] = [];
  originalRol: string = '';

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor() {
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

  delete(row: BookItemList) {
    // Aquí puedes implementar la lógica para eliminar un usuario
    console.log('Eliminando libro:', row);
  }

}
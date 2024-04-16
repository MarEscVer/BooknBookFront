import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClubItemList } from 'src/app/shared/models/club/club';

@Component({
  selector: 'app-listado-items-clubs',
  templateUrl: './listado-items-clubs.component.html',
  styleUrls: ['./listado-items-clubs.component.scss']
})
export class ListadoItemsClubsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'tipe', 'gender', 'users', 'actions'];

  @Input() data?: ClubItemList[];

  dataSource: MatTableDataSource<ClubItemList>;
  editedItems: ClubItemList[] = [];
  originalRol: string = '';

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource<ClubItemList>([]);
  }

  ngOnInit() {
    if (this.data) {
      this.dataSource = new MatTableDataSource<ClubItemList>(this.data);
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

  delete(row: ClubItemList) {
    // Aquí puedes implementar la lógica para eliminar un usuario
    console.log('Eliminando libro:', row);
  }
}

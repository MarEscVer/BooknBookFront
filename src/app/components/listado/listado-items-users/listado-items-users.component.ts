import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserItemList } from 'src/app/shared/models/users/user';

@Component({
  selector: 'app-listado-items-users',
  templateUrl: './listado-items-users.component.html',
  styleUrls: ['./listado-items-users.component.scss']
})
export class ListadoItemsUsersComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'username', 'fullname', 'email', 'rol', 'actions'];;
  
  @Input() data?: UserItemList[];

  dataSource: MatTableDataSource<UserItemList>;

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  constructor() {
    this.dataSource = new MatTableDataSource<UserItemList>([]);
  }
  
  ngOnInit() {
    if (this.data) {
      this.dataSource = new MatTableDataSource<UserItemList>(this.data);
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

  edit(item: any) {
    this.editItem.emit(item);
  }

  delete(item: any) {
    this.deleteItem.emit(item);
  }
}

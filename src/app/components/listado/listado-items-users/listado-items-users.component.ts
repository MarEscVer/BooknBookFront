import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user/user.service';
import { UserItemList } from 'src/app/shared/models/users/user';

@Component({
  selector: 'app-listado-items-users',
  templateUrl: './listado-items-users.component.html',
  styleUrls: ['./listado-items-users.component.scss']
})
export class ListadoItemsUsersComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['img', 'username', 'fullname', 'email', 'rol', 'actions'];

  @Input() data?: UserItemList[];

  imgNoData: string = '../../../../assets/img/iconoPerfil.jpg';
  dataSource: MatTableDataSource<UserItemList>;
  editedItems: UserItemList[] = [];
  originalRol: string = '';

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor(
    public userService: UserService
  ) {
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

  saveChanges(row: UserItemList) {
    // Aquí puedes enviar los cambios al backend
    console.log('Guardando cambios:', row);
  }

  toggleEditMode(row: UserItemList) {
    row.editMode = !row.editMode;
    // Guardar el valor original del rol temporalmente al activar el modo de edición
    if (row.editMode) {
      this.originalRol = row.rol;
    } else {
      // Restaurar el valor original del rol al cancelar la edición
      row.rol = this.originalRol;
      this.originalRol = ''; // Limpiar la variable después de restaurar el valor
    }
  }

}

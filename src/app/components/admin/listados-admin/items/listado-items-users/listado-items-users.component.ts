import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserItemList, modifyUser } from 'src/app/shared/models/users/user';

@Component({
  selector: 'app-listado-items-users',
  templateUrl: './listado-items-users.component.html',
  styleUrls: ['./listado-items-users.component.scss']
})
export class ListadoItemsUsersComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['img', 'username', 'fullname', 'email', 'rol', 'actions'];

  @Input() data?: UserItemList[];

  imgNoData: string = '../../../../assets/img/iconoPerfil.jpg';
  dataSource: MatTableDataSource<UserItemList>;
  editedItems: UserItemList[] = [];
  originalRol: string = '';

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    public userService: UserService,
    private notification: NotificationService
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
    if (row.editMode) {
      const modifiedUser: modifyUser = {
        idUsuario: row.id,
        rolUsuario: row.rol
      };
      const sub = this.userService.updateUserRole(modifiedUser)
        .subscribe({
          next: (data) => {
            if (data) {
              console.log('Rol actualizado con éxito:', row);
              row.editMode = false;
            } else {
              this.notification.show(data, 'error');
            }
          },
          error: (error) => { },
        });

      this.subscriptions.add(sub);
    }
  }

  toggleEditMode(row: UserItemList) {
    row.editMode = !row.editMode;
    if (row.editMode) {
      this.originalRol = row.rol;
    } else {
      row.rol = this.originalRol;
      this.originalRol = '';
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

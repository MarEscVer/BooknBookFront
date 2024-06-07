import { trigger, transition, style, animate } from '@angular/animations';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserItemList, modifyUser } from 'src/app/shared/models/users/user';

@Component({
  selector: 'app-listado-items-users',
  templateUrl: './listado-items-users.component.html',
  styleUrls: ['./listado-items-users.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class ListadoItemsUsersComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['img', 'username', 'fullname', 'email', 'rol', 'actions'];

  @Input() data?: UserItemList[];

  imgNoData: string = '/assets/img/iconoPerfil.jpg';
  dataSource: MatTableDataSource<UserItemList>;
  originalData: UserItemList[] = [];
  editedItems: UserItemList[] = [];
  originalRol: string = '';
  userUsername?: string | null;

  itemsPerPageOptions = [5, 10, 25, 50];
  itemsPerPage = 5;
  currentPage = 0;
  totalItems = 0;
  filter: string = '';
  isLoading: boolean = true;
  filterSubject: Subject<string> = new Subject<string>();

  @ViewChild(MatSort) sort?: MatSort;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    public userService: UserService,
    private authService: AuthService,
    private notification: NotificationService
  ) {
    this.dataSource = new MatTableDataSource<UserItemList>([]);
  }

  ngOnInit() {
    this.subscriptions.add(
      this.authService.userUsername$.subscribe(username => {
        this.userUsername = username;
      })
    );
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

  loadData() {
    const newPage = Math.floor((this.currentPage * this.itemsPerPage) / this.itemsPerPage);
    this.currentPage = newPage;
    this.isLoading = true;
    this.subscriptions.add(
      this.userService.getListUser(this.currentPage, this.itemsPerPage, this.filter).subscribe(data => {
        if (data.usuarios) {
          this.originalData = data.usuarios;
          this.dataSource.data = this.originalData;
          this.totalItems = data.pageInfo.totalElements;
          this.isLoading = false;
        }
      })
    );
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadData();
    }
  }

  nextPage() {
    const totalPages = this.totalPages();
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
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

  saveChanges(row: UserItemList) {
    if (row.editMode) {
      const modifiedUser: modifyUser = {
        username: row.username,
        rol: row.rol
      };
      const sub = this.userService.updateUserRole(modifiedUser)
        .subscribe({
          next: (success) => {
            if (success) {
              row.editMode = false;
              this.notification.show('Rol actualizado con éxito', 'success');
            } else {
              this.notification.show('Error al actualizar el rol', 'error');
            }
          }
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

  handleCommentAction(username: string) {
    this.originalData = this.originalData.filter(usuario => usuario.username !== username);
    this.dataSource.data = this.originalData;
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.subscriptions.unsubscribe();
  }

}

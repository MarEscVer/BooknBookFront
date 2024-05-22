import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ClubService } from 'src/app/services/club/club.service';
import { ClubDataAll } from 'src/app/shared/models/club/club';

@Component({
  selector: 'app-club-list-all',
  templateUrl: './club-list-all.component.html',
  styleUrls: ['./club-list-all.component.scss'],
})
export class ClubListAllComponent {

  clubes?: ClubDataAll[];

  @Input() userLoged!: boolean;

  dataSource: MatTableDataSource<ClubDataAll>;

  itemsPerPage = 6;
  currentPage = 0;
  totalItems = 0;
  filter: string = '';
  isLoading: boolean = true;
  userRole?: string | null;

  @ViewChild(MatSort) sort?: MatSort;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public clubService: ClubService,
    private authService: AuthService,
  ) {
    this.dataSource = new MatTableDataSource<ClubDataAll>([]);
  }

  ngOnInit() {
    this.subscriptions.add(
      this.authService.userRole$.subscribe(role => {
        this.userRole = role;
        this.loadData();
        if (this.clubes) {
          this.dataSource = new MatTableDataSource<ClubDataAll>(this.clubes);
          this.changeDetectorRef.detectChanges();
        }
      })
    );
    this.subscriptions.add(
      this.clubService.clubAdded$.subscribe(() => {
        this.loadData();
      })
    );
    this.subscriptions.add(
      this.clubService.clubDeleted$.subscribe(() => {
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

  loadData() {
    const newPage = Math.floor((this.currentPage * this.itemsPerPage) / this.itemsPerPage);
    this.currentPage = newPage;
    this.isLoading = true;
    if (this.userRole === 'NORMAL' || this.userRole === 'ADMIN') {
      this.subscriptions.add(
        this.clubService.getListClubes(this.currentPage, this.itemsPerPage, this.filter).subscribe(data => {
          if (data.listGroup) {
            this.dataSource.data = data.listGroup;
            this.clubes = data.listGroup;
            this.totalItems = data.pageInfo.totalElements;
            this.isLoading = false;
          }
        })
      );
    } else {
      this.subscriptions.add(
        this.clubService.getListClubesAnonimo(this.currentPage, this.itemsPerPage, this.filter).subscribe(data => {
          if (data.listGroup) {
            this.dataSource.data = data.listGroup;
            this.clubes = data.listGroup;
            this.totalItems = data.pageInfo.totalElements;
            this.isLoading = false;
          }
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ClubService } from 'src/app/services/club/club.service';
import { ClubItemList } from 'src/app/shared/models/club/club';

@Component({
  selector: 'app-listado-items-clubs',
  templateUrl: './listado-items-clubs.component.html',
  styleUrls: ['./listado-items-clubs.component.scss']
})
export class ListadoItemsClubsComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['img', 'name', 'tipe', 'gender', 'users', 'actions'];

  imgNoData: string = '/assets/img/iconoClub.png';
  dataSource: MatTableDataSource<ClubItemList>;

  itemsPerPageOptions = [5, 10, 25, 50];
  itemsPerPage = 5;
  currentPage = 0;
  totalItems = 0;
  filter: string = '';
  isLoading: boolean = true;

  @ViewChild(MatSort) sort?: MatSort;
  private subscriptions: Subscription = new Subscription();

  constructor(public clubService: ClubService) {
    this.dataSource = new MatTableDataSource<ClubItemList>([]);
  }

  ngOnInit() {
    this.loadData();

    this.subscriptions.add(
      this.clubService.clubAdded$.subscribe(() => {
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
    this.subscriptions.add(
      this.clubService.getListClubes(this.currentPage, this.itemsPerPage, this.filter).subscribe(data => {
        if (data.listGroup) {
          this.dataSource.data = data.listGroup;
          this.totalItems = data.pageInfo.totalElements;
          this.isLoading = false;
        }
      })
    );
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
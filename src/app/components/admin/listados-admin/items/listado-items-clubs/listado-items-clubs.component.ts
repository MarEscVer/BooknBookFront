import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
  editedItems: ClubItemList[] = [];
  originalRol: string = '';

  pageIndex: number = 0;
  pageSize: number = 5;
  filter: string = '';

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    public clubService: ClubService
  ) {
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
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.dataSource && this.sort) {
      this.dataSource.sort = this.sort;
    }

    this.subscribeToPaginator();
    this.subscribeToSort();
    this.loadData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.paginator?.firstPage();
    this.loadData(filterValue);
  }

  subscribeToPaginator() {
    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => {
          this.loadData();
        })
      );
    }
  }

  subscribeToSort() {
    if (this.sort) {
      this.subscriptions.add(
        this.sort.sortChange.subscribe(() => {
          this.loadData();
        })
      );
    }
  }

  loadData(filter: string = '') {
    const pageIndex = this.paginator?.pageIndex || 0;
    const pageSize = this.paginator?.pageSize || 5;
    this.subscriptions.add(
      this.clubService.getListClubes(pageIndex, pageSize, filter).subscribe(data => {
        if (data.listGroup) {
          this.dataSource = new MatTableDataSource<ClubItemList>(data.listGroup);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

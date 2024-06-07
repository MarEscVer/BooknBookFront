import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { ClubService } from 'src/app/services/club/club.service';
import { ClubDataShort } from 'src/app/shared/models/club/club';

@Component({
  selector: 'app-user-club-list',
  templateUrl: './user-club-list.component.html',
  styleUrls: ['./user-club-list.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class UserClubListComponent implements OnInit, OnDestroy {

  clubes?: ClubDataShort[];
  @Input() tipo?: string;
  @Output() dataLoaded = new EventEmitter<boolean>();

  itemsPerPage = 4;
  currentPage = 0;
  totalItems = 0;
  isLoading: boolean = true;

  private subscriptions: Subscription = new Subscription();

  constructor(
    public clubService: ClubService,
  ) { }

  ngOnInit() {
    this.loadData();
    this.subscriptions.add(
      this.clubService.clubAdded$.pipe(filter(added => added)).subscribe(() => {
        this.loadData();
      })
    );

    this.subscriptions.add(
      this.clubService.clubDeleted$.subscribe((deletedClubId) => {
        this.eliminarClubDeLista(deletedClubId);
      })
    );
  }

  loadData() {
    const newPage = Math.floor((this.currentPage * this.itemsPerPage) / this.itemsPerPage);
    this.currentPage = newPage;
    this.isLoading = true;
    if (this.tipo === 'P') {
      this.subscriptions.add(
        this.clubService.getListClubesPertenece(this.currentPage, this.itemsPerPage).subscribe(data => {
          if (data.nombreGrupos) {
            this.clubes = data.nombreGrupos;
            this.totalItems = data.pageInfo.totalElements;
            this.isLoading = false;
            this.dataLoaded.emit(true);
          }
        })
      );
    } else if (this.tipo === 'A') {
      this.subscriptions.add(
        this.clubService.getListClubesAdministra(this.currentPage, this.itemsPerPage).subscribe(data => {
          if (data.nombreGrupos) {
            this.clubes = data.nombreGrupos;
            this.totalItems = data.pageInfo.totalElements;
            this.isLoading = false;
            this.dataLoaded.emit(true);
          }
        })
      );
    }
  }

  eliminarClubDeLista(id: number) {
    if (this.clubes) {
      this.clubes = this.clubes.filter((club) => club.idGrupo !== id);
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

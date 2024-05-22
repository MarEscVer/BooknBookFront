import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClubService } from 'src/app/services/club/club.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ClubDataShort } from 'src/app/shared/models/club/club';

@Component({
  selector: 'app-user-item-club-list',
  templateUrl: './user-item-club-list.component.html',
  styleUrls: ['./user-item-club-list.component.scss']
})
export class UserItemClubListComponent implements OnDestroy {

  @Input() club?: ClubDataShort;
  imgNoData: string = '/assets/img/iconoClub.png';

  private subscriptions: Subscription = new Subscription();

  constructor(
    private clubService: ClubService,
    private notification: NotificationService
  ) {

  }

  eliminarClub(id: number) {
    this.subscriptions.add(
      this.clubService.delete(id).subscribe(data => {
        if (data.message) {
          this.notification.show(data.message, 'success');
          this.clubService.notifyClubDeleted();
        } else {
          this.notification.show(data.message, 'error');
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

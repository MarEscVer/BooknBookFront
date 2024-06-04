import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClubService } from 'src/app/services/club/club.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ClubDataAll } from 'src/app/shared/models/club/club';
import { applyColors } from 'src/app/shared/models/combo/combo';

@Component({
  selector: 'app-item-club-list-all',
  templateUrl: './item-club-list-all.component.html',
  styleUrls: ['./item-club-list-all.component.scss']
})
export class ItemClubListAllComponent implements OnInit, OnDestroy {

  @Input() club?: ClubDataAll;
  @Input() userLoged?: boolean;
  imgNoData: string = '/assets/img/iconoClub.png';
  tipoStyle: any = {};
  generoStyle: any = {};
  isMember: boolean = false;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private clubService: ClubService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    if (this.club) {
      const clubConColores = applyColors([this.club])[0];
      this.club = clubConColores;

      if (this.club?.tipo) {
        this.tipoStyle = {
          'background-color': this.club.tipo.color,
          'color': 'black',
          'border-radius': '20px',
          'padding': '5px',
        };
      }
      if (this.club?.genero) {
        this.generoStyle = {
          'background-color': this.club.genero.color,
          'color': 'black',
          'border-radius': '5px',
          'padding': '5px',
        };
      }
      this.isMember = this.club.perteneces;
    }
  }

  abandonarClub() {
    if (this.club) {
      this.subscriptions.add(this.clubService.abandonarClub(this.club.id).subscribe({
        next: (data) => {
          if (data.message) {
            this.notification.show(data.message, 'success');
            this.isMember = false;
            this.club!.miembros -= 1;
          } else {
            this.notification.show(data.message, 'error');
            this.isMember = true;
            this.club!.miembros += 1;
          }
        }
      }))
    }
  }

  pertenecerClub() {
    if (this.club) {
      this.subscriptions.add(this.clubService.pertenecerClub(this.club.id).subscribe({
        next: (data) => {
          if (data.message) {
            this.notification.show(data.message, 'success');
            this.isMember = true;
            this.club!.miembros += 1;
          } else {
            this.notification.show(data.message, 'error');
            this.isMember = false;
            this.club!.miembros -= 1;
          }
        }
      }))
    }
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

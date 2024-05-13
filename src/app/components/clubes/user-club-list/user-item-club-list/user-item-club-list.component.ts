import { Component, Input } from '@angular/core';
import { ClubDataShort } from 'src/app/shared/models/club/club';

@Component({
  selector: 'app-user-item-club-list',
  templateUrl: './user-item-club-list.component.html',
  styleUrls: ['./user-item-club-list.component.scss']
})
export class UserItemClubListComponent {

  @Input() club?: ClubDataShort;
  imgNoData: string = '/assets/img/iconoClub.png';

  constructor(){

  }

  eliminarClub(id: number){
    console.log('ELIMINAR: ' + id);
  }

}

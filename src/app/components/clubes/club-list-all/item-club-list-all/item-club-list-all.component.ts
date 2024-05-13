import { Component, Input, OnInit } from '@angular/core';
import { ClubDataAll } from 'src/app/shared/models/club/club';

@Component({
  selector: 'app-item-club-list-all',
  templateUrl: './item-club-list-all.component.html',
  styleUrls: ['./item-club-list-all.component.scss']
})
export class ItemClubListAllComponent implements OnInit {

  @Input() club?: ClubDataAll;
  @Input() userLoged?: boolean;
  imgNoData: string = '/assets/img/iconoPerfil.jpg';
  tipoStyle: any = {};
  generoStyle: any = {};

  constructor() { }

  ngOnInit(): void {
    if (this.club) {
      this.tipoStyle = {
        'background-color': '#' + this.club.tipo.color,
        'color': 'black',
        'border-radius': '20px',
        'padding': '5px',
      };

      this.generoStyle = {
        'background-color': '#' + this.club.genero.color,
        'color': 'black',
        'border-radius': '5px',
        'padding': '5px',
      };
    }
  }
  
  abandonarClub(){
    //TODO ENVIAR DATO A SERVIDOR PARA ABANDONAR
    console.log('ABANDONAR' + this.club?.id)
  }

  pertenecerClub(){
    //TODO ENVIAR DATO A SERVIDOR PARA PERTENECER
    console.log('PERTENECER' + this.club?.id)
  }
  
}

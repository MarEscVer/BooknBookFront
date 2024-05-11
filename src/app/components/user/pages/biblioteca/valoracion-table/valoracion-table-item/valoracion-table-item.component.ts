import { Component, Input } from '@angular/core';
import { ComentarioData } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-valoracion-table-item',
  templateUrl: './valoracion-table-item.component.html',
  styleUrls: ['./valoracion-table-item.component.scss']
})
export class ValoracionTableItemComponent {

  @Input() comentario!: ComentarioData; 
  imgNoData: string = '/assets/img/iconoPerfil.jpg';
  stars = [0, 1, 2, 3, 4];
  
  constructor(){}

  denunciarComentario() {
    console.log('Comentario denunciado:', this.comentario.username);
  }
}

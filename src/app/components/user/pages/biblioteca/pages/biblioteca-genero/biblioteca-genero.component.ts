import { Component } from '@angular/core';
import { MasLeidosBookService } from 'src/app/services/book/mas-leidos-book.service';

@Component({
  selector: 'app-biblioteca-genero',
  templateUrl: './biblioteca-genero.component.html',
  styleUrls: ['./biblioteca-genero.component.scss']
})
export class BibliotecaGeneroComponent {

  genero: string = 'url: NO FICCION // servidor: NO FICCIÓN';

  //pasar la del servidor a NO FICCI*N
  //[11 --> NO FICCIÓN] --> cambiar el [] completo del servidor en una copia para que las ´ pasen a *
  //2 arrays (servidor + copia sin ´) y 1 string (url)
  //comparar el string (url) con array copia (item.name)
  //quiero me devuelva la posición del elemento en el array copia
  //cojo el item.name de esa posición en el array del servidor y lo envio a componente hijo [genero]

  constructor (
    public masLeidosBookService: MasLeidosBookService,
  ) {}

}

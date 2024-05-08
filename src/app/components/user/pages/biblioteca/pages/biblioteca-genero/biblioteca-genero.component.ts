import { Component } from '@angular/core';
import { MasLeidosBookService } from 'src/app/services/book/mas-leidos-book.service';
import { BookItemCard } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-biblioteca-genero',
  templateUrl: './biblioteca-genero.component.html',
  styleUrls: ['./biblioteca-genero.component.scss']
})
export class BibliotecaGeneroComponent {

  genero: string = 'NO FICCION';

  constructor (
    public masLeidosBookService: MasLeidosBookService,
  ) {}

}

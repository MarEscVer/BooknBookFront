import { Component } from '@angular/core';
import { MasLeidosBookService } from 'src/app/services/book/mas-leidos-book.service';
import { NovedadesBookService } from 'src/app/services/book/novedades-book.service';
import { RecomendadosBookService } from 'src/app/services/book/recomendados-book.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent {

  masLeidosCargados: boolean = false;
  recomendadosCargados: boolean = false;
  novedadesCargados: boolean = false;

  constructor(
    public recomendadosBookService: RecomendadosBookService,
    public masLeidosBookService: MasLeidosBookService,
    public novedadesBookService: NovedadesBookService,
  ) {}


  onDatosCargadosMasLeidos(event: boolean) {
    this.masLeidosCargados = event;
  }

  onDatosCargadosRecomendados(event: boolean) {
    this.recomendadosCargados = event;
  }

  onDatosCargadosNovedades(event: boolean) {
    this.novedadesCargados = event;
  }

}

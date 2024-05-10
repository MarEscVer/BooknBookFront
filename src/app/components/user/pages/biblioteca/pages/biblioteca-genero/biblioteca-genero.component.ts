import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MasLeidosBookService } from 'src/app/services/book/mas-leidos-book.service';
import { GeneroTipoService } from 'src/app/services/genero/genero-tipo.service';
import { Combo } from 'src/app/shared/models/combo/combo';

@Component({
  selector: 'app-biblioteca-genero',
  templateUrl: './biblioteca-genero.component.html',
  styleUrls: ['./biblioteca-genero.component.scss']
})
export class BibliotecaGeneroComponent implements OnInit, OnDestroy {

  genero$?: BehaviorSubject<string> = new BehaviorSubject<string>('');
  url?: string;
  typeOptions: Combo[] = [];

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    public masLeidosBookService: MasLeidosBookService,
    private route: ActivatedRoute,
    private generoTipoService: GeneroTipoService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.route.paramMap.subscribe((params: ParamMap) => {
      this.url = params.get('genero') ?? undefined;
      this.obtenerGeneroTipo();
    }));
  }

  obtenerGeneroTipo(): void {
    this.subscriptions.add(this.generoTipoService.getGeneroTipo().subscribe(
      (data) => {
        this.typeOptions = data.tipo.valores.concat(data.genero.valores);
        this.matchGeneroTipo();
      }
    ));
  }

  matchGeneroTipo() {
    if (this.url && this.typeOptions.length > 0) {
      const urlMod = this.url.toUpperCase().replace('-', ' ');
      const listaMod: any[] = [];
      this.typeOptions.forEach((element) =>
        listaMod.push(
          '^' + element.nombre.normalize('NFD').replace(/.[\u0300-\u036f]/g, '*') + '?'
        )
      );
      var regex1 = new RegExp(listaMod[0]);
      const elementFiltrado = listaMod.filter((combo) => {
        let regex = new RegExp(combo);
        return regex.test(urlMod);
      });
      var regex1 = new RegExp(elementFiltrado[0]);
      const result = this.typeOptions.filter((combo) => {
        return regex1.test(combo.nombre);
      });
      this.genero$?.next(result[0].nombre);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

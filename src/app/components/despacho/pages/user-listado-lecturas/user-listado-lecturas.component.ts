import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-user-listado-lecturas',
  templateUrl: './user-listado-lecturas.component.html',
  styleUrls: ['./user-listado-lecturas.component.scss']
})
export class UserListadoLecturasComponent implements OnInit, OnDestroy{

  url$?: Observable<string | undefined>;
  
  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.url$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('estado')?.toUpperCase() ?? undefined)
    );

    this.subscriptions.add(this.url$.subscribe(url => {
      console.log('ESTADO: ' + url);
      this.obtenerListado(url);
    }));
  }

  obtenerListado(estado?: string) {
    //TODO HACER LLAMADA CON EL ESTADO PARA OBTENER LOS LIBROS
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

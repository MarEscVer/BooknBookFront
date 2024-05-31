import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EstadisticaGeneroResponse } from 'src/app/shared/models/estadistica/estadistifca';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit, OnDestroy {

  datosEstadisticaGenero?: EstadisticaGeneroResponse;

  private subscriptions: Subscription = new Subscription();

  constructor() {

  }

  ngOnInit(): void {
    //TODO LLAMADA A SERVIDOR DATOS PARA ESTADISTICA
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}

import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EstadisticaGeneroResponse } from 'src/app/shared/models/estadistica/estadistifca';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit, OnDestroy {

  data?: EstadisticaGeneroResponse;
  myTypePie: any;
  myDataPie: any;


  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor( ){
    this.myTypePie = "PieChart";
    this.myDataPie = [
      ["London", 8136000],
      ["New York", 8538000],
      ["Paris", 2244000],
      ["Berlin", 3470000],
      ["Kairo", 19500000]
    ];
  }

  ngOnInit(): void {
    //TODO LLAMADA A SERVIDOR DATOS PARA ESTADISTICA
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}

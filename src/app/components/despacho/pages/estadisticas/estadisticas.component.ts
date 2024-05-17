import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { Subscription } from 'rxjs';
import { EstadisticaGeneroResponse } from 'src/app/shared/models/estadistica/estadistifca';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit, OnDestroy {

  datosEstadisticaGenero?: EstadisticaGeneroResponse;

  title = 'Browser market shares at a specific website, 2014';
  type = ChartType.PieChart;
  data = [
    ['Firefox', 45.0],
    ['IE', 26.8],
    ['Chrome', 12.8],
    ['Safari', 8.5],
    ['Opera', 6.2],
    ['Others', 0.7]
  ];
  columnNames = ['Browser', 'Percentage'];
  options = {
    legend: 'none',
    pieHole: 0.4,
  };
  width = 400;
  height = 400;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
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

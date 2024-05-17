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

  lecturas = 'ESTADO DE LECTURAS';
  dataLecturas = [
    ['LEÍDOS', 10],
    ['EN PROGRESO', 10],
    ['FAVORITOS', 10],
  ];

  generos = 'LECTURAS POR GÉNERO';
  dataGeneros = [
    ['LEÍDAS', 10],
    ['FALTANTES', 10],
  ];

  paginas = 'PÁGINAS LEÍADAS';
  dataPaginas = [
    ['LEÍDAS', 10],
    ['FALTANTES', 10],
  ];

  type = ChartType.PieChart;
  columnNames = ['Etiqueta', 'Porcentaje'];
  options = {
    legend: 'none',
    pieHole: 0.4,
    width: 400,
    height: 400,
    titleTextStyle: {
      fontSize: 15,
    },
  };


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

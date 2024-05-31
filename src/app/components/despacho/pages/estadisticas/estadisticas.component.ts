import { Component, OnDestroy, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Subscription } from 'rxjs';
import { EstadisticaService } from 'src/app/services/estadisticas/estadistica.service';
import { EstadisticaGeneroResponse } from 'src/app/shared/models/estadistica/estadistica';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit, OnDestroy {

  datosEstadisticaGenero?: EstadisticaGeneroResponse;
  chartEstadoLecturas?: any;
  chartLecturasPorGenero?: any;

  private chartInfo: any;
  private labeldata: any[] = [];
  private realdata: any[] = [];
  private colordata: any[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private estadisticaService: EstadisticaService,
  ) {

  }

  ngOnInit(): void {
    this.createChartEstadoLectura();
    this.createChartLecturasPorGenero();
  }

  createChartEstadoLectura() {
    //TODO LLAMADA A SERVIDOR DATOS PARA ESTADISTICA --> DATA
    this.subscriptions.add(
      this.estadisticaService.getLecturasEstadistica().subscribe(data => {
        this.chartInfo = data.estadisticas;
        if (this.chartInfo !== null && this.chartInfo) {
          this.chartInfo.forEach((element: { titulo: any; dato: any; }) => {
            this.labeldata.push(element.titulo);
            this.realdata.push(element.dato);
          });
          this.colordata = [
            "#FD9D9D",
            "#DA9F9F",
            "#C5C5C5",
            "#CFFFBE",
            "#FFE8AE",
            "#D6B7FF",
            "#C2F4FF"
          ],
            this.createChart(this.chartEstadoLecturas, 'LecturasPorGenero', 'LECTURAS POR GÉNERO', this.labeldata, this.realdata, this.colordata);
        }
      })
    );
  }

  createChartLecturasPorGenero() {
    //TODO LLAMADA A SERVIDOR DATOS PARA ESTADISTICA --> DATA
    this.subscriptions.add(
      this.estadisticaService.getGenerosEstadistica().subscribe(data => {
        this.chartInfo = data.estadisticas;
        if (this.chartInfo !== null) {
          this.chartInfo.forEach((element: { titulo: any; dato: any; }) => {
            this.labeldata.push(element.titulo);
            this.realdata.push(element.dato);
          });
          this.colordata = [
            '#FD9D9D',
            '#FFE8AE',
            '#CFFFBE'
          ],
            this.createChart(this.chartEstadoLecturas, 'EstadoLecturas', 'ESTADOS DE LECTURA', this.labeldata, this.realdata, this.colordata);
        }
      })
    );

  }

  createChart(chart: any, idChart: any, titulo: any, labeldata: any, realdata: any, colordata: any) {
    chart = new Chart(idChart, {
      type: 'doughnut',
      data: {
        labels: labeldata,
        datasets: [{
          label: 'Libros',
          data: realdata,
          backgroundColor: colordata,
          hoverOffset: 4
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: titulo,
            color: 'black',
            font: {
              size: 24,
              weight: 'bold',
              family: "ui-rounded"
            },
          },
          legend: {
            display: true,
            labels: {
              color: 'black',
              font: {
                size: 14,
                family: "ui-rounded"
              }
            }
          }
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}

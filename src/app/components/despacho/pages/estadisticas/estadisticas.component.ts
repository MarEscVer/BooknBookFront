import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { EstadisticaService } from 'src/app/services/estadisticas/estadistica.service';
import { ContadorUsuarioResponse, ItemCalendarioResponse } from 'src/app/shared/models/estadistica/estadistica';
import { ChartComponent } from 'ngx-apexcharts';
import {
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexChart,
  ApexPlotOptions,
  ApexTooltip
} from 'ngx-apexcharts';
import { GeneroTipo, applyColorsToGeneroTipo } from 'src/app/shared/models/combo/combo';

interface CustomChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
}

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit, OnDestroy {

  datosEstadisticaGenero?: ContadorUsuarioResponse;
  chartEstadoLecturas?: any;
  chartLecturasPorGenero?: any;

  selectedYear: number = 2024;
  availableYears: number[] = [];
  generoStyle: any = {};

  private estadoLecturasInfo: any;
  private estadoLecturasLabels: string[] = [];
  private estadoLecturasData: number[] = [];
  private estadoLecturasColors: string[] = [];

  private lecturasPorGeneroInfo: any;
  private lecturasPorGeneroLabels: string[] = [];
  private lecturasPorGeneroData: number[] = [];
  private lecturasPorGeneroColors: string[] = [];

  chartCalendario?: Map<string, ItemCalendarioResponse[]>;
  chartYearCalendario?: number[];

  @ViewChild("chart")
  chart: ChartComponent = new ChartComponent;
  chartOptions: CustomChartOptions | undefined;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private estadisticaService: EstadisticaService,
  ) {
    moment.locale('es');
  }

  ngOnInit(): void {
    this.contadorUsuario();
    this.registerChart();
    this.createChartEstadoLectura();
    this.createChartLecturasPorGenero();
    this.getDataHeatmapChart();
  }

  calculateYears(): void {
    if (this.chartYearCalendario) {
      const currentYear = new Date().getFullYear();
      const years = this.chartYearCalendario;
      if (years) {
        if (!years.includes(currentYear)) {
          this.availableYears = [...years, currentYear];
        } else {
          this.availableYears = years;
        }
        this.selectedYear = Math.max(currentYear, ...years);
      }
    }
  }

  registerChart() {
    Chart.register({
      id: 'moment',
      beforeInit: function (chart: any) {
        chart._adapter = moment;
      }
    });
    Chart.register(...registerables);
  }

  applyColorsToGenero(genero: GeneroTipo): void {
    if (genero) {
      const generoConColores = applyColorsToGeneroTipo(genero);
      if (generoConColores) {
        this.generoStyle = {
          'background-color': generoConColores.color,
          'color': 'black',
          'border-radius': '5px',
          'padding': '5px',
          'font-size': '20px',
        };
      }
    }
  }

  createChartLecturasPorGenero() {
    this.subscriptions.add(
      this.estadisticaService.getGenerosEstadistica().subscribe(data => {
        this.estadoLecturasInfo = data.estadisticas;
        if (this.estadoLecturasInfo !== null && this.estadoLecturasInfo) {
          this.estadoLecturasInfo.forEach((element: { titulo: any; dato: any; }) => {
            this.estadoLecturasLabels.push(element.titulo);
            this.estadoLecturasData.push(element.dato);
          });
          this.estadoLecturasColors = [
            "#FD9D9D", "#DA9F9F", "#C5C5C5", 
            "#CFFFBE", "#FFE8AE", "#D6B7FF", 
            "#C2F4FF"
          ];
          this.createChart(
            this.chartEstadoLecturas, 
            'LecturasPorGenero', 
            'LECTURAS POR GÉNERO', 
            this.estadoLecturasLabels, 
            this.estadoLecturasData, 
            this.estadoLecturasColors.slice(0, this.estadoLecturasData.length)
          );
        }
      })
    );
  }

  createChartEstadoLectura() {
    this.subscriptions.add(
      this.estadisticaService.getLecturasEstadistica().subscribe(data => {
        this.lecturasPorGeneroInfo = data.estadisticas;
        if (this.lecturasPorGeneroInfo !== null) {
          this.lecturasPorGeneroInfo.forEach((element: { titulo: any; dato: any; }) => {
            this.lecturasPorGeneroLabels.push(element.titulo);
            this.lecturasPorGeneroData.push(element.dato);
          });
          this.lecturasPorGeneroColors = [
            '#FD9D9D', '#FFE8AE', '#CFFFBE'
          ];
          this.createChart(
            this.chartEstadoLecturas, 
            'EstadoLecturas', 
            'ESTADOS DE LECTURA', 
            this.lecturasPorGeneroLabels, 
            this.lecturasPorGeneroData, 
            this.lecturasPorGeneroColors.slice(0, this.lecturasPorGeneroData.length)
          );
        }
      })
    );
  }

  contadorUsuario() {
    this.subscriptions.add(
      this.estadisticaService.getContadorUsario().subscribe(data => {
        this.datosEstadisticaGenero = data;
        this.applyColorsToGenero(this.datosEstadisticaGenero.genero);
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

  getDataHeatmapChart() {
    this.subscriptions.add(
      this.estadisticaService.getCalendarioEstadistica(this.selectedYear).subscribe(data => {
        this.chartCalendario = new Map(Object.entries(data.estadisticaPorAnio));
        this.chartYearCalendario = data.anyos;
        this.calculateYears();
        this.renderHeatmapChart();
      })
    );
  }

  renderHeatmapChart() {
    if (this.chartCalendario) {
      const selectedYearData = this.chartCalendario.get(this.selectedYear.toString()) || [];
      const transformedData = this.transformData(selectedYearData);
      const year = this.selectedYear;

      const colorScaleRanges = [
        {
          from: 0,
          to: 0,
          color: "#e0e0e0",
          name: "Ninguna"
        },
        {
          from: 1,
          to: 20,
          color: "#FFE8AE",
          name: "1-20 páginas"
        },
        {
          from: 21,
          to: 40,
          color: "#FFB200",
          name: "21-40 páginas"
        },
        {
          from: 41,
          to: 60,
          color: "#FF8800",
          name: "41-60 páginas"
        },
        {
          from: 61,
          to: 80,
          color: "#A5734B",
          name: "61-80 páginas"
        },
        {
          from: 81,
          to: 100,
          color: "#8B4513",
          name: "81-100 páginas"
        },
        {
          from: 101,
          to: 6000,
          color: "#5A2F00",
          name: "+100 páginas"
        }
      ];

      this.chartOptions = {
        series: transformedData,
        chart: {
          height: 350,
          type: "heatmap"
        },
        plotOptions: {
          heatmap: {
            shadeIntensity: 0.5,
            colorScale: {
              ranges: colorScaleRanges
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            format: 'dd MMM',
            formatter: undefined,
          },
          y: {
            formatter: undefined,
            title: {
              formatter: (seriesName) => seriesName
            }
          },
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            const data = w.config.series[seriesIndex].data[dataPointIndex];
            const date = moment().set({
              year: year,
              month: seriesIndex,
              date: parseInt(data.x)
            });
            const formattedDate = date.format('DD/MM/YYYY');
            const value = data.y;
            return `
          <div style="background-color: rgba(0, 0, 0, 0.7); color: #fff; padding: 10px; border-radius: 5px;">
            <div>${formattedDate}</div>
            <div>Paginas leídas: ${value}</div>
          </div>`;
          }
        }
      };
    }
  }

  transformData(data: ItemCalendarioResponse[]): ApexAxisChartSeries {
    const mesesDelAnio = moment.monthsShort();
    return mesesDelAnio.map((mes, mesIndex) => {
      let diasEnEsteMes = moment().month(mesIndex).daysInMonth();
      if (mesIndex === 1) {
        const currentYear = moment().year();
        diasEnEsteMes = moment([currentYear, mesIndex]).isLeapYear() ? 29 : 28;
      }
      const diasValidos = Array.from({ length: diasEnEsteMes }, (_, i) => (i + 1).toString());
      const datosMes = diasValidos.map((dia) => {
        const foundData = data.find(d => d.month === mesIndex && d.day === parseInt(dia));
        return {
          x: dia,
          y: foundData ? foundData.paginasLeidas : 0
        };
      });
      return {
        name: mes,
        data: datosMes
      };
    });
  }

  onYearChange(year: number) {
    this.selectedYear = year;
    this.renderHeatmapChart();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.subscriptions.unsubscribe();
    if (this.chartEstadoLecturas) {
      this.chartEstadoLecturas.destroy();
    }
    if (this.chartLecturasPorGenero) {
      this.chartLecturasPorGenero.destroy();
    }
  }
}
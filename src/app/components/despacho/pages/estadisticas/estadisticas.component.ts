import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as moment from 'moment';
import { Subscription, of } from 'rxjs';
import { EstadisticaService } from 'src/app/services/estadisticas/estadistica.service';
import { ContadorUsuarioResponse, EstadisticaResponse } from 'src/app/shared/models/estadistica/estadistica';
import { ChartComponent } from 'ngx-apexcharts';
import {
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexChart,
  ApexPlotOptions,
  ApexTooltip
} from 'ngx-apexcharts';

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

  private estadoLecturasInfo: any;
  private estadoLecturasLabels: any[] = [];
  private estadoLecturasData: any[] = [];
  private estadoLecturasColors: any[] = [];

  private lecturasPorGeneroInfo: any;
  private lecturasPorGeneroLabels: any[] = [];
  private lecturasPorGeneroData: any[] = [];
  private lecturasPorGeneroColors: any[] = [];

  mockData?: { [year: string]: { year: number; month: number; day: number; paginasLeidas: number; }[] };

  @ViewChild("chart")
  chart: ChartComponent = new ChartComponent;
  chartOptions: CustomChartOptions | undefined;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private estadisticaService: EstadisticaService,
  ) {
    moment.locale('es');
    this.mockData = {
      "2022": [
        { year: 2022, month: 1, day: 1, paginasLeidas: 5 },
        { year: 2022, month: 1, day: 2, paginasLeidas: 10 },
        { year: 2022, month: 1, day: 3, paginasLeidas: 20 },
        { year: 2022, month: 2, day: 4, paginasLeidas: 15 },
        { year: 2022, month: 2, day: 5, paginasLeidas: 25 },
        { year: 2022, month: 3, day: 6, paginasLeidas: 30 },
        { year: 2022, month: 4, day: 7, paginasLeidas: 35 },
        { year: 2022, month: 3, day: 8, paginasLeidas: 40 },
        { year: 2022, month: 2, day: 9, paginasLeidas: 45 },
        { year: 2022, month: 6, day: 10, paginasLeidas: 50 },
        { year: 2022, month: 7, day: 11, paginasLeidas: 55 },
        { year: 2022, month: 7, day: 12, paginasLeidas: 60 },
        { year: 2022, month: 7, day: 13, paginasLeidas: 65 },
        { year: 2022, month: 8, day: 14, paginasLeidas: 70 },
        { year: 2022, month: 9, day: 15, paginasLeidas: 75 },
        { year: 2022, month: 12, day: 16, paginasLeidas: 80 },
        { year: 2022, month: 11, day: 17, paginasLeidas: 85 },
        { year: 2022, month: 11, day: 18, paginasLeidas: 90 },
        { year: 2022, month: 9, day: 19, paginasLeidas: 95 },
        { year: 2022, month: 9, day: 20, paginasLeidas: 100 },
      ],
      "2023": [
        { year: 2023, month: 2, day: 1, paginasLeidas: 15 },
        { year: 2023, month: 2, day: 2, paginasLeidas: 20 },
        { year: 2023, month: 3, day: 3, paginasLeidas: 25 },
        { year: 2023, month: 4, day: 4, paginasLeidas: 30 },
        { year: 2023, month: 5, day: 5, paginasLeidas: 35 },
        { year: 2023, month: 6, day: 6, paginasLeidas: 40 },
        { year: 2023, month: 6, day: 7, paginasLeidas: 45 },
        { year: 2023, month: 1, day: 8, paginasLeidas: 50 },
        { year: 2023, month: 2, day: 9, paginasLeidas: 55 },
        { year: 2023, month: 1, day: 10, paginasLeidas: 60 },
        { year: 2023, month: 1, day: 11, paginasLeidas: 65 },
        { year: 2023, month: 3, day: 12, paginasLeidas: 70 },
        { year: 2023, month: 4, day: 13, paginasLeidas: 75 },
        { year: 2023, month: 10, day: 14, paginasLeidas: 80 },
        { year: 2023, month: 9, day: 15, paginasLeidas: 85 },
        { year: 2023, month: 9, day: 16, paginasLeidas: 90 },
        { year: 2023, month: 9, day: 17, paginasLeidas: 95 },
        { year: 2023, month: 8, day: 18, paginasLeidas: 100 },
        { year: 2023, month: 10, day: 19, paginasLeidas: 105 },
        { year: 2023, month: 10, day: 20, paginasLeidas: 110 },
      ],
      "2024": [
        { year: 2024, month: 10, day: 1, paginasLeidas: 10 },
        { year: 2024, month: 10, day: 2, paginasLeidas: 20 },
        { year: 2024, month: 10, day: 3, paginasLeidas: 30 },
        { year: 2024, month: 11, day: 4, paginasLeidas: 40 },
        { year: 2024, month: 12, day: 5, paginasLeidas: 50 },
        { year: 2024, month: 12, day: 6, paginasLeidas: 60 },
        { year: 2024, month: 11, day: 7, paginasLeidas: 70 },
        { year: 2024, month: 1, day: 8, paginasLeidas: 80 },
        { year: 2024, month: 2, day: 9, paginasLeidas: 90 },
        { year: 2024, month: 3, day: 10, paginasLeidas: 100 },
        { year: 2024, month: 1, day: 11, paginasLeidas: 110 },
        { year: 2024, month: 2, day: 12, paginasLeidas: 120 },
        { year: 2024, month: 3, day: 13, paginasLeidas: 130 },
        { year: 2024, month: 11, day: 14, paginasLeidas: 140 },
        { year: 2024, month: 10, day: 15, paginasLeidas: 150 },
        { year: 2024, month: 7, day: 16, paginasLeidas: 160 },
        { year: 2024, month: 7, day: 17, paginasLeidas: 170 },
        { year: 2024, month: 7, day: 18, paginasLeidas: 180 },
        { year: 2024, month: 8, day: 19, paginasLeidas: 190 },
        { year: 2024, month: 8, day: 20, paginasLeidas: 200 },
      ]
    };
  }

  ngOnInit(): void {
    this.calculateYears();
    this.registerChart();
    this.createChartEstadoLectura();
    this.createChartLecturasPorGenero();
    this.renderHeatmapChart();
  }

  calculateYears(): void {
    if (this.mockData) {
      const currentYear = new Date().getFullYear();
      const years = Object.keys(this.mockData).map(year => parseInt(year));
      if (!years.includes(currentYear)) {
        this.availableYears = [...years, currentYear];
      } else {
        this.availableYears = years;
      }
      this.selectedYear = Math.max(currentYear, ...years);
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

  // createChartLecturasPorGenero() {
  //   this.subscriptions.add(
  //     this.estadisticaService.getLecturasEstadistica().subscribe(data => {
  //       this.chartInfo = data.estadisticas;
  //       if (this.chartInfo !== null && this.chartInfo) {
  //         this.chartInfo.forEach((element: { titulo: any; dato: any; }) => {
  //           this.labeldata.push(element.titulo);
  //           this.realdata.push(element.dato);
  //         });
  //         this.colordata = [
  //           "#FD9D9D",
  //           "#DA9F9F",
  //           "#C5C5C5",
  //           "#CFFFBE",
  //           "#FFE8AE",
  //           "#D6B7FF",
  //           "#C2F4FF"
  //         ],
  //           this.createChart(this.chartEstadoLecturas, 'LecturasPorGenero', 'LECTURAS POR GÉNERO', this.labeldata, this.realdata, this.colordata);
  //       }
  //     })
  //   );
  // }

  // createChartEstadoLectura() {
  //   this.subscriptions.add(
  //     this.estadisticaService.getGenerosEstadistica().subscribe(data => {
  //       this.chartInfo = data.estadisticas;
  //       if (this.chartInfo !== null) {
  //         this.chartInfo.forEach((element: { titulo: any; dato: any; }) => {
  //           this.labeldata.push(element.titulo);
  //           this.realdata.push(element.dato);
  //         });
  //         this.colordata = [
  //           '#FD9D9D',
  //           '#FFE8AE',
  //           '#CFFFBE'
  //         ],
  //           this.createChart(this.chartEstadoLecturas, 'EstadoLecturas', 'ESTADOS DE LECTURA', this.labeldata, this.realdata, this.colordata);
  //       }
  //     })
  //   );
  // }

  contadorUsuario() {
    this.subscriptions.add(
      this.estadisticaService.getContadorUsario().subscribe(data => {
        this.datosEstadisticaGenero = data;
      })
    );
  }

  createChartLecturasPorGenero() {
    // Mock de los datos para lecturas por género
    const mockData: EstadisticaResponse = {
      estadisticas: [
        { titulo: 'Ficción', dato: 50 },
        { titulo: 'No Ficción', dato: 30 },
        { titulo: 'Romántica', dato: 20 },
        { titulo: 'Ciencia', dato: 20 },
        { titulo: 'Terror', dato: 20 },
        { titulo: 'Negra', dato: 20 },
        { titulo: 'Infantil', dato: 20 },
      ]
    };

    // Utilizar datos mock en lugar de llamada al servicio
    of(mockData).subscribe(data => {
      this.lecturasPorGeneroInfo = data.estadisticas;
      if (this.lecturasPorGeneroInfo) {
        this.lecturasPorGeneroInfo.forEach((element: { titulo: any; dato: any; }) => {
          this.lecturasPorGeneroLabels.push(element.titulo);
          this.lecturasPorGeneroData.push(element.dato);
        });
        this.lecturasPorGeneroColors = [
          "#FD9D9D",
          "#DA9F9F",
          "#C5C5C5",
          "#CFFFBE",
          "#FFE8AE",
          "#D6B7FF",
          "#C2F4FF"
        ];
        this.createChart(this.chartLecturasPorGenero, 'LecturasPorGenero', 'LECTURAS POR GÉNERO', this.lecturasPorGeneroLabels, this.lecturasPorGeneroData, this.lecturasPorGeneroColors);
      }
    });
  }

  createChartEstadoLectura() {
    // Mock de los datos para estados de lectura
    const mockData: EstadisticaResponse = {
      estadisticas: [
        { titulo: 'Leído', dato: 50 },
        { titulo: 'Progreso', dato: 30 },
        { titulo: 'Favorito', dato: 20 },
      ]
    };

    // Utilizar datos mock en lugar de llamada al servicio
    of(mockData).subscribe(data => {
      this.estadoLecturasInfo = data.estadisticas;
      if (this.estadoLecturasInfo) {
        this.estadoLecturasInfo.forEach((element: { titulo: any; dato: any; }) => {
          this.estadoLecturasLabels.push(element.titulo);
          this.estadoLecturasData.push(element.dato);
        });
        this.estadoLecturasColors = [
          '#FD9D9D',
          '#FFE8AE',
          '#CFFFBE'
        ];
        this.createChart(this.chartEstadoLecturas, 'EstadoLecturas', 'ESTADOS DE LECTURA', this.estadoLecturasLabels, this.estadoLecturasData, this.estadoLecturasColors);
      }
    });
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

  renderHeatmapChart() {
    if (this.mockData) {
      const selectedYearData = this.mockData[this.selectedYear.toString()] || [];
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
          to: 1000,
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

  transformData(data: { year: number; month: number; day: number; paginasLeidas: number; }[]): { name: string, data: { x: string, y: number }[] }[] {
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
  }
}
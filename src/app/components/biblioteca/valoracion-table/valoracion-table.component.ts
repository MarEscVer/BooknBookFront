import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComentarioData } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-valoracion-table',
  templateUrl: './valoracion-table.component.html',
  styleUrls: ['./valoracion-table.component.scss']
})
export class ValoracionTableComponent {

  comentarios: ComentarioData[] = [
    {
      imagen: "",
      username: "usuario1",
      fechaValoracion: "2024-05-10",
      valoracion: 4,
      comentario: "Este es un comentario de ejemplo.",
      idLibro: 1
    },
    {
      imagen: "",
      username: "usuario2",
      fechaValoracion: "2024-05-09",
      valoracion: 5,
      comentario: "Este es un comentario de ejemplo.",
      idLibro: 1
    },
    {
      imagen: "",
      username: "usuario3",
      fechaValoracion: "2024-05-08",
      valoracion: 3,
      comentario: "Este es un comentario de ejemplo.",
      idLibro: 1
    }
  ];

  dataSource: MatTableDataSource<ComentarioData> = new MatTableDataSource<ComentarioData>(this.comentarios);

  length = 10;
  pageIndex = 0;
  pageSize = 10;
  pageEvent?: PageEvent;

  @Input() estiloPerfil?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.dataSource = new MatTableDataSource<ComentarioData>([]);
  }

  ngOnInit() {

    // this.loadData();

    if (this.comentarios) {
      this.dataSource = new MatTableDataSource<ComentarioData>(this.comentarios);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
    }
  }

  loadData() {
    //TODO LLAMAR SERVICIO --> TENER EN CUENTA EL estiloPerfil para hacer una llamada u otra
    // PERFILPROPIO --> PERFIL DE OTRA PERSONA QUE ESTÁ BUSCANDO
  }

  applyFilter(event: Event) {

  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.subscriptions.unsubscribe();
  }

}

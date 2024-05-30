import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
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
      imagenUsuario: "",
      username: "string",
      fechaComentario: "2024-05-10",
      valoracion: 4,
      comentario: "Este es un comentario de ejemplo.",
      valoracionIdLibro: 1,
      valoracionIdUsuario: 1,
      estaDenunciado: true,
    },
    {
      imagenUsuario: "",
      username: "Xalo",
      fechaComentario: "2024-05-09",
      valoracion: 5,
      comentario: "Este es un comentario de ejemplo.",
      valoracionIdLibro: 1,
      valoracionIdUsuario: 2,
      estaDenunciado: true,
    },
    {
      imagenUsuario: "",
      username: "Andrea",
      fechaComentario: "2024-05-08",
      valoracion: 3,
      comentario: "Este es un comentario de ejemplo.",
      valoracionIdLibro: 1,
      valoracionIdUsuario: 3,
      estaDenunciado: true,
    }
  ];

  dataSource: MatTableDataSource<ComentarioData>;

  itemsPerPageOptions = [5, 10, 25, 50];
  itemsPerPage = 5;
  currentPage = 0;
  totalItems = 0;
  filter: string = '';
  isLoading: boolean = false;

  @Input() estiloPerfil?: string;

  @ViewChild(MatSort) sort?: MatSort;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.dataSource = new MatTableDataSource<ComentarioData>([]);
  }

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    this.subscribeToSort();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filter = filterValue;
    this.currentPage = 0;
    this.loadData();
  }

  subscribeToSort() {
    if (this.sort) {
      this.subscriptions.add(
        this.sort.sortChange.subscribe((sort: Sort) => {
          this.loadData();
        })
      );
    }
  }

  loadData() {
    //TODO LLAMAR SERVICIO --> TENER EN CUENTA EL estiloPerfil para hacer una llamada u otra
    // PERFILPROPIO --> PERFIL DE OTRA PERSONA QUE ESTÁ BUSCANDO
    // const newPage = Math.floor((this.currentPage * this.itemsPerPage) / this.itemsPerPage);
    // this.currentPage = newPage;
    // this.isLoading = true;
    // if (this.tipo === 'P') {
    //   this.subscriptions.add(
    //     this.clubService.getListClubesPertenece(this.currentPage, this.itemsPerPage).subscribe(data => {
    //       if (data.nombreGrupos) {
    //         this.clubes = data.nombreGrupos;
    //         this.dataSource.data = data.nombreGrupos;
    //         this.totalItems = data.pageInfo.totalElements;
    //         this.isLoading = false;
    //       }
    //     })
    //   );

  }

  nextPage() {
    const totalPages = this.totalPages();
    if (this.currentPage < totalPages - 1) {
      this.currentPage++;
      this.loadData();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadData();
    }
  }

  totalPages() {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onItemsPerPageChange(newItemsPerPage: number) {
    this.itemsPerPage = newItemsPerPage;
    this.currentPage = 0;
    this.loadData();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.subscriptions.unsubscribe();
  }

}

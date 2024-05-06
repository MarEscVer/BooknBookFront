import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ComentarioService } from 'src/app/services/comentario/comentario.service';
import { ComentarioDenunciadoItemList } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-listado-items-comentarios',
  templateUrl: './listado-items-comentarios.component.html',
  styleUrls: ['./listado-items-comentarios.component.scss']
})
export class ListadoItemsComentariosComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['username', 'date', 'comentario', 'razon', 'actions'];

  dataSource: MatTableDataSource<ComentarioDenunciadoItemList>;
  editedItems: ComentarioDenunciadoItemList[] = [];
  originalRol: string = '';

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
    private subscriptions: Subscription = new Subscription();
  
  constructor(
    public comentarioService: ComentarioService
  ) {
    this.dataSource = new MatTableDataSource<ComentarioDenunciadoItemList>([]);
  }

  ngOnInit() {
    this.loadData();
  }


  ngAfterViewInit() {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.dataSource && this.sort) {
      this.dataSource.sort = this.sort;
    }

    this.subscribeToPaginator();
    this.subscribeToSort();
    this.loadData();

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.paginator?.firstPage();
    this.loadData(filterValue);
  }

  subscribeToPaginator() {
    if (this.paginator) {
      this.subscriptions.add(
        this.paginator.page.subscribe(() => {
          this.loadData();
        })
      );
    }
  }

  subscribeToSort() {
    if (this.sort) {
      this.subscriptions.add(
        this.sort.sortChange.subscribe(() => {
          this.loadData();
        })
      );
    }
  }

  loadData(filter: string = '') {
    const pageIndex = this.paginator?.pageIndex || 0;
    const pageSize = this.paginator?.pageSize || 5;
    this.subscriptions.add(
      this.comentarioService.getListComentariosDenunciados(pageIndex, pageSize, filter).subscribe(data => {
        if (data.comentariosDenunciados) {
          this.dataSource = new MatTableDataSource<ComentarioDenunciadoItemList>(data.comentariosDenunciados);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

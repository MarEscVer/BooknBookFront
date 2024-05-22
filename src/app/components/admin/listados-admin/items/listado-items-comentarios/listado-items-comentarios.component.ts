import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';import { ValoracionModalComponent } from 'src/app/components/modal/valoracionModal/valoracion-modal/valoracion-modal.component';
import { ComentarioService } from 'src/app/services/comentario/comentario.service';
import { ComentarioDenunciadoItemList, ComentarioResponse } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-listado-items-comentarios',
  templateUrl: './listado-items-comentarios.component.html',
  styleUrls: ['./listado-items-comentarios.component.scss']
})
export class ListadoItemsComentariosComponent implements OnInit {
  displayedColumns: string[] = ['username', 'date', 'comentario', 'razon', 'actions'];

  dataSource: MatTableDataSource<ComentarioDenunciadoItemList>;

  itemsPerPageOptions = [5, 10, 25, 50];
  itemsPerPage = 5;
  currentPage = 0;
  totalItems = 0;
  selectedFilter: string = 'PENDIENTE';
  isLoading: boolean = true;

  modalInfo: ComentarioResponse = {message: ''};

  private subscriptions: Subscription = new Subscription();

  constructor(
    public comentarioService: ComentarioService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<ComentarioDenunciadoItemList>([]);
  }

  ngOnInit() {
    this.loadData();
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

  loadData() {
    const newPage = Math.floor((this.currentPage * this.itemsPerPage) / this.itemsPerPage);
    this.currentPage = newPage;
    this.isLoading = true;
    this.subscriptions.add(
      this.comentarioService.getListComentariosDenunciados(this.currentPage, this.itemsPerPage, this.selectedFilter).subscribe(data => {
        if (data.comentariosDenunciados) {
          this.dataSource.data = data.comentariosDenunciados;
          this.totalItems = data.pageInfo.totalElements;
          this.isLoading = false;
        }
      })
    );
  }

  loadComentario(idLibro: number, idUsuario: number) {
    this.subscriptions.add(
      this.comentarioService.getComentarioDenunciado(idLibro, idUsuario).subscribe(data => {
        if (data.message) {
          this.modalInfo.message = data.message;
          const dialogValoracion = this.dialog.open(ValoracionModalComponent, {
            width: '50%',
            data: {
              modalInfo: this.modalInfo,
            }
          })
        }
      })
    );
  }

  onFilterChange(event: any) {
    this.loadData();
  }

  handleCommentAction() {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

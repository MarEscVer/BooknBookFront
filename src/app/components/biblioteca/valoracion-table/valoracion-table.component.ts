import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComentarioService } from 'src/app/services/comentario/comentario.service';
import { Book } from 'src/app/shared/models/book/book';
import { ComentarioData } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-valoracion-table',
  templateUrl: './valoracion-table.component.html',
  styleUrls: ['./valoracion-table.component.scss']
})
export class ValoracionTableComponent implements OnInit, OnDestroy {

  comentarios?: ComentarioData[];

  itemsPerPageOptions = [5, 10, 25, 50];
  itemsPerPage = 5;
  currentPage = 0;
  totalItems = 0;
  filter: string = '';
  isLoading: boolean = false;

  @Input() libro?: Book;
  @Input() estiloPerfil?: string;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private comentarioService: ComentarioService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    //TODO LLAMAR SERVICIO --> TENER EN CUENTA EL estiloPerfil para hacer una llamada u otra
    // PERFILPROPIO --> PERFIL DE OTRA PERSONA QUE ESTÁ BUSCANDO
    const newPage = Math.floor((this.currentPage * this.itemsPerPage) / this.itemsPerPage);
    this.currentPage = newPage;
    this.isLoading = true;

    if (this.libro) {
      this.subscriptions.add(
        this.comentarioService.getListComentarioLibro(this.currentPage, this.itemsPerPage, this.libro.id).subscribe(data => {
          if (data.valoraciones) {
            this.comentarios = data.valoraciones;
            this.totalItems = data.pageInfo.totalElements;
            this.isLoading = false;
          }
        })
      );
    }
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
    this.subscriptions.unsubscribe();
  }

}

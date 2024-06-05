import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComentarioService } from 'src/app/services/comentario/comentario.service';
import { Book } from 'src/app/shared/models/book/book';
import { ComentarioData } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-valoracion-table',
  templateUrl: './valoracion-table.component.html',
  styleUrls: ['./valoracion-table.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class ValoracionTableComponent implements OnInit, OnDestroy, OnChanges {

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
    private comentarioService: ComentarioService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('libro' in changes) {
      this.loadData();
    }
  }

  loadData() {
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

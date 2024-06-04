import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AutorService } from 'src/app/services/autor/autor.service';
import { BookItemCard } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss']
})
export class ListBookComponent implements OnInit, OnDestroy {

  listadoLibros?: BookItemCard[];
  loading: boolean = true;

  @Input() idAutor?: number;
  private subscriptions: Subscription = new Subscription();
  @Output() datosCargados = new EventEmitter<boolean>();

  constructor(
    public autorService: AutorService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (this.idAutor) {
      this.subscriptions.add(this.autorService.getLibrosAutor(this.idAutor).subscribe(data => {
        if (data.libros) {
          this.listadoLibros = data.libros;
          this.loading = false;
          this.datosCargados.emit(true);
        }
      }));
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

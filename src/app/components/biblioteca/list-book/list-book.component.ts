import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AutorService } from 'src/app/services/autor/autor.service';
import { BookItemCard } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss']
})
export class ListBookComponent implements OnInit, OnDestroy {

  listadoLibros?: BookItemCard[];

  @Input() idAutor?: number;

  private subscriptions: Subscription = new Subscription();

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
          console.log(this.listadoLibros);
        }
      }));
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

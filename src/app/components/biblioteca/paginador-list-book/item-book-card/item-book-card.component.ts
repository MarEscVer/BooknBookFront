import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { Book, BookItemCard } from 'src/app/shared/models/book/book';
import { sinDiacriticos } from 'src/app/shared/utils/acentos';

@Component({
  selector: 'app-item-book-card',
  templateUrl: './item-book-card.component.html',
  styleUrls: ['./item-book-card.component.scss'],
})
export class ItemBookCardComponent implements OnDestroy {

  @Input() libro!: BookItemCard;
  imgNoData: string = '/assets/img/iconoLibro.jpg';

  libroSeleccionado?: Book;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  fichaLibro(id: number) {
    this.subscriptions.add(
      this.bookService.getBookById(id).subscribe(data => {
        if (data) {
          this.libroSeleccionado = data;
          this.bookService.setLibro(this.libroSeleccionado);
  
          const genero = this.libroSeleccionado.genero ? this.libroSeleccionado.genero.nombre : this.libroSeleccionado.tipo.nombre;
          const titulo = this.libroSeleccionado.titulo;
          const generoUrl = sinDiacriticos(genero.toLowerCase().replace(/ /g, '-'));
          const tituloUrl = sinDiacriticos(titulo.toLowerCase().replace(/ /g, '-'));
  
          const ruta = ['/biblioteca', generoUrl, tituloUrl];
          this.router.navigate(ruta);
        }
      })
    );
  }
  

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, forkJoin, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BookService } from 'src/app/services/book/book.service';
import { MasLeidosBookService } from 'src/app/services/book/mas-leidos-book.service';
import { ComentarioService } from 'src/app/services/comentario/comentario.service';
import { Book } from 'src/app/shared/models/book/book';
import { ValoracionData } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.scss']
})
export class LibroComponent implements OnInit, OnDestroy {

  libro?: Book;
  valoracion?: ValoracionData;
  valoracionUsuario: boolean = false;

  userRole?: string | null;
  estiloBoton: string = 'VALORACION';

  stars = [0, 1, 2, 3, 4];
  valoracionMedia: number = 0;

  //TODO VALORACION NECESITO
  contadorComentario: number = 0;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    public masLeidosBookService: MasLeidosBookService,
    private bookService: BookService,
    private authService: AuthService,
    private valoracionService: ComentarioService
  ) { }

  ngOnInit(): void {
    //TODO LLAMADA PARA OBTENER EL ID DE VALORACION --> SI TENGO ID!=0 ABRIR MODAL
    //ADD VALORACION SINO, MODAL DE INTERESES

    this.subscriptions.add(
      this.authService.userRole$.subscribe(role => {
        this.userRole = role;
      })
    );

    this.subscriptions.add(
      this.bookService.libroSeleccionado$.subscribe(libro => {
        this.libro = libro;
        if (this.libro) {
          this.valoracionMedia = this.libro.valoracionMedia ?? 0;
          this.contadorComentario = 20 ?? 0;
        }
      })
    );

    this.subscriptions.add(
      this.valoracionService.getValoracion().subscribe(valoracion => {
        this.valoracion = valoracion;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

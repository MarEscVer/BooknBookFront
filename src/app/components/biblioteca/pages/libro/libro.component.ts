import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BookService } from 'src/app/services/book/book.service';
import { MasLeidosBookService } from 'src/app/services/book/mas-leidos-book.service';
import { ComentarioService } from 'src/app/services/comentario/comentario.service';
import { UserService } from 'src/app/services/user/user.service';
import { Book } from 'src/app/shared/models/book/book';
import { ValoracionResponse } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.scss']
})
export class LibroComponent implements OnInit, OnDestroy {

  libro?: Book;
  valoracionUsuario: boolean = false;
  modalInfoAddOpinion?: ValoracionResponse;

  userRole?: string | null;
  estiloBoton: string = 'VALORACION';

  stars = [0, 1, 2, 3, 4];
  valoracionMedia: number = 0;

  contadorComentario: number = 0;
  private subscriptions: Subscription = new Subscription();

  constructor(
    public masLeidosBookService: MasLeidosBookService,
    private bookService: BookService,
    private authService: AuthService,
    private usuarioService: UserService,
    private comentarioService: ComentarioService,
  ) { }

  ngOnInit(): void {
    this.loadComboMotivoDenuncia();
    this.subscriptions.add(
      this.authService.userRole$.subscribe(role => {
        this.userRole = role;
      })
    );
    this.subscriptions.add(
      this.bookService.libroSeleccionado$.subscribe(libro => {
        this.libro = libro;
        if (this.libro) {
          this.valoracionMedia = Math.round(this.libro.calificacionMedia ?? 0);
          this.contadorComentario = this.libro.contadorComentario ?? 0;
          this.subscriptions.add(
            this.usuarioService.vincularUsuarioLibro(this.libro.id, this.libro?.estado).subscribe({
              next: (valoracion) => {
                this.modalInfoAddOpinion = valoracion;
              }
            }));
        }
      })
    );
  }

  loadComboMotivoDenuncia() {
    this.subscriptions.add(
      this.comentarioService.motivoDenuncia$.subscribe(motivoDenuncia => {
        if (!motivoDenuncia) {
          this.comentarioService.getComboMotivoDenuncia().subscribe();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

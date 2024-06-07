import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, take, tap } from 'rxjs';
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

  libro$?: Observable<Book | undefined>;
  valoracionUsuario: boolean = false;
  modalInfoAddOpinion?: ValoracionResponse;
  libro?: Book;

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
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadComboMotivoDenuncia();
    this.libro$ = this.bookService.libroSeleccionado$.pipe(
      tap(libro => {
        if (libro) {
          this.valoracionMedia = Math.round(libro.calificacionMedia ?? 0);
          this.contadorComentario = libro.contadorComentario ?? 0;
          if (this.userRole) {
            this.subscriptions.add(this.usuarioService.vincularUsuarioLibro(libro.id, libro.estado).subscribe({
              next: (valoracion) => {
                this.modalInfoAddOpinion = valoracion;
              }
            }));
          }
        }
      })
    );
    this.editarModal();
    this.addModal();
    this.interesModal();
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
    });
  }

  editarModal() {
    this.subscriptions.add(this.usuarioService.modalEditarLecturaData$.subscribe(data => {
      if (data) {
        this.subscriptions.add(this.usuarioService.editarUsuarioLibro(data).subscribe(
          {
            next: () => {
              this.updateLibroSeleccionadoProgreso();
              this.usuarioService.clearModalEditarLecturaData();
            }
          }
        ));
      }
    }));
  }

  addModal() {
    this.subscriptions.add(this.usuarioService.modalAddValoracionData$.subscribe(data => {
      if (data) {
        this.subscriptions.add(this.usuarioService.editarUsuarioLibro(data).subscribe(
          {
            next: () => {
              this.updateLibroSeleccionadoLeido();
              this.usuarioService.clearModalAddValoracionData();
            }
          }
        ));
      }
    }));
  }

  interesModal() {
    this.subscriptions.add(this.usuarioService.modalInteresData$.subscribe(data => {
      if (data) {
        this.subscriptions.add(this.usuarioService.editarUsuarioLibro(data).subscribe(
          {
            next: () => {
              this.updateLibroSeleccionadoFavorito();
              this.usuarioService.clearModalInteresData();
            }
          }
        ));
      }
    }));
  }

  updateLibroSeleccionadoProgreso() {
    this.subscriptions.add(
      this.bookService.libroSeleccionado$.subscribe(libro => {
        this.libro = libro;
      })
    );
    if (this.libro) {
      this.libro.estado = 'PROGRESO';
      this.bookService.setLibro(this.libro);
    }
  }

  updateLibroSeleccionadoLeido() {
    this.subscriptions.add(
      this.bookService.libroSeleccionado$.subscribe(libro => {
        this.libro = libro;
      })
    );
    if (this.libro) {
      this.libro.estado = 'LEIDO';
      this.bookService.setLibro(this.libro);
    }
  }

  updateLibroSeleccionadoFavorito() {
    this.subscriptions.add(
      this.bookService.libroSeleccionado$.subscribe(libro => {
        this.libro = libro;
      })
    );
    if (this.libro) {
      this.libro.estado = 'FAVORITO';
      this.bookService.setLibro(this.libro);
    }
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

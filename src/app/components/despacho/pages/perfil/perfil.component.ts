import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MasLeidosBookService } from 'src/app/services/book/mas-leidos-book.service';
import { UserService } from 'src/app/services/user/user.service';
import { BookItemCard } from 'src/app/shared/models/book/book';
import { applyColors } from 'src/app/shared/models/combo/combo';
import { PerfilUsuarioData } from 'src/app/shared/models/users/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class PerfilComponent implements OnInit, OnDestroy {

  @Input() usernamePerfil?: string;
  perfilUsuario?: PerfilUsuarioData;
  userUsername?: string | null;

  libros?: BookItemCard[];
  librosPorPagina: BookItemCard[][] = [];
  isMobile: boolean = false;
  current = 0;
  size = 10;
  loading: boolean = true;
  opcionSize: boolean = false;

  imgNoData: string = '/assets/img/iconoPerfil.jpg';
  tipoStyle: any = {};
  generoStyle: any = {};
  coloresGeneroTipo: boolean = false;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UserService,
    public masLeidosBookService: MasLeidosBookService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['username']) {
        this.usernamePerfil = params['username'];
      }
    });
    if (this.usernamePerfil) {
      this.userUsername = this.usernamePerfil;
      this.loadData();
      this.onResize();
    } else {
      this.subscriptions.add(
        this.authService.userUsername$.subscribe(username => {
          this.userUsername = username;
          this.loadData();
          this.onResize();
        })
      );
    }
  }

  loadData(): void {
    const username = this.userUsername ?? ''; // Si userUsername es null o undefined, asigna un string vacío

    this.subscriptions.add(
      this.usuarioService.getUserByUsername(username).pipe(
        switchMap(data => {
          if (data) {
            this.perfilUsuario = data;
          }
          return this.masLeidosBookService.getListadoFavoritosUsuario(username);
        })
      ).subscribe(data => {
        if (data.libros) {
          this.libros = data.libros;
          this.dividirLibrosPorPagina();
          this.setcolores();
          this.loading = false;
        }
      })
    );
  }

  setcolores() {
    if (this.perfilUsuario) {
      const perfilConColores = applyColors([this.perfilUsuario])[0];
      this.perfilUsuario = perfilConColores;

      if (this.perfilUsuario?.tipo) {
        this.tipoStyle = {
          'background-color': this.perfilUsuario.tipo.color,
          'color': 'black',
          'border-radius': '20px',
          'padding': '5px',
        };
      }
      if (this.perfilUsuario?.genero) {
        this.generoStyle = {
          'background-color': this.perfilUsuario.genero.color,
          'color': 'black',
          'border-radius': '5px',
          'padding': '5px',
        };
      }
      this.coloresGeneroTipo = true;
    }
  }

  rutaEditarPerfil() {
    this.router.navigate(['/mi-despacho/perfil/configuracion']);
  }

  follow() {
    if (this.userUsername) {
      this.subscriptions.add(
        this.usuarioService.followUser(this.userUsername).subscribe(data => {
          if (data) {
            if(this.perfilUsuario){
              this.perfilUsuario.seguir = true;
            }
          }
        })
      );
    }
  }

  unfollow() {
    if (this.userUsername) {
      this.subscriptions.add(
        this.usuarioService.unFollowUser(this.userUsername).subscribe(data => {
          if (data) {
            if(this.perfilUsuario){
              this.perfilUsuario.seguir = false;
            }
          }
        })
      );
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.isMobile = window.innerWidth <= 576;
    this.dividirLibrosPorPagina();
  }

  dividirLibrosPorPagina() {
    this.librosPorPagina = [];
    let librosPorPagina = 1;

    const screenWidth = window.innerWidth;
    if (!this.isMobile && !this.opcionSize) {
      if (screenWidth >= 1300) {
        librosPorPagina = 5;
      } else if (screenWidth >= 1000) {
        librosPorPagina = 4;
      } else if (screenWidth >= 790) {
        librosPorPagina = 3;
      } else if (screenWidth >= 577) {
        librosPorPagina = 2;
      }
    }

    if (!this.isMobile && this.opcionSize) {
      if (screenWidth >= 1100) {
        librosPorPagina = 3;
      } else if (screenWidth >= 790) {
        librosPorPagina = 2;
      }
    }

    if (this.libros) {
      for (let i = 0; i < this.libros.length; i += librosPorPagina) {
        this.librosPorPagina.push(this.libros.slice(i, i + librosPorPagina));
      }
    }
  }

  nextCarouselItem() {
    this.current = (this.current + 1) % this.librosPorPagina.length;
  }

  prevCarouselItem() {
    this.current = (this.current - 1 + this.librosPorPagina.length) % this.librosPorPagina.length;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

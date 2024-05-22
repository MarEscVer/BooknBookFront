import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { MasLeidosBookService } from 'src/app/services/book/mas-leidos-book.service';
import { UserService } from 'src/app/services/user/user.service';
import { PerfilUsuarioData } from 'src/app/shared/models/users/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit, OnDestroy {

  @Input() usernamePerfil?: string;
  perfilUsuario?: PerfilUsuarioData;
  userUsername?: string | null;

  imgNoData: string = '/assets/img/iconoPerfil.jpg';
  tipoStyle: any = {};
  generoStyle: any = {};

  /**
* Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
*/
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UserService,
    public masLeidosBookService: MasLeidosBookService,
  ) { }

  ngOnInit(): void {
    if (this.usernamePerfil) {
      this.userUsername = this.usernamePerfil;
      this.loadData();
    } else {
      this.subscriptions.add(
        this.authService.userUsername$.subscribe(username => {
          this.userUsername = username;
          this.loadData();
        })
      );
    }
    if (this.perfilUsuario) {
      this.tipoStyle = {
        'background-color': '#' + this.perfilUsuario.tipo.color,
        'color': 'black',
        'border-radius': '20px',
        'padding': '5px',
      };

      this.generoStyle = {
        'background-color': '#' + this.perfilUsuario.genero.color,
        'color': 'black',
        'border-radius': '5px',
        'padding': '5px',
      };
    }
  }

  loadData() {
    if (this.userUsername && this.userUsername !== null) {
      this.subscriptions.add(this.usuarioService.getUserByUsername(this.userUsername).subscribe(data => {
        if (data) {
          this.perfilUsuario = data;
        }
      })
      );
    }
  }

  rutaEditarPerfil() {
    this.router.navigate(['/mi-despacho/perfil/configuracion']);
  }

  follow() {
    console.log('SEGUIR');
  }

  unfollow() {
    console.log('DEJAR DE SEGUIR');
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

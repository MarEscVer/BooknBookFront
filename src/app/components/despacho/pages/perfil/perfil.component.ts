import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { PerfilUsuarioData } from 'src/app/shared/models/users/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit, OnDestroy {

  perfilUsuario: PerfilUsuarioData = {
    id: 1,
    imagen: '',
    username: 'usuario123',
    nombre: 'Juan Pérez',
    genero: {
      "id": 1,
      "nombre": "ROMÁNTICA",
      "color": "FD9D9D"
    },
    tipo: {
      "id": 8,
      "nombre": "JUVENIL",
      "color": "ECCEC5"
    },
    seguir: false
  };

  imgNoData: string = '/assets/img/iconoPerfil.jpg';
  tipoStyle: any = {};
  generoStyle: any = {};

  userUsername?: string | null;
  perfilPropio: boolean = false;

  /**
* Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
*/
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    //TODO LLAMAR ENDPOINT GET DATOS USUARIO
    this.subscriptions.add(
      this.authService.userUsername$.subscribe(username => {
        this.userUsername = username;
        if(this.userUsername === this.perfilUsuario.username) {
          this.perfilPropio = true;
        }
      })
    );
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

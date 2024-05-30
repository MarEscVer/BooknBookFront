import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ComentarioData } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-valoracion-table-item',
  templateUrl: './valoracion-table-item.component.html',
  styleUrls: ['./valoracion-table-item.component.scss']
})
export class ValoracionTableItemComponent implements OnInit, OnDestroy {

  @Input() comentario!: ComentarioData;
  @Input() estiloPerfil?: string;

  imgNoData: string = '/assets/img/iconoPerfil.jpg';
  stars = [0, 1, 2, 3, 4];

  userRole?: string | null;
  estiloBoton: string = 'DENUNCIA';
  estiloBotonComentario: string = 'EDITAR';

  // TODO CONSEGUIR DATOS PARA MODAL --> app-user-valoracion-button
  // modalInfo!: ValoracionData;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.userRole$.subscribe(role => {
        this.userRole = role;
      })
    );
  }

  goPerfil(username: string) {
    this.router.navigate(['/usuarios/perfil', username]);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

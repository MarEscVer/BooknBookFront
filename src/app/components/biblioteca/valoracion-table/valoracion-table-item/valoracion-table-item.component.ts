import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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

  //CONSEGUIR DATOS PARA MODAL --> app-user-valoracion-button
  // modalInfo!: ValoracionData;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.userRole$.subscribe(role => {
        this.userRole = role;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

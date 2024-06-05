import { trigger, transition, style, animate } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ComentarioService } from 'src/app/services/comentario/comentario.service';
import { ComentarioData } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-list-comentarios-usuario',
  templateUrl: './list-comentarios-usuario.component.html',
  styleUrls: ['./list-comentarios-usuario.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class ListComentariosUsuarioComponent implements OnInit, OnDestroy {

  comentarios?: ComentarioData[];
  isLoading: boolean = false;

  @Input() estiloPerfil?: string;
  @Input() username?: string | null;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private comentarioService: ComentarioService,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    if (this.username) {
      this.subscriptions.add(
        this.comentarioService.getListComentarioUsuario(this.username).subscribe(data => {
          if (data.valoraciones) {
            this.comentarios = data.valoraciones;
            this.isLoading = false;
          }
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}

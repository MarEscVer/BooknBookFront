import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AutorService } from 'src/app/services/autor/autor.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AutorData } from 'src/app/shared/models/autor/autor';
import { Book } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-ficha-libro',
  templateUrl: './ficha-libro.component.html',
  styleUrls: ['./ficha-libro.component.scss']
})
export class FichaLibroComponent implements OnInit, OnDestroy {

  @Input() libro?: Book;
  autorSeleccionado?: AutorData;

  stars = [0, 1, 2, 3, 4];
  valoracionMedia: number = 0;
  isExpanded: boolean = false;
  tipoStyle: any = {};
  generoStyle: any = {};
  userRole?: string | null;
  estiloBoton: string = 'INTERES';

  imgNoData: string = '/assets/img/iconoLibro.jpg';

  private subscriptions: Subscription = new Subscription();

  constructor(
    private autorService: AutorService,
    private route: ActivatedRoute,
    private router: Router,
    private notification: NotificationService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.userRole$.subscribe(role => {
        this.userRole = role;
      })
    );
    if (this.libro) {
      this.valoracionMedia = this.libro.valoracionMedia ?? 0;
      this.tipoStyle = {
        'background-color': '#' + this.libro.tipo.color,
        'color': 'black',
        'border-radius': '20px',
        'padding': '5px',
      };

      this.generoStyle = {
        'background-color': '#' + this.libro.genero.color,
        'color': 'black',
        'border-radius': '5px',
        'padding': '5px',
      };
    }
  }

  toggleDescription() {
    this.isExpanded = !this.isExpanded;
  }

  //TODO mirar que funcione (no compro9bable hasta ficha libro hecha)
  autorLibro(id: number) {
    if (this.libro) {
      this.subscriptions.add(
        this.autorService.getAutorById(this.libro.autor.id).subscribe(data => {
          if (data) {
            this.autorSeleccionado = data;
            this.autorService.setAutor(this.autorSeleccionado);
            let autor: string = this.autorSeleccionado.pseudonimo.toLowerCase().replaceAll(' ', '-');
            this.router.navigate(['/biblioteca/autores/perfil', autor]);
          }
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}


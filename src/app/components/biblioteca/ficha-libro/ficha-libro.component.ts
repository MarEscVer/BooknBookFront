import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AutorService } from 'src/app/services/autor/autor.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { AutorData } from 'src/app/shared/models/autor/autor';
import { Book } from 'src/app/shared/models/book/book';
import { applyColors } from 'src/app/shared/models/combo/combo';

@Component({
  selector: 'app-ficha-libro',
  templateUrl: './ficha-libro.component.html',
  styleUrls: ['./ficha-libro.component.scss']
})
export class FichaLibroComponent implements OnInit, OnDestroy {

  @Input() libro$?: Observable<Book | undefined>;
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
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.userRole$.subscribe(role => {
        this.userRole = role;
      })
    );
  }

  applyColorsToBook(libro: Book): void {
    if (libro) {
      this.valoracionMedia = libro.calificacionMedia ?? 0;
      const libroConColores = applyColors([libro])[0];
      libro = libroConColores;
      if (libro.tipo) {
        this.tipoStyle = {
          'background-color': libro.tipo.color,
          'color': 'black',
          'border-radius': '20px',
          'padding': '5px',
        };
      }
      if (libro.genero) {
        this.generoStyle = {
          'background-color': libro.genero.color,
          'color': 'black',
          'border-radius': '5px',
          'padding': '5px',
        };
      }    
    }
  }

  toggleDescription() {
    this.isExpanded = !this.isExpanded;
  }

  autorLibro(id: number) {
    if (this.libro$) {
      this.subscriptions.add(
        this.autorService.getAutorById(id).subscribe(data => {
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


import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { BookImageListResponse, BookItemCard } from 'src/app/shared/models/book/book';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-imagen-list-book-card',
  templateUrl: './imagen-list-book-card.component.html',
  styleUrls: ['./imagen-list-book-card.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})

export class ImagenListBookCardComponent implements OnInit, OnDestroy {

  libros?: BookItemCard[];

  librosPorPagina: BookItemCard[][] = [];
  isMobile: boolean = false;
  current = 0;
  size = 10;
  loading: boolean = true;

  @Input() listadoService: any;
  @Input() generoObs?: Observable<string>;
  @Input() opcionSize?: boolean = false;
  @Input() titulo?: string;
  genero!: string;

  private subscriptions: Subscription = new Subscription();
  @Output() datosCargados = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    this.subscriptions.add(this.generoObs?.subscribe(genero => {
      this.genero = genero;
    }));
    this.loadData();
    this.onResize();
  }

  loadData() {
    this.subscriptions.add(this.listadoService.getListado(this.size).subscribe((data: BookImageListResponse) => {
      if (data.libros) {
        this.libros = data.libros;
        this.dividirLibrosPorPagina();
        this.loading = false;
        this.datosCargados.emit(true);
      }
    },
      (error: any) => {
        this.loading = false;
      }
    ));
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

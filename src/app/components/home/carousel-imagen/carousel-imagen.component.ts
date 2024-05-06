import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'app-carousel-imagen',
  templateUrl: './carousel-imagen.component.html',
  styleUrls: ['./carousel-imagen.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class CarouselImagenComponent implements OnInit {
  current = 0;
  lista = [
    { imagen: 'novedades.png',
    alt: 'Imagen 1',
    link: 'URL_de_Redirección_1',
    boton: 'NOVEDADES',
    texto: 'Descubre nuestras últimas incorporaciones a la biblioteca. ¡Explora libros emocionantes y sumérgete en nuevas historias hoy mismo!' },
    { imagen: 'clubs.png',
    alt: 'Imagen 2',
    link: 'URL_de_Redirección_2',
    boton: 'CLUBES',
    texto: 'Explora nuevos clubes de lectura y sumérgete en experiencias literarias únicas en nuestra aplicación.' },
    { imagen: 'comenta.png',
    alt: 'Imagen 3',
    link: 'URL_de_Redirección_2',
    boton: 'REGISTRATE',
    texto: 'Descubre historias fascinantes y únete a una comunidad apasionada de lectores en nuestra aplicación' },
  ];

  ngOnInit() {
    setInterval(() => {
      this.current = ++this.current % this.lista.length;
    }, 6000);
  }

  nextImage() {
    this.current = (this.current + 1) % this.lista.length;
  }

  prevImage() {
    this.current = (this.current - 1 + this.lista.length) % this.lista.length;
  }

  redirectTo(link: string) {
    // Aquí puedes redirigir a la URL proporcionada
    window.location.href = link;
  }

}
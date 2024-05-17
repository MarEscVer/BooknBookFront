import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';
import { Book, BookItemCard } from 'src/app/shared/models/book/book';
import { sinDiacriticos } from 'src/app/shared/utils/acentos';

@Component({
  selector: 'app-item-book-card',
  templateUrl: './item-book-card.component.html',
  styleUrls: ['./item-book-card.component.scss'],
})
export class ItemBookCardComponent {

  @Input() libro!: BookItemCard;
  imgNoData: string = '/assets/img/iconoLibro.jpg';

  libroSeleccionado: Book = {
    id: 1,
    imagen: "",
    titulo: "El nombre del viento",
    autor: {
      "id": 1,
      "pseudonimo": "Patrick Rothfuss",
    },
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
    fechaPublicacion: "2007-03-27",
    paginasTotales: 662,
    valoracionMedia: 4,
    estado: "PROGRESO",
    saga: "El nombre del viento",
    descripcion: "Atípica, profunda y sincera, El nombre del viento es una novela de aventuras, de historias dentro de otras historias, de misterio, de amistad, de amor, de magia y de superación. La novela que ha consagrado a Patrick Rothfuss como fenómeno editorial de los últimos años. En una posada en tierra de nadie, un hombre se dispone a relatar, por primera vez, la autentica historia de su vida.Una historia que únicamente el conoce y que ha quedado diluida tras los rumores, las conjeturas y los cuentos de taberna que le han convertido en un personaje legendario a quien todos daban ya por muerto: Kvothe...músico, mendigo, ladrón, estudiante, mago, heroe y asesino. Ahora va a revelar la verdad sobre sí mismo.Y para ello debe empezar por el principio: su infancia en una troupe de artistas itinerantes, los años malviviendo como un ladronzuelo en las calles de una gran ciudad y su llegada a una universidad donde esperaba encontrar todas las respuestas que había estado buscando. Viaje, ame, perdí, confie y me traicionaron. He robado princesas a reyes agónicos. Incendie la ciudad de Trebon. He pasado la noche con Felurian y he despertado vivo y cuerdo."
  };

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  fichaLibro(id: number) {
    //TODO GET LIBRO POR ID --> obtener BOOK completo
    // libroSeleccionado = MOCKDATA
    if (this.libroSeleccionado) {
      this.bookService.setLibro(this.libroSeleccionado);

      let genero: string = '';
      let titulo: string = this.libroSeleccionado.titulo.toLowerCase().replaceAll(' ', '-');

      if (this.libroSeleccionado.genero.nombre) {
        genero = this.libroSeleccionado.genero.nombre.toLowerCase();
      } else {
        genero = this.libroSeleccionado.tipo.nombre.toLowerCase();
      }

      this.router.navigate(['/biblioteca', sinDiacriticos(genero), sinDiacriticos(titulo)]);
    }
  }

}

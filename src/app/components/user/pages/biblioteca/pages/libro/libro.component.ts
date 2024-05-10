import { Component, OnInit } from '@angular/core';
import { MasLeidosBookService } from 'src/app/services/book/mas-leidos-book.service';
import { Book } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.scss']
})
export class LibroComponent implements OnInit {

  libro: Book = {
    id: 1,
    imagen: "/assets/img/iconoLibro.jpg",
    titulo: "El nombre del viento",
    autor: "Patrick Rothfuss",
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
    estado: "",
    saga: "El nombre del viento",
    descripcion: "Atípica, profunda y sincera, El nombre del viento es una novela de aventuras, de historias dentro de otras historias, de misterio, de amistad, de amor, de magia y de superación. La novela que ha consagrado a Patrick Rothfuss como fenómeno editorial de los últimos años. En una posada en tierra de nadie, un hombre se dispone a relatar, por primera vez, la autentica historia de su vida.Una historia que únicamente el conoce y que ha quedado diluida tras los rumores, las conjeturas y los cuentos de taberna que le han convertido en un personaje legendario a quien todos daban ya por muerto: Kvothe...músico, mendigo, ladrón, estudiante, mago, heroe y asesino. Ahora va a revelar la verdad sobre sí mismo.Y para ello debe empezar por el principio: su infancia en una troupe de artistas itinerantes, los años malviviendo como un ladronzuelo en las calles de una gran ciudad y su llegada a una universidad donde esperaba encontrar todas las respuestas que había estado buscando. Viaje, ame, perdí, confie y me traicionaron. He robado princesas a reyes agónicos. Incendie la ciudad de Trebon. He pasado la noche con Felurian y he despertado vivo y cuerdo."
  };

  stars = [0, 1, 2, 3, 4];
  valoracionMedia: number = 0;

//TODO VALORACION NECESITO
  contadorComentario: number = 0;


  constructor(
    public masLeidosBookService: MasLeidosBookService,
  ) { }

  ngOnInit(): void {
    if (this.libro) {
      this.valoracionMedia = this.libro.valoracionMedia ?? 0;

      //TODO VALORACION NECESITO
      this.contadorComentario = 20 ?? 0;
    }
  }

  generarComentario(){

  }

}

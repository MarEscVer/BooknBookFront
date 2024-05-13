import { Component, OnInit } from "@angular/core";
import { AutorService } from "src/app/services/autor/autor.service";
import { AutorData } from "src/app/shared/models/autor/autor";

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.scss']
})
export class AutorComponent implements OnInit {

  autor?: AutorData;
  imgNoData: string = '/assets/img/iconoPerfil.jpg';

  constructor(
    private autorService: AutorService,
  ) { }

  ngOnInit(): void {
    this.autorService.autorSeleccionado$.subscribe(autor => {
      this.autor = autor;
    });
  }

}

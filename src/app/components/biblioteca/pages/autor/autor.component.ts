import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AutorService } from "src/app/services/autor/autor.service";
import { AutorData } from "src/app/shared/models/autor/autor";

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.scss']
})
export class AutorComponent implements OnInit, OnDestroy{

  autor?: AutorData;
  imgNoData: string = '/assets/img/iconoPerfil.jpg';
  datosCargados: boolean = false;

  private subscriptions: Subscription = new Subscription();
  
  constructor(
    private autorService: AutorService,
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.autorService.autorSeleccionado$.subscribe(autor => {
      this.autor = autor;
    }));
  }

  onDatosCargados(event: boolean) {
    this.datosCargados = event;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

import { Component, OnInit } from '@angular/core';
import { GeneroTipoService } from './services/genero/genero-tipo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private generoTipoService: GeneroTipoService) { }
  
  ngOnInit(): void {
    this.generoTipoService.getGeneroTipo().subscribe();
  }
}

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneroTipoService } from 'src/app/services/genero/genero-tipo.service';
import { Combo, ComboGeneroResponse } from 'src/app/shared/models/combo/combo';
import { MenuDesplegableItem } from 'src/app/shared/models/menu/menuItems';
import { sinDiacriticos } from 'src/app/shared/utils/acentos';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-desplegable',
  templateUrl: './menu-desplegable.component.html',
  styleUrls: ['./menu-desplegable.component.scss']
})
export class MenuDesplegableComponent implements OnDestroy, OnInit {

  menuItemsDesplegable: MenuDesplegableItem[] = [];
  desplegable: MenuDesplegableItem[] = [];
  menuItems: MenuDesplegableItem[] = [];

  typeOptions: Combo[] = [];
  genderOptions: Combo[] = [];

  typeFiccion: Combo[] = [];
  typeTotal: Combo[] = []

  private baseUrl: string = environment.BIBLIO_URL;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private generoTipoService: GeneroTipoService,
  ) { }

  ngOnInit(): void {
    this.obtenerGeneroTipo();
  }

  obtenerGeneroTipo(): void {
    this.subscriptions.add(this.generoTipoService.getGeneroTipo().subscribe(
      (data) => {
        this.typeOptions = data.tipo.valores;
        this.genderOptions = data.genero.valores;
        this.obtenerTipo();
      }
    ));

  }

  obtenerTipo(): void {
    const regexp = new RegExp('^FICCI*N?');

    this.typeFiccion = this.typeOptions.filter(value => { return regexp.test(value.nombre) });
    this.typeTotal = this.typeOptions.filter(value => { return !regexp.test(value.nombre) });
    this.construirRutas();
  }

  construirRutas(): void {
    this.menuItemsDesplegable = this.typeFiccion.map(value =>
      ({ routerLink: this.baseUrl + '/' + sinDiacriticos(value.nombre.toLocaleLowerCase().replaceAll(' ', '-')), tooltipText: value.nombre }));
    this.menuItems = this.typeTotal.map(value =>
      ({ routerLink: this.baseUrl + '/' + sinDiacriticos(value.nombre.toLocaleLowerCase().replaceAll(' ', '-')), tooltipText: value.nombre }));
    this.desplegable = this.genderOptions.map(value =>
      ({ routerLink: this.baseUrl + '/' + sinDiacriticos(value.nombre.toLocaleLowerCase().replaceAll(' ', '-')), tooltipText: value.nombre }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { GeneroTipoService } from 'src/app/services/genero/genero-tipo.service';
import { Combo } from 'src/app/shared/models/combo/combo';
import { sinDiacriticos } from 'src/app/shared/utils/acentos';

@Component({
  selector: 'app-breadcumb',
  templateUrl: './breadcumb.component.html',
  styleUrls: ['./breadcumb.component.scss']
})
export class BreadcumbComponent implements OnInit, OnDestroy {

  breadcrumbs?: string[];
  genderOptions: Combo[] = [];
  generos: String[] = [];

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private generoTipoService: GeneroTipoService,
  ) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.router.events.pipe
      (filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.obtenerGeneroTipo();
      }));
  }

  updateBreadcrumb(): void {
    const urlSegments = this.router.url.split('/').filter(segment => segment !== '');
    this.breadcrumbs = ['Home', ...urlSegments];
  }

  obtenerGeneroTipo(): void {
    this.subscriptions.add(this.generoTipoService.generoTipo$.subscribe(
      (data) => {
        if (data) {
          this.genderOptions = data.genero.valores.concat(data.tipo.valores);
          this.generos = this.genderOptions.map(value => sinDiacriticos(value.nombre.toLocaleLowerCase().replaceAll(' ', '-')));
          this.updateBreadcrumb();
        }
      }
    ));
  }

  getLinkForCrumb(crumb: string): string[] {
    let link: string[] = [''];

    if (crumb === 'Home') {
      link = ['/home'];
    } else if (crumb === 'biblioteca') {
      link = ['/biblioteca'];
    } else if (crumb === 'Quiénes Somos') {
      link = ['/quienes-somos'];
    } else if (crumb === 'Clubes') {
      link = ['/clubes'];
    } else if (this.generos.includes(crumb)) {
      link = ['/biblioteca', crumb.toLowerCase()];
    } else {
      link = ['/home'];
    }
    return link;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
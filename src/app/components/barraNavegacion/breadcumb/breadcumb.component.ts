import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcumb',
  templateUrl: './breadcumb.component.html',
  styleUrls: ['./breadcumb.component.scss']
})
export class BreadcumbComponent implements OnInit, OnDestroy {
  breadcrumbs?: string[];

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.router.events.pipe
      (filter(event => event instanceof NavigationEnd))
      .subscribe(() => {this.updateBreadcrumb();
    }));
  }

  updateBreadcrumb(): void {
    const urlSegments = this.router.url.split('/').filter(segment => segment !== '');
    this.breadcrumbs = ['Home', ...urlSegments];
  }

  getLinkForCrumb(crumb: string): string[] {
    let link: string[] = [''];

    if (crumb === 'Home') {
      link = ['/home'];
    } else if (crumb === 'Biblioteca') {
      link = ['/biblioteca'];
    } else if (crumb === 'Quiénes Somos') {
      link = ['/quienes-somos'];
    } else {
      if (crumb === 'Juvenil') {
        link = ['/biblioteca', 'juvenil'];
      } else if (crumb === 'Romántica') {
        link = ['/biblioteca', 'romantica'];
      } else {
        const id = '123'; // Aquí debes obtener el ID del libro específico
        link = ['/biblioteca', 'libro', id];
      }
    }
    return link;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
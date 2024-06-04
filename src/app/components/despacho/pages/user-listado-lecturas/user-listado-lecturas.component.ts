import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { BookListadoLectura } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-user-listado-lecturas',
  templateUrl: './user-listado-lecturas.component.html',
  styleUrls: ['./user-listado-lecturas.component.scss']
})
export class UserListadoLecturasComponent implements OnInit, OnDestroy {

  url$?: Observable<string | undefined>;

  estado?: string;


  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.url$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('estado')?.toUpperCase() ?? undefined)
    );

    this.subscriptions.add(this.url$.subscribe(url => {
      this.estado = url;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

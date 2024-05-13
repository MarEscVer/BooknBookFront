import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClubDataShort } from 'src/app/shared/models/club/club';

@Component({
  selector: 'app-user-club-list',
  templateUrl: './user-club-list.component.html',
  styleUrls: ['./user-club-list.component.scss']
})
export class UserClubListComponent {

  clubes: ClubDataShort[] = [
    {
      id: 1,
      imagen: "",
      nombre: "Club de Lectura",
      administrador: true,
    },
    {
      id: 1,
      imagen: "",
      nombre: "Club de Lectura",
      administrador: false,
    },
    {
      id: 1,
      imagen: "",
      nombre: "Club de Lectura",
      administrador: false,
    },
    {
      id: 1,
      imagen: "",
      nombre: "Club de Lectura",
      administrador: false,
    }
  ]

  dataSource: MatTableDataSource<ClubDataShort> = new MatTableDataSource<ClubDataShort>(this.clubes);

  pageIndex = 0;
  pageSize = 4;
  pageEvent?: PageEvent;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.dataSource = new MatTableDataSource<ClubDataShort>([]);
  }

  ngOnInit() {
    // this.loadData();
    if (this.clubes) {
      this.dataSource = new MatTableDataSource<ClubDataShort>(this.clubes);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
    }
  }

  loadData() {
    //TODO LLAMAR SERVICIO
  }

}

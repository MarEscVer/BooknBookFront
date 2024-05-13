import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ClubDataAll } from 'src/app/shared/models/club/club';

@Component({
  selector: 'app-club-list-all',
  templateUrl: './club-list-all.component.html',
  styleUrls: ['./club-list-all.component.scss']
})
export class ClubListAllComponent {

  clubes: ClubDataAll[] = [
    {
      id: 1,
      imagen: "",
      nombre: "Club de Lectura",
      descripcion: "Un club dedicado a la lectura de libros de todo tipo de géneros.",
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
      miembros: 20,
      perteneces: true
    },
    {
      id: 2,
      imagen: "",
      nombre: "Club de Lectura",
      descripcion: "Un club dedicado a la lectura de libros de todo tipo de géneros.",
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
      miembros: 20,
      perteneces: true
    },
    {
      id: 3,
      imagen: "",
      nombre: "Club de Lectura",
      descripcion: "Un club dedicado a la lectura de libros de todo tipo de géneros.",
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
      miembros: 20,
      perteneces: true
    },
    {
      id: 4,
      imagen: "",
      nombre: "Club de Lectura",
      descripcion: "Un club dedicado a la lectura de libros de todo tipo de géneros.",
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
      miembros: 20,
      perteneces: true
    },
    {
      id: 5,
      imagen: "",
      nombre: "Club de Lectura",
      descripcion: "Un club dedicado a la lectura de libros de todo tipo de géneros.",
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
      miembros: 20,
      perteneces: false
    }
  ]

  @Input() userLoged!: boolean;

  dataSource: MatTableDataSource<ClubDataAll> = new MatTableDataSource<ClubDataAll>(this.clubes);

  pageIndex = 0;
  pageSize = 5;
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
    this.dataSource = new MatTableDataSource<ClubDataAll>([]);
  }

  ngOnInit() {
    // this.loadData();
    if (this.clubes) {
      this.dataSource = new MatTableDataSource<ClubDataAll>(this.clubes);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
    }
  }

  loadData() {
    //TODO LLAMAR SERVICIO
  }

  applyFilter(event: Event) {

  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
    this.subscriptions.unsubscribe();
  }

}

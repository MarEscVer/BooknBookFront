import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookItemList } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-listado-libros-admin',
  templateUrl: './listado-libros-admin.component.html',
  styleUrls: ['./listado-libros-admin.component.scss']
})
export class ListadoLibrosAdminComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  agregarLibro(): void {
    this.router.navigate(['/admin/book']);
  }
}
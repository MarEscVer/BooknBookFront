import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComentarioDenunciadoItemList } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-listado-items-comentarios',
  templateUrl: './listado-items-comentarios.component.html',
  styleUrls: ['./listado-items-comentarios.component.scss']
})
export class ListadoItemsComentariosComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'username', 'date', 'comentario', 'razon', 'actions'];

  @Input() data?: ComentarioDenunciadoItemList[];

  dataSource: MatTableDataSource<ComentarioDenunciadoItemList>;
  editedItems: ComentarioDenunciadoItemList[] = [];
  originalRol: string = '';

  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource<ComentarioDenunciadoItemList>([]);
  }

  ngOnInit() {
    if (this.data) {
      this.dataSource = new MatTableDataSource<ComentarioDenunciadoItemList>(this.data);
    }
  }


  ngAfterViewInit() {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.dataSource && this.sort) {
      this.dataSource.sort = this.sort;
    }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  saveChanges(row: ComentarioDenunciadoItemList) {
    // Aquí puedes enviar los cambios al backend
    console.log('Aceptando comentario:', row);
  }

  delete(row: ComentarioDenunciadoItemList) {
    // Aquí puedes implementar la lógica para eliminar un usuario
    console.log('Eliminando comentario:', row);
  }
}

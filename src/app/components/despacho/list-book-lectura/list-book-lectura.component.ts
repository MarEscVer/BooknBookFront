import { Component, Input, OnInit } from '@angular/core';
import { BookListadoLectura } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-list-book-lectura',
  templateUrl: './list-book-lectura.component.html',
  styleUrls: ['./list-book-lectura.component.scss']
})
export class ListBookLecturaComponent implements OnInit{

  @Input() libros?: BookListadoLectura[];
  @Input() estado?: string;

  constructor() { }

  ngOnInit() {
    
  }

}

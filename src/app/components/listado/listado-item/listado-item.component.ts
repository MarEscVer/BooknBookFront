import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ItemType } from 'src/app/shared/models/enum/itemtype';

@Component({
  selector: 'app-listado-item',
  templateUrl: './listado-item.component.html',
  styleUrls: ['./listado-item.component.scss']
})
export class ListadoItemComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() itemType?: ItemType;
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<any>();

  displayedColumns: string[] = [];

  constructor() { }
  ngOnInit(): void {
  }

  isUserType(): boolean {
    return this.itemType === ItemType.User;
  }

  isBookType(): boolean {
    return this.itemType === ItemType.Book;
  }

  isClubType(): boolean {
    return this.itemType === ItemType.Club;
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  getDisplayedColumns(): string[] {
    if (this.isUserType()) {
      return ['username', 'fullname', 'email', 'rol', 'actions'];
    } else if (this.isBookType()) {
      // Define las columnas para el tipo de dato "Book"
      return []; // <-- Completa con las columnas correspondientes
    } else if (this.isClubType()) {
      // Define las columnas para el tipo de dato "Club"
      return []; // <-- Completa con las columnas correspondientes
    } else {
      return [];
    }
  }

  edit(item: any) {
    this.editItem.emit(item);
  }

  delete(item: any) {
    this.deleteItem.emit(item);
  }
}

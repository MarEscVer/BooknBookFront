import { Component, Input } from '@angular/core';
import { BookItemCard } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-item-book-card',
  templateUrl: './item-book-card.component.html',
  styleUrls: ['./item-book-card.component.scss'],
})
export class ItemBookCardComponent {

  @Input() libro!: BookItemCard;
  @Input() imagenOnly?: boolean;

  constructor() { }

}

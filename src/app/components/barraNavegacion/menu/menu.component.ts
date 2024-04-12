import { Component, Input } from '@angular/core';
import { MenuItem } from 'src/app/shared/models/menu/menuItems';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() menuItems: MenuItem[] = [];
  
}

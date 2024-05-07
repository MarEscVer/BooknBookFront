import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuDesplegableItem } from 'src/app/shared/models/menu/menuItems';

@Component({
  selector: 'app-menu-desplegable-item',
  templateUrl: './menu-desplegable-item.component.html',
  styleUrls: ['./menu-desplegable-item.component.scss']
})
export class MenuDesplegableItemComponent {

  @Input() menuItem!: MenuDesplegableItem;
  @Input() menuItemsDesplegable!: MenuDesplegableItem[];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  dirigir(ruta: string) {
    this.router.navigate([ruta]);
  }
}

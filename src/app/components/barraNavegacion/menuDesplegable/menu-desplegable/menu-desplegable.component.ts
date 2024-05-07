import { Component, Input } from '@angular/core';
import { MenuDesplegableItem } from 'src/app/shared/models/menu/menuItems';

@Component({
  selector: 'app-menu-desplegable',
  templateUrl: './menu-desplegable.component.html',
  styleUrls: ['./menu-desplegable.component.scss']
})
export class MenuDesplegableComponent {
  menuItemsDesplegable: MenuDesplegableItem[] = [
    { routerLink: '/', tooltipText: 'FICCIÓN' },
  ];

  //TODO RUTAS
  desplegable: MenuDesplegableItem[] = [
    { routerLink: '/', tooltipText: 'ROMÁNTICA' },
    { routerLink: '/', tooltipText: 'HISTÓRICA' },
    { routerLink: '/', tooltipText: 'FANTÁSTICA' },
    { routerLink: '/', tooltipText: 'HUMOR' },
    { routerLink: '/', tooltipText: 'CIENCIA FICCIÓN' },
    { routerLink: '/', tooltipText: 'NEGRA' },
    { routerLink: '/', tooltipText: 'TERROR' },
  ];

  //TODO RUTAS
  menuItems: MenuDesplegableItem[] = [
    { routerLink: '/', tooltipText: 'NO FICCIÓN' },
    { routerLink: '/', tooltipText: 'JUVENIL' },
    { routerLink: '/', tooltipText: 'INFANTIL' }
  ];

}

import { Component } from '@angular/core';
import { MenuItem } from 'src/app/shared/models/menu/menuItems';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent {
  menuAdministrador: MenuItem[] = [
    { routerLink: "/admin", iconName: 'book-open', iconPrefix: 'fas', tooltipText: "Gestión de Biblioteca" },
    { routerLink: "/admin/usuarios", iconName: 'users', iconPrefix: 'fas', tooltipText: "Usuarios" },
    { routerLink: "/admin/clubes", iconName: 'book-open-reader', iconPrefix: 'fas', tooltipText: "Gestión de Clubes" },
    { routerLink: "/admin/moderacion",iconName: 'comment', iconPrefix: 'fas', tooltipText: "Moderación" }
  ]
}

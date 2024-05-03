import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { roles } from 'src/environments/environment';
import { NotificationService } from '../services/notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AppPermissionService {
  constructor(
    public router: Router,
    private cookieService: AuthService,
    private notification: NotificationService,) { }

  canActivate(): boolean {
    let token = this.cookieService.getCookie('token');
    let rol = this.cookieService.getCookie('rol');
    console.log('decide token', token);
    if (token && rol) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.notification.show('No has iniciado sesión', 'warning');
      return false;
    }
  }

  adminActivate(): boolean {
    let rol = this.cookieService.getCookie("rol");
    if (rol && rol == roles.ADMIN) {
      return true;
    } else {
      this.router.navigate(['/login']);
      this.notification.show('No eres administrador', 'warning');
      return false;
    }
  }
}

export const appGuard: CanActivateFn = (route, state) => {
  return inject(AppPermissionService).canActivate();
};

export const adminGuard: CanActivateFn = (route, state) => {
  return inject(AppPermissionService).adminActivate();
};



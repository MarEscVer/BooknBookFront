import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { roles } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppPermissionService {
  constructor(public router: Router, private cookieService: AuthService) {}

  canActivate(): boolean {
    let token = this.cookieService.getCookie('token');
    let rol = this.cookieService.getCookie('rol');
    console.log('decide token', token);
    if (token && rol) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  adminActivate(): boolean {
    let rol = this.cookieService.getCookie("rol");
    if (rol && rol == roles.ADMIN) {
      return true;
    } else {
      this.router.navigate(['/login']);
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



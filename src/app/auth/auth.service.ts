import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$: Observable<string | null> = this.userRoleSubject.asObservable();

  constructor() {
    this.iniciarSesionSiExiste();
  }

  public closeSession(): void {
    this.deleteCookie('token');
    this.userRoleSubject.next(null);
  }

  public closeSessionTotal(): boolean {
    this.deleteCookie('token');
    this.deleteCookie('username');
    this.deleteCookie('rol');
    this.userRoleSubject.next(null);
    return true;
  }

  public iniciarSession(): void {
    this.userRoleSubject.next(this.getCookie('rol'));
  }

  private iniciarSesionSiExiste(): void {
    const token = this.getCookie('token');
    const rol = this.getCookie('rol');
    const username = this.getCookie('username');

    if (token && rol && username) {
      this.iniciarSession();
    }
  }

  public getCookie(name: string) {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  public deleteCookie(name: string) {
    this.setCookie(name, '', -1);
  }

  public setCookie(
    name: string,
    value: string,
    expireDays: number,
    path: string = ''
  ) {
    let d: Date = new Date();
    d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    let expires: string = `expires=${d.toUTCString()}`;
    let cpath: string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }
}


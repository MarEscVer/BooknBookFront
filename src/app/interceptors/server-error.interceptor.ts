import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification/notification.service';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../services/token/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService,
    private notification: NotificationService,
    private authService: AuthService,) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authReq = request;
    
      authReq = request.clone({
        headers: request.headers.set(
          TOKEN_HEADER_KEY,
          `Bearer ${this.getToken()}`
        ),
      });
    
    console.log('request', authReq);
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${err.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
        }
        this.notification.show(err.error, 'error');
        return throwError(() => errorMessage);
      })
    );
  }

  getToken() {
    return this.authService.getCookie("token");
  }
}

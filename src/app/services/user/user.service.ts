import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login, LoginResponse, Register } from 'src/app/shared/models/users/user';
import { endpoints, environment, httpOptions } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  register(registerRequest: Register): Observable<boolean> {
    return this.http
      .post<boolean>(
        this.baseUrl + environment.USER_URL + endpoints.REGISTER,
        registerRequest,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  login(loginRequest: Login): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        this.baseUrl + endpoints.LOGIN,
        loginRequest,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }
}

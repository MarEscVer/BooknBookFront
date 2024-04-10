import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login, Register } from 'src/app/shared/models/users/user';
import { endpoints, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl:string = environment.BASE_URL;
  private httpOptions = {
    //AUTENTICATION TOKEN
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      'Content-Type':  'application/json'
    })};
  constructor(private http:HttpClient) { }

  register(registerRequest: Register): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + environment.USER_URL + endpoints.REGISTER, registerRequest, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  login(loginRequest: Login): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + environment.USER_URL + endpoints.LOGIN, loginRequest, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
  return throwError(() => error.error);
}
}

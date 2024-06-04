import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Login, LoginResponse, PerfilUsuarioData, Register, UserItemListResponse, modifyUser, UpdatePerfilData } from 'src/app/shared/models/users/user';
import { endpoints, environment, httpOptions } from 'src/environments/environment';
import { deleteObject } from '../interfaces';
import { IdComboResponse } from 'src/app/shared/models/combo/combo';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  register(registerRequest: Register): Observable<void> {
    return this.http
      .post<void>(
        this.baseUrl + endpoints.REGISTER,
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

  getListUser(pageIndex: number, size: number, filter: string): Observable<UserItemListResponse> {
    const params: any = {
      pageIndex: pageIndex.toString(),
      size: size.toString(),
      username: filter
    };

    return this.http.get<UserItemListResponse>(this.baseUrl + environment.BASE_ADMIN + '/usuario/lista', { params })
      .pipe(catchError(this.handleError));
  }

  getUserByUsername(username: string): Observable<PerfilUsuarioData> {
    return this.http.get<PerfilUsuarioData>(this.baseUrl + environment.BASE_TOKEN + '/user/' + username + '/perfil')
      .pipe(catchError(this.handleError));
  }

  getEditUser(username: string): Observable<UpdatePerfilData> {
    return this.http.get<UpdatePerfilData>(this.baseUrl + environment.BASE_TOKEN + '/user/' + username + '/perfil')
      .pipe(catchError(this.handleError));
  }

  
  deleteUser(username: string): Observable<IdComboResponse> {
    return this.http.delete<IdComboResponse>(this.baseUrl + environment.BASE_ADMIN + '/' + username + '/desactivacion')
      .pipe(catchError(this.handleError));
  }

  updateUserRole(modifiedUser: modifyUser): Observable<any> {
    return this.http.put<any>(this.baseUrl + environment.BASE_ADMIN + '/usuario/rol',
      modifiedUser,
      httpOptions)
      .pipe(map(() => true), catchError(this.handleError));
  }

  editUser(user: PerfilUsuarioData): Observable<IdComboResponse> {
    return this.http.put<IdComboResponse>(this.baseUrl + environment.BASE_TOKEN + '/user/perfil',
      user,
      httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }
}

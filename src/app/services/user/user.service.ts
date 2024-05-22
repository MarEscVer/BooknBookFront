import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Login, LoginResponse, Register, UserItemListResponse, modifyUser } from 'src/app/shared/models/users/user';
import { endpoints, environment, httpOptions } from 'src/environments/environment';
import { deleteObject } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService implements deleteObject {
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

  //TODO delete URL
  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/user/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateUserRole(modifiedUser: modifyUser): Observable<any> {
    return this.http.put<any>(this.baseUrl + environment.BASE_ADMIN + '/usuario/rol',
      modifiedUser,
      httpOptions)
      .pipe(map(() => true),catchError(this.handleError));
  }

  //TODO edit URL
  editUser(user: Register): Observable<any> {
    return this.http.put<any>(this.baseUrl +
      `/user`,
      user,
      httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }
}

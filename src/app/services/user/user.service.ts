import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Login, LoginResponse, PerfilUsuarioData, Register, UserItemListResponse, modifyUser, UpdatePerfilData } from 'src/app/shared/models/users/user';
import { endpoints, environment, httpOptions } from 'src/environments/environment';
import { IdComboResponse } from 'src/app/shared/models/combo/combo';
import { ValoracionResponse } from 'src/app/shared/models/comentario/comentario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = environment.BASE_URL;
  private modalEditarLecturaDataSubject = new BehaviorSubject<ValoracionResponse | undefined>(undefined);
  modalEditarLecturaData$ = this.modalEditarLecturaDataSubject.asObservable();
  private modalAddValoracionDataSubject = new BehaviorSubject<ValoracionResponse | undefined>(undefined);
  modalAddValoracionData$ = this.modalAddValoracionDataSubject.asObservable();
  private modalInteresDataSubject = new BehaviorSubject<ValoracionResponse | undefined>(undefined);
  modalInteresData$ = this.modalInteresDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  setModalEditarLecturaData(data: ValoracionResponse) {
    this.modalEditarLecturaDataSubject.next(data);
  }

  clearModalEditarLecturaData() {
    this.modalEditarLecturaDataSubject.next(undefined);
  }

  setModalAddValoracionData(data: ValoracionResponse) {
    this.modalAddValoracionDataSubject.next(data);
  }

  clearModalAddValoracionData() {
    this.modalAddValoracionDataSubject.next(undefined);
  }

  setModalInteresData(data: ValoracionResponse) {
    this.modalInteresDataSubject.next(data);
  }

  clearModalInteresData() {
    this.modalInteresDataSubject.next(undefined);
  }

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

  vincularUsuarioLibro(idLibro: number, estado: string): Observable<ValoracionResponse> {
    return this.http.post<ValoracionResponse>(this.baseUrl + environment.BASE_TOKEN + '/libro/' + idLibro + '/valoracion/' + estado, httpOptions)
      .pipe(catchError(this.handleError));
  }

  editarUsuarioLibro(comentario: ValoracionResponse): Observable<ValoracionResponse> {
    return this.http.post<ValoracionResponse>(this.baseUrl + environment.BASE_TOKEN + '/libro/valoracion', comentario, httpOptions)
      .pipe(catchError(this.handleError));
  }

  followUser(username: string): Observable<IdComboResponse> {
    return this.http.post<IdComboResponse>(this.baseUrl + environment.BASE_TOKEN + '/user/usuario/' + username + '/follow', httpOptions)
      .pipe(catchError(this.handleError));
  }

  unFollowUser(username: string): Observable<IdComboResponse> {
    return this.http.post<IdComboResponse>(this.baseUrl + environment.BASE_TOKEN + '/user/usuario/' + username + '/unfollow', httpOptions)
      .pipe(catchError(this.handleError));
  }

  desactivarCuenta(): Observable<IdComboResponse>{
    return this.http.delete<IdComboResponse>(this.baseUrl + environment.BASE_TOKEN + '/user/self/desactivacion')
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }
}

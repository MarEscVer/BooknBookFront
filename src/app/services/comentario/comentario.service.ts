import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { environment, httpOptions } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { deleteObject } from '../interfaces';
import { ComentarioDataPaginadorResponse, ComentarioDataResponse, ComentarioDenunciadoResponse, ComentarioResponse, DenunciarComentario, ValoracionData } from 'src/app/shared/models/comentario/comentario';
import { ComboResponse } from 'src/app/shared/models/combo/combo';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService implements deleteObject {
  private baseUrl: string = environment.BASE_URL;
  private motivoDenunciaSubject: BehaviorSubject<ComboResponse | undefined> = new BehaviorSubject<ComboResponse | undefined>(undefined);
  motivoDenuncia$: Observable<ComboResponse | undefined> = this.motivoDenunciaSubject.asObservable();
  private motivoDenunciaLoaded: boolean = false;

  constructor(private http: HttpClient) {
    const storedData = sessionStorage.getItem('motivoDenuncia');
    const initialData = storedData ? JSON.parse(storedData) : null;
    this.motivoDenunciaSubject= new BehaviorSubject<ComboResponse | undefined>(initialData);
    this.motivoDenuncia$ = this.motivoDenunciaSubject.asObservable();
  }

  delete(id: number): Observable<any> {
    return this.http.put<any>(this.baseUrl + environment.BASE_ADMIN + '/denuncia/' + id + '/RECHAZADA', '')
      .pipe(catchError(this.handleError));
  }

  acceptComentario(id: number): Observable<any> {
    return this.http.put<any>(this.baseUrl + environment.BASE_ADMIN + '/denuncia/' + id + '/ACEPTADA', '')
      .pipe(catchError(this.handleError));
  }

  denunciarComentario(denunciaRequest: DenunciarComentario): Observable<any> {
    return this.http.put<any>(this.baseUrl + environment.BASE_TOKEN + '/denuncia', denunciaRequest,
      httpOptions)
      .pipe(catchError(this.handleError));
  }

  getListComentariosDenunciados(pageIndex: number, size: number, selectedFilter: string): Observable<ComentarioDenunciadoResponse> {
    const params: any = {
      pageIndex: pageIndex.toString(),
      size: size.toString(),
      estado: selectedFilter
    };

    return this.http.get<ComentarioDenunciadoResponse>(this.baseUrl + environment.BASE_ADMIN + '/comentarios/denuncia', { params })
      .pipe(catchError(this.handleError));
  }

  getComentarioDenunciado(idLibro: number, idUsuario: number): Observable<ComentarioResponse> {
    const params: any = {
      idLibro: idLibro.toString(),
      idUsuario: idUsuario.toString(),
    };

    return this.http.get<ComentarioResponse>(this.baseUrl + environment.BASE_ADMIN + '/denuncia/valoracion/mensaje', { params })
      .pipe(catchError(this.handleError));
  }

  getComboMotivoDenuncia(): Observable<ComboResponse> {
    const storedData = sessionStorage.getItem('motivoDenuncia');

    return this.http.get<ComboResponse>(this.baseUrl + '/combo/denuncia/motivo')
    .pipe(
      tap(data => {
        sessionStorage.setItem('motivoDenuncia', JSON.stringify(data));
        this.motivoDenunciaSubject.next(data);
        this.motivoDenunciaLoaded = true;
      }),
      catchError(this.handleError)
    );
  }

  getListComentarioUsuario(username: string): Observable<ComentarioDataResponse> {
    return this.http.get<ComentarioDataResponse>(this.baseUrl + environment.BASE_TOKEN + '/user/' + username + '/perfil/valoracion')
      .pipe(catchError(this.handleError));
  }

  getListComentarioLibro(pageIndex: number, size: number, idLibro: number): Observable<ComentarioDataPaginadorResponse> {
    const params: any = {
      pageIndex: pageIndex.toString(),
      size: size.toString()
    };

    return this.http.get<ComentarioDataPaginadorResponse>(this.baseUrl + '/libro/' + idLibro + '/comentarios', { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }

}

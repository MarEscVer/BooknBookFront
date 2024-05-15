import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { deleteObject } from '../interfaces';
import { ComentarioDenunciadoResponse, ValoracionData } from 'src/app/shared/models/comentario/comentario';
import { ComboResponse } from 'src/app/shared/models/combo/combo';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService implements deleteObject {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  delete(id: number): Observable<any> {
    return this.http.put<any>(this.baseUrl + environment.BASE_ADMIN + '/denuncia/' + id + '/RECHAZADA', '')
      .pipe(catchError(this.handleError));
  }

  acceptComentario(id: number, estado: string): Observable<any> {
    return this.http.put<any>(this.baseUrl + environment.BASE_ADMIN + '/denuncia/' + id + '/' + estado, '')
      .pipe(catchError(this.handleError));
  }

  getListComentariosDenunciados(pageIndex: number, size: number, filter: string): Observable<ComentarioDenunciadoResponse> {
    const params: any = {
      pageIndex: pageIndex.toString(),
      size: size.toString(),
      filter: filter
    };

    return this.http.get<ComentarioDenunciadoResponse>(this.baseUrl + environment.BASE_ADMIN + '/comentarios/denuncia', { params })
      .pipe(catchError(this.handleError));
  }

  getComboMotivoDenuncia(): Observable<ComboResponse> {
    return this.http.get<ComboResponse>(this.baseUrl + environment.BASE_TOKEN + '/combo/denuncia/motivo')
    .pipe(catchError(this.handleError));
  }

  getValoracion(): Observable<ValoracionData> {
    const valoracion: ValoracionData = {id: 1};
    return of(valoracion);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }

}

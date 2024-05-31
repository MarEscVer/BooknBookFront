import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ContadorResponse, ContadorUsuarioResponse, EstadisticaResponse } from 'src/app/shared/models/estadistica/estadistica';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  getContador(): Observable<ContadorResponse> {
    return this.http.post<ContadorResponse>(this.baseUrl + '/contador', '')
      .pipe(catchError(this.handleError));
  }

  getContadorUsario(): Observable<ContadorUsuarioResponse> {
    return this.http.post<ContadorUsuarioResponse>(this.baseUrl + '/', '')
      .pipe(catchError(this.handleError));
  }

  getLecturasEstadistica(): Observable<EstadisticaResponse> {
    return this.http.post<EstadisticaResponse>(this.baseUrl + '/', '')
      .pipe(catchError(this.handleError));
  }

  getGenerosEstadistica(): Observable<EstadisticaResponse> {
    return this.http.post<EstadisticaResponse>(this.baseUrl + '/', '')
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }

}

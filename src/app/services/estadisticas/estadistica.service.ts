import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ContadorResponse, ContadorUsuarioResponse, EstadisticaCalendarioResponse, EstadisticaResponse } from 'src/app/shared/models/estadistica/estadistica';
import { environment, httpOptions } from 'src/environments/environment';

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
    return this.http.get<ContadorUsuarioResponse>(this.baseUrl + environment.BASE_TOKEN + '/user/estadistica', httpOptions)
      .pipe(catchError(this.handleError));
  }

  getLecturasEstadistica(): Observable<EstadisticaResponse> {
    return this.http.get<EstadisticaResponse>(this.baseUrl + environment.BASE_TOKEN + '/user/estadistica/estado', httpOptions)
      .pipe(catchError(this.handleError));
  }

  getGenerosEstadistica(): Observable<EstadisticaResponse> {
    return this.http.get<EstadisticaResponse>(this.baseUrl + environment.BASE_TOKEN + '/user/estadistica/genero', httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCalendarioEstadistica(year: number): Observable<EstadisticaCalendarioResponse> {
    const params: any = {
      anyoSelected: year.toString(),
    };
    return this.http.get<EstadisticaCalendarioResponse>(this.baseUrl + environment.BASE_TOKEN + '/user/estadistica/calendario', { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }

}

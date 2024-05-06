import { Injectable } from '@angular/core';
import { environment, httpOptions } from 'src/environments/environment';
import { deleteObject } from '../interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AutorData, AutorEdit } from 'src/app/shared/models/autor/autor';
import { ComboResponse, IdComboResponse } from 'src/app/shared/models/combo/combo';

@Injectable({
  providedIn: 'root'
})
export class AutorService implements deleteObject {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  //TODO delete URL
  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/autor/${id}`)
      .pipe(catchError(this.handleError));
  }

  addAutor(autorData: AutorData): Observable<IdComboResponse> {
    return this.http.post<IdComboResponse>(this.baseUrl + environment.BASE_ADMIN + `/autor`, autorData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  editAutor(autorData: AutorData, idAutor: number): Observable<void> {
    return this.http.put<void>(this.baseUrl + environment.BASE_ADMIN + `/autor/${idAutor}`, autorData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //TODO get URL
  getAutorById(idAutor: number): Observable<AutorEdit> {
    return this.http.get<AutorEdit>(this.baseUrl + environment.BASE_TOKEN + `/autor/${idAutor}`, httpOptions).pipe(catchError(this.handleError));
  }

  getAutores(): Observable<ComboResponse> {
    return this.http.get<ComboResponse>(this.baseUrl + environment.BASE_TOKEN + `/combo/autor`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getSagaAutor(idAutor: number): Observable<ComboResponse> {
    return this.http.get<ComboResponse>(this.baseUrl + environment.BASE_TOKEN + `/combo/saga/` + idAutor, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }

}
import { Injectable } from '@angular/core';
import { environment, httpOptions } from 'src/environments/environment';
import { deleteObject } from '../interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AutorData } from 'src/app/shared/models/autor/autor';

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

  //TODO add URL
  addAutor(autorData: AutorData): Observable<void> {
    return this.http.post<void>(this.baseUrl + environment.BASE_TOKEN + `/autor`, autorData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }

}
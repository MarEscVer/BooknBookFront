import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { deleteObject } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService implements deleteObject {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  //TODO delete URL
  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/comentario/${id}`)
      .pipe(catchError(this.handleError));
  }

  //TODO accept URL
  acceptComentario(id: number): Observable<any> {
    return this.http.post<any>(this.baseUrl + `/comentario/${id}`, id)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }

}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment, httpOptions } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NovedadesBookService {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  //TODO getListado URL
  getListado(genero?: string): Observable<any> {
    return this.http.get<any>(this.baseUrl, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }
}


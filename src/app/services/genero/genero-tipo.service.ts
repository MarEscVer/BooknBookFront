import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Combo } from 'src/app/shared/models/combo/combo';
import { environment, httpOptions } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneroTipoService {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  getGeneroTipo(): Observable<Combo> {
    return this.http.get<Combo>(this.baseUrl + environment.BASE_TOKEN + `/combo/genero`, httpOptions)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }
}

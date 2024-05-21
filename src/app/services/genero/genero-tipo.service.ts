import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ComboGeneroResponse } from 'src/app/shared/models/combo/combo';
import { environment, httpOptions } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneroTipoService {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  getGeneroTipo(): Observable<ComboGeneroResponse> {
    return this.http.get<ComboGeneroResponse>(this.baseUrl + '/combo/genero', httpOptions)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }
}

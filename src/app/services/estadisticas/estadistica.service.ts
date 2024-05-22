import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ContadorResponse } from 'src/app/shared/models/estadistica/estadistifca';
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

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }

}

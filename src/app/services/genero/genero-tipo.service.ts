import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { ComboGeneroResponse } from 'src/app/shared/models/combo/combo';
import { environment, httpOptions } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneroTipoService {
  private baseUrl: string = environment.BASE_URL;
  private generoTipoSubject: BehaviorSubject<ComboGeneroResponse | undefined> = new BehaviorSubject<ComboGeneroResponse | undefined>(undefined);
  generoTipo$: Observable<ComboGeneroResponse | undefined> = this.generoTipoSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedData = localStorage.getItem('generoTipo');
    const initialData = storedData ? JSON.parse(storedData) : null;
    this.generoTipoSubject= new BehaviorSubject<ComboGeneroResponse | undefined>(initialData);
    this.generoTipo$ = this.generoTipoSubject.asObservable();
  }
  
  getGeneroTipo(): Observable<ComboGeneroResponse> {
    const storedData = localStorage.getItem('generoTipo');

    return this.http.get<ComboGeneroResponse>(this.baseUrl + '/combo/genero', httpOptions)
      .pipe(
        tap(data => {
          localStorage.setItem('generoTipo', JSON.stringify(data));
          this.generoTipoSubject.next(data);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }
}

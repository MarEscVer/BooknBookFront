import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BookCardDataListResponse, BookImageListResponse } from 'src/app/shared/models/book/book';
import { environment, httpOptions } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasLeidosBookService {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  getListado(size: number, genero?: string): Observable<BookImageListResponse> {
    const params: any = {
      pageIndex: 0,
      size: size.toString(),
    };

    return this.http.get<BookImageListResponse>(this.baseUrl + '/libros-mas-leidos', { params })
      .pipe(catchError(this.handleError));
  }

  getListadoFavoritosUsuario(usuario: string): Observable<BookCardDataListResponse> {
    const params: any = {
      pageIndex: 0,
      size: 10,
    };

    return this.http.get<BookCardDataListResponse>(this.baseUrl + environment.USER_URL + '/' + usuario + '/perfil/libros', { params })
      .pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }
}

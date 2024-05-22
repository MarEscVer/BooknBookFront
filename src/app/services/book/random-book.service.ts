import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { BookImageListResponse } from 'src/app/shared/models/book/book';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RandomBookService {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  getListado(size: number, genero?: string): Observable<BookImageListResponse> {
    const params: any = {
      size: size.toString(),
    };

    return this.http.get<BookImageListResponse>(this.baseUrl + '/libros-propuestas', { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment, httpOptions } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { deleteObject } from '../interfaces';
import { BookData, BookEdit } from 'src/app/shared/models/book/book';

@Injectable({
  providedIn: 'root'
})
export class BookService implements deleteObject {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  //TODO delete URL
  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/book/${id}`)
      .pipe(catchError(this.handleError));
  }

  //TODO add URL + objeto
  addBook(bookData: BookData): Observable<boolean> {
    return this.http.post<boolean>(this.baseUrl + `/book/add`, bookData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //TODO edit URL
  editBook(bookData: BookData, idBook: number): Observable<void> {
    return this.http.put<void>(this.baseUrl + environment.BASE_TOKEN + `/book/${idBook}`, bookData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //TODO get URL
  getBookById(idBook: number): Observable<BookEdit> {
    return this.http.get<BookEdit>(this.baseUrl + environment.BASE_TOKEN + `/book/${idBook}`, httpOptions)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }

}

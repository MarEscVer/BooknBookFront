import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { environment, httpOptions } from 'src/environments/environment';
import { catchError, delay } from 'rxjs/operators';
import { deleteObject } from '../interfaces';
import { Book, BookData, BookEdit } from 'src/app/shared/models/book/book';
import { IdComboResponse } from 'src/app/shared/models/combo/combo';

@Injectable({
  providedIn: 'root'
})
export class BookService implements deleteObject {
  private baseUrl: string = environment.BASE_URL + environment.BASE_ADMIN;
  private libroSeleccionadoSubject: BehaviorSubject<Book | undefined> = new BehaviorSubject<Book | undefined>(undefined);
  libroSeleccionado$: Observable<Book | undefined> = this.libroSeleccionadoSubject.asObservable();
  constructor(private http: HttpClient) {
    const storedBook = localStorage.getItem('selectedBook');
    const initialBook = storedBook ? JSON.parse(storedBook) : undefined;
    this.libroSeleccionadoSubject = new BehaviorSubject<Book | undefined>(initialBook);
    this.libroSeleccionado$ = this.libroSeleccionadoSubject.asObservable();
  }

  setLibro(libro: Book) {
    this.libroSeleccionadoSubject.next(libro);
    localStorage.setItem('selectedBook', JSON.stringify(libro));
  }

  //TODO delete URL
  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/book/${id}`)
      .pipe(catchError(this.handleError));
  }

  addBook(bookData: BookData): Observable<IdComboResponse> {
    return this.http.post<IdComboResponse>(this.baseUrl + `/libro`, bookData, httpOptions)
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

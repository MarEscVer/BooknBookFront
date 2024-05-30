import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { environment, httpOptions } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { deleteObject } from '../interfaces';
import { Book, BookData, BookDataId, BookEdit, BookItemListResponse } from 'src/app/shared/models/book/book';
import { IdComboResponse } from 'src/app/shared/models/combo/combo';

@Injectable({
  providedIn: 'root'
})
export class BookService implements deleteObject {
  private baseUrl: string = environment.BASE_URL;
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
    return this.http.post<IdComboResponse>(this.baseUrl + environment.BASE_ADMIN + '/libro', bookData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  editBook(bookData: BookDataId, idBook: number): Observable<void> {
    bookData.id = idBook;

    if (!bookData.genero) {
      bookData.genero = 0;
    }
    if (!bookData.tipo) {
      bookData.tipo = 0;
    }
    if (!bookData.saga) {
      bookData.saga = 0;
    }

    return this.http.put<void>(this.baseUrl + environment.BASE_ADMIN + '/libro', bookData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getBookById(idBook: number): Observable<Book> {
    return this.http.get<Book>(this.baseUrl + '/libro/' + idBook, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getListBook(pageIndex: number, size: number, filter: string): Observable<BookItemListResponse> {
    const params: any = {
      pageIndex: pageIndex.toString(),
      size: size.toString(),
      filter: filter
    };

    return this.http.get<BookItemListResponse>(this.baseUrl + environment.BASE_ADMIN + '/libro/gestion', { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }

}

import { Injectable } from '@angular/core';
import { environment, httpOptions } from 'src/environments/environment';
import { deleteObject } from '../interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { AutorData } from 'src/app/shared/models/autor/autor';
import { ComboResponse, IdComboResponse } from 'src/app/shared/models/combo/combo';
import { BookListResponse } from 'src/app/shared/models/book/book';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private baseUrl: string = environment.BASE_URL;
  private autorSeleccionadoSubject: BehaviorSubject<AutorData | undefined> = new BehaviorSubject<AutorData | undefined>(undefined);
  autorSeleccionado$: Observable<AutorData | undefined> = this.autorSeleccionadoSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedAutor = localStorage.getItem('selectedAutor');
    const initialAutor = storedAutor ? JSON.parse(storedAutor) : undefined;
    this.autorSeleccionadoSubject = new BehaviorSubject<AutorData | undefined>(initialAutor);
    this.autorSeleccionado$ = this.autorSeleccionadoSubject.asObservable();
  }

  setAutor(autor: AutorData) {
    this.autorSeleccionadoSubject.next(autor);
    localStorage.setItem('selectedAutor', JSON.stringify(autor));
  }

  addAutor(autorData: AutorData): Observable<IdComboResponse> {
    return this.http.post<IdComboResponse>(this.baseUrl + environment.BASE_ADMIN + '/autor', autorData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  editAutor(autorData: AutorData, idAutor: number): Observable<void> {
    return this.http.put<void>(this.baseUrl + environment.BASE_ADMIN + '/autor/' + idAutor, autorData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAutorById(idAutor: number): Observable<AutorData> {
    return this.http.get<AutorData>(this.baseUrl + '/autor/' + idAutor, httpOptions)
    .pipe(catchError(this.handleError));
  }

  getAutores(): Observable<ComboResponse> {
    return this.http.get<ComboResponse>(this.baseUrl + '/combo/autor', httpOptions)
      .pipe(catchError(this.handleError));
  }

  getLibrosAutor(idAutor: number): Observable<BookListResponse> {
    return this.http.get<BookListResponse>(this.baseUrl + '/autor/' + idAutor +'/libros' , httpOptions)
      .pipe(catchError(this.handleError));
  }

  getSagaAutor(idAutor: number): Observable<ComboResponse> {
    return this.http.get<ComboResponse>(this.baseUrl + '/combo/saga/' + idAutor, httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }

}
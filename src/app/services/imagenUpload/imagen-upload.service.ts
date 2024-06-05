import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagenUploadService {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  uploadGrupo(idGrupo: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    var blob = new Blob([file], { type: file.type });
    formData.append('imagen', blob, file.name);
    const options = {
      headers: {}
    } as any;

    return this.http.put(this.baseUrl + environment.BASE_TOKEN + '/grupo/' + idGrupo + '/imagen', formData, options)
      .pipe(catchError(this.handleError));
  }

  uploadBook(idBook: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    var blob = new Blob([file], { type: file.type });
    formData.append('imagen', blob, file.name);
    const options = {
      headers: {}
    } as any;

    return this.http.put(this.baseUrl + environment.BASE_ADMIN + '/libro/' + idBook + '/imagen', formData, options)
      .pipe(catchError(this.handleError));
  }

  uploadAutor(idAutor: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    var blob = new Blob([file], { type: file.type });
    formData.append('imagen', blob, file.name);
    const options = {
      headers: {}
    } as any;

    return this.http.put(this.baseUrl + environment.BASE_ADMIN + '/autor/' + idAutor + '/imagen', formData, options)
      .pipe(catchError(this.handleError));
  }

  uploadUser(idUser: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    var blob = new Blob([file], { type: file.type });
    formData.append('imagen', blob, file.name);
    const options = {
      headers: {}
    } as any;

    return this.http.put(this.baseUrl + environment.BASE_TOKEN + '/user/imagen', formData, options)
      .pipe(catchError(this.handleError));
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }
}
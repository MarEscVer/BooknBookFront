import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagenUploadService {
  private baseUrl: string = environment.BASE_URL + environment.BASE_TOKEN;
  constructor(private http: HttpClient) { }

  uploadGrupo(idGrupo: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    var blob = new Blob([file], { type: file.type });
    formData.append('createGroupRequest', blob, file.name);
    const options = {
      headers: {}
    } as any;

    return this.http.put(this.baseUrl + '/grupo/imagen?idGrupo=' + idGrupo, formData, options)
      .pipe(catchError(this.handleError));
  }

  uploadBook(idBook: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    var blob = new Blob([file], { type: file.type });
    formData.append('createGroupRequest', blob, file.name);
    const options = {
      headers: {}
    } as any;

    return this.http.put(this.baseUrl + '/book/imagen?idGrupo=' + idBook, formData, options)
      .pipe(catchError(this.handleError));
  }

  uploadAutor(idAutor: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    var blob = new Blob([file], { type: file.type });
    formData.append('createGroupRequest', blob, file.name);
    const options = {
      headers: {}
    } as any;

    return this.http.put(this.baseUrl + '/book/imagen?idGrupo=' + idAutor, formData, options)
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
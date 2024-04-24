import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagenUploadService {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req)
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

//MOCK DATA
  uploadMOCK(file: File): Observable<HttpEvent<any>> {
    // Simula una carga exitosa con un evento de progreso del 100%
    return of({ type: HttpEventType.UploadProgress, loaded: 100, total: 100 });
  }

  getFilesMOCK(): Observable<any> {
    // Simula la respuesta del backend con una lista de archivos vacía
    return of([]);
  }

}
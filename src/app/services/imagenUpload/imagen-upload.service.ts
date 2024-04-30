import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagenUploadService {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  upload(file: File): Observable<boolean> {
    const formData: FormData = new FormData();
    formData.append('imagen', file, file.name);

    return this.http.post<boolean>(`${this.baseUrl}/upload/img`, formData)
      .pipe(catchError(this.handleError));
  }

  // upload(imagen: string): Observable<boolean> {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');

  //   // Crear un objeto con la cadena base64 y cualquier otra información necesaria
  //   const data = {
  //     imagen: imagen,
  //   };

  //   return this.http.post<boolean>(`${this.baseUrl}/upload/img`, data, { headers })
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }  

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
import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment, httpOptions } from 'src/environments/environment';

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

    //TODO Query idGrupo
    return this.http.put(this.baseUrl + '/grupo/imagen?idGrupo=' + idGrupo, formData, options)
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
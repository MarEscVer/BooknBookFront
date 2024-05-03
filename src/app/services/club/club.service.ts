import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment, httpOptions } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { deleteObject } from '../interfaces';
import { ClubData, ClubEdit } from 'src/app/shared/models/club/club';

@Injectable({
  providedIn: 'root'
})
export class ClubService implements deleteObject {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  //TODO delete URL
  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/club/${id}`)
      .pipe(catchError(this.handleError));
  }

  //TODO add URL
  addClub(clubData: ClubData): Observable<void> {
    return this.http.post<void>(this.baseUrl + environment.BASE_TOKEN + `/grupo`, clubData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //TODO add URL
  editClub(clubData: ClubData, idClub: number): Observable<void> {
    return this.http.put<void>(this.baseUrl + environment.BASE_TOKEN + `/grupo/${idClub}`, clubData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //TODO get URL
  getClubById(idClub: number): Observable<ClubEdit> {
    return this.http.get<ClubEdit>(this.baseUrl + environment.BASE_TOKEN + `/grupo/${idClub}`, httpOptions).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }

}
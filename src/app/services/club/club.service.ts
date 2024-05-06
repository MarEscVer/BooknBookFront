import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment, httpOptions } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { deleteObject } from '../interfaces';
import { ClubData, ClubEdit, ClubItemListResponse } from 'src/app/shared/models/club/club';
import { IdComboResponse } from 'src/app/shared/models/combo/combo';

@Injectable({
  providedIn: 'root'
})
export class ClubService implements deleteObject {

  private clubAddedSource = new BehaviorSubject<boolean>(false);
  clubAdded$ = this.clubAddedSource.asObservable();

  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + environment.BASE_TOKEN + '/grupo/' + id)
      .pipe(catchError(this.handleError));
  }

  addClub(clubData: ClubData): Observable<IdComboResponse> {
    return this.http.post<IdComboResponse>(this.baseUrl + environment.BASE_TOKEN + `/grupo`, clubData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  //TODO add URL
  editClub(clubData: ClubData, idClub: number): Observable<void> {
    return this.http.put<void>(this.baseUrl + environment.BASE_TOKEN + `/grupo/${idClub}`, clubData, httpOptions)
      .pipe(catchError(this.handleError));
  }


  getClubById(idClub: number): Observable<ClubEdit> {
    return this.http.get<ClubEdit>(this.baseUrl + environment.BASE_TOKEN + `/grupo/${idClub}`, httpOptions).pipe(catchError(this.handleError));
  }

  getListClubes(pageIndex: number, size: number, filter: string): Observable<ClubItemListResponse> {
    const params: any = {
      pageIndex: pageIndex.toString(),
      size: size.toString(),
      filter: filter
    };

    return this.http.get<ClubItemListResponse>(this.baseUrl + '/clubes', { params })
      .pipe(catchError(this.handleError));
  }

  notifyClubAdded() {
    this.clubAddedSource.next(true);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }

}
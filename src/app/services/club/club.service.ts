import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { environment, httpOptions } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { deleteObject } from '../interfaces';
import { ClubData, ClubEdit, ClubItemListResponse, ClubShortListResponse } from 'src/app/shared/models/club/club';
import { IdComboResponse } from 'src/app/shared/models/combo/combo';

@Injectable({
  providedIn: 'root'
})
export class ClubService implements deleteObject {

  private clubAddedSource = new BehaviorSubject<boolean>(false);
  clubAdded$ = this.clubAddedSource.asObservable();

  private clubDeletedSource = new Subject<number>();
  clubDeleted$ = this.clubDeletedSource.asObservable();

  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient) { }

  delete(id: number): Observable<IdComboResponse> {
    return this.http.delete<IdComboResponse>(this.baseUrl + environment.BASE_TOKEN + '/grupo/' + id)
    .pipe(
      tap(() => this.notifyClubDeleted(id)),
      catchError(this.handleError)
    );
  }

  addClub(clubData: ClubData): Observable<IdComboResponse> {
    return this.http.post<IdComboResponse>(this.baseUrl + environment.BASE_TOKEN + `/grupo`, clubData, httpOptions)
    .pipe(
      tap(() => this.notifyClubAdded()),
      catchError(this.handleError)
    );
  }

  getClubById(idClub: number): Observable<ClubEdit> {
    return this.http.get<ClubEdit>(this.baseUrl + environment.BASE_TOKEN + '/grupo/' + idClub, httpOptions).pipe(catchError(this.handleError));
  }

  getListClubesAnonimo(pageIndex: number, size: number, filter: string): Observable<ClubItemListResponse> {
    const params: any = {
      pageIndex: pageIndex.toString(),
      size: size.toString(),
      filter: filter
    };

    return this.http.get<ClubItemListResponse>(this.baseUrl + '/clubes', { params })
      .pipe(catchError(this.handleError));
  }

  getListClubes(pageIndex: number, size: number, filter: string): Observable<ClubItemListResponse> {
    const params: any = {
      pageIndex: pageIndex.toString(),
      size: size.toString(),
      filter: filter
    };

    return this.http.get<ClubItemListResponse>(this.baseUrl + environment.BASE_TOKEN + '/grupo/clubes', { params })
      .pipe(catchError(this.handleError));
  }

  getListClubesPertenece(pageIndex: number, size: number): Observable<ClubShortListResponse> {
    const params: any = {
      pageIndex: pageIndex.toString(),
      size: size.toString(),
      type: 'P',
    };

    return this.http.get<ClubShortListResponse>(this.baseUrl + environment.BASE_TOKEN + '/grupo/mis-clubes', { params })
      .pipe(catchError(this.handleError));
  }

  getListClubesAdministra(pageIndex: number, size: number): Observable<ClubShortListResponse> {
    const params: any = {
      pageIndex: pageIndex.toString(),
      size: size.toString(),
      type: 'A',
    };

    return this.http.get<ClubShortListResponse>(this.baseUrl + environment.BASE_TOKEN + '/grupo/mis-clubes', { params })
      .pipe(catchError(this.handleError));
  }

  abandonarClub(id: number): Observable<IdComboResponse> {
    const accion = 'A';
    return this.http.delete<IdComboResponse>(this.baseUrl + environment.BASE_TOKEN + '/grupo/' + id + '/self/' + accion, httpOptions)
      .pipe(catchError(this.handleError));
  }

  pertenecerClub(id: number): Observable<IdComboResponse> {
    const accion = 'P';
    return this.http.delete<IdComboResponse>(this.baseUrl + environment.BASE_TOKEN + '/grupo/' + id + '/self/' + accion, httpOptions)
      .pipe(catchError(this.handleError));
  }

  notifyClubAdded() {
    this.clubAddedSource.next(true);
  }

  notifyClubDeleted(id: number) {
    this.clubDeletedSource.next(id);
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }

}
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Link } from 'src/app/shared/models/links/link';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl:string = environment.BASE_URL;
  private httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    })};
  constructor(private http:HttpClient) { }

  getLinkInfoById(idLink:string): Observable<Link> {
    return this.http.get<Link>(this.baseUrl + environment.LINK_URL+`/${idLink}`, {headers: this.httpOptions.headers});
  }
}

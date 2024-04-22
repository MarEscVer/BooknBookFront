import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenRequest, TokenResponse } from 'src/app/shared/models/token/token';
import { environment, endpoints, httpOptions } from 'src/environments/environment';
import { AuthService } from '../../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private baseUrl: string = environment.BASE_URL;
  constructor(private http: HttpClient, private authService: AuthService) {}

  public getToken(registerRequest: TokenRequest): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(
        this.baseUrl + endpoints.TOKEN,
        registerRequest,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  public getTokenCookies(): TokenResponse {
    let token = this.authService.getCookie('token');
    return {
      bearer: token,
    };
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => error.error);
  }
}

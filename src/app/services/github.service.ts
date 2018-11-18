import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private _baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getUsers (params): Observable <any> {
    const url = `${this._baseUrl}/search/users?q=${params.value}&page=${params.page}&per_page=10`;

    return this.http.get <any> (url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserDetails (url: string): Observable<any> {
    return this.http.get <any> (url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserFollowers (url: string): Observable<any> {
    return this.http.get <any> (url)
      .pipe(
        map(data => data.length),
        catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Server error code ${error.status}: ${error.statusText}`);
    }
    return throwError('Something went wrong; please try again later.');
  }

}

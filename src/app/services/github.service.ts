import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  getUsers (name: string, page: number): Observable <any> {
    const url = `https://api.github.com/search/users?q=${name}&page=${page}&per_page=10`;
    return this.http.get <any> (url);
  }

  getUserDetails (url: string): Observable<any> {
    return this.http.get <any> (url);
  }

  getUserFollowers (url: string): Observable<any> {
    return this.http.get <any> (url);
  }
}

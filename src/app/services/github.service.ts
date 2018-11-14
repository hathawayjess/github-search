import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../models/users.model';


@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  getUsers (name: string, page: number): Observable <Users> {
    const url = `https://api.github.com/search/users?q=${name}&page=${page}&per_page=10`;
    return this.http.get <Users> (url);
  }

  getUserDetails (url: string) {
    return this.http.get(url);
  }
}

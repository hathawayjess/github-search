import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GithubService } from './services/github.service';
import { Users } from './models/users.model';
import { filter, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  findControl = new FormControl ();
  error: boolean = false;
  users: Users = null;
  page: number = 1;
  maxPages: number;
  isFirstPage: boolean = true;
  isLastPage: boolean = false;

  constructor (private githubService: GithubService) {}

  ngOnInit () {
    this.findControl.valueChanges
      .pipe (
        filter (value => value.length > 2),
        debounceTime (1000),
        switchMap (value =>
          this.githubService.getUsers (value, this.page) .pipe (
            catchError (err => {
              this.users = null;
              this.error = true;
              return EMPTY;
            })
          )
        )
      )
      .subscribe (users => {
        this.users = users;
        this.error = false;
        this.maxPages = Math.ceil(users.total_count / 30);
      });
  }


  setPage(page: number) {
    // make sure current page is in range
    if (page < 1) {
      page = 1;
    } else if (page > this.maxPages) {
      page = this.maxPages;
    }

    this.page = page;
    if (this.page > 1) { this.isFirstPage = false; }
    if (this.page === 1) { this.isFirstPage = true; }
    if (this.page === this.maxPages) { this.isLastPage = true; }
  }
  nextPage() {
    this.setPage(this.page + 1);
    this.githubService.getUsers(this.findControl.value, this.page)
      .subscribe( users => {
        this.users = users;
      });
  }
  previousPage() {
    this.setPage(this.page - 1);
    this.githubService.getUsers(this.findControl.value, this.page)
      .subscribe( users => {
        this.users = users;
      });
  }
}

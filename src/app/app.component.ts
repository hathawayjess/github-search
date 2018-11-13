import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GithubService } from './services/github.service';
import { Users } from './models/users.model';
import { filter, switchMap, debounceTime, catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  // title = 'github-search';
  findControl = new FormControl ();
  error: boolean = false;
  users: Users = null;

  constructor (private githubService: GithubService) {}

  ngOnInit () {
    this.findControl.valueChanges
      .pipe (
        filter (value => value.length> 2),
        debounceTime (1000),
        switchMap (value =>
          this.githubService.getUsers (value) .pipe (
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
      });
  }
}

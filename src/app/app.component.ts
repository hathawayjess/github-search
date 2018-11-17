import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GithubService } from './services/github.service';
import { Users } from './models/users.model';
import { filter, switchMap, debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  searchControl = new FormControl ();
  error: boolean = false;
  users$: Users = null;
  page: number = 1;
  maxPages: number;
  isFirstPage: boolean = true;
  isLastPage: boolean = false;

  constructor (private githubService: GithubService) {}

  ngOnInit () {
    this.searchControl.valueChanges
      .pipe(
        filter(value => value.length > 2),
        debounceTime(1000),
        switchMap(value => this.getUsers(value, this.page) )
      )
      .subscribe(
        (users) => { this.populateUsers(users); },
        (err) => { this.handleError(err); },
        () => { console.log('complete!'); }
      );
  }

  handleError(err) {
    this.error = err;
  }

  populateUsers(users) {
    this.users$ = users;
  }

  goPrevious() {
    this.page--;
    this.getUsers(this.searchControl.value, this.page)
      .subscribe(
        (users) => { this.populateUsers(users); },
        (err) => { this.handleError(err); },
        () => { console.log('complete!'); });
  }

  goNext() {
    this.page++;
    this.getUsers(this.searchControl.value, this.page)
      .subscribe(
        (users) => { this.populateUsers(users); },
        (err) => { this.handleError(err); },
        () => { console.log('complete!'); }
      );
  }

  getUsers(value: string, page: number) {
    return this.githubService.getUsers(value, page);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GithubService } from './services/github.service';
import { Subject, Observable } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  searchControl = new FormControl ();
  error: boolean = false;
  users$: Observable<{}>;
  page: number = 1;
  maxPages: number;

  private searchParams = new Subject<object>();

  getUsers(term: string, page: number) {
    this.searchParams.next({ value: term, page: page });
  }

  constructor (private githubService: GithubService) {}

  ngOnInit () {
    this.users$ = this.searchParams
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap(params => this.githubService.getUsers(params))
      );
  }

  handleError(err) {
    console.error('Error: ', err);
    this.error = err;
  }

  goPrevious() {
    this.page--;
    this.getUsers(this.searchControl.value, this.page);
  }

  goNext() {
    this.page++;
    this.getUsers(this.searchControl.value, this.page);

  }
}

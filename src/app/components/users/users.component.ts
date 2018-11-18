import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {GithubService} from '../../services/github.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersComponent implements OnInit {
  searchControl = new FormControl ();
  users$: Observable<{}>;
  page: number = 1;
  error: boolean = false;

  private searchParams = new Subject<object>();

  getUsers(term: string, page: number) {
    this.page = page;
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

  goPrevious() {
    this.page--;
    this.getUsers(this.searchControl.value, this.page);
  }

  goNext() {
    this.page++;
    this.getUsers(this.searchControl.value, this.page);
  }

  onError() {
    this.error = true;
  }
}

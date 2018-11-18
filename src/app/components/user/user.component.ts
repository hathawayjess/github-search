import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { GithubService } from '../../services/github.service';
import { Observable, throwError } from 'rxjs';
import { share, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: any;
  details$: Observable<any>;
  followers$: Observable<any>;

  @Output()
  errorRaised = new EventEmitter();

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.details$ = this.githubService.getUserDetails(this.user.url).pipe(
      catchError(error => {
        this.errorRaised.emit();
        return throwError(error);
      }),
        share()
      );

    // TODO: max followers returned from Github API is 30, will need to use a cursor and possibly GraphQL to get an accurate number
    this.followers$ = this.githubService.getUserFollowers(this.user.followers_url).pipe(
      catchError(error => {
        this.errorRaised.emit();
        return throwError(error);
      }),
      share());
  }

}

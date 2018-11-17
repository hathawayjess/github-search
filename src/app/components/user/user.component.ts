import { Component, OnInit, Input } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { Observable, forkJoin } from 'rxjs';
import { share, mergeMap } from 'rxjs/operators';

import { User } from '../../models/user.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: any;
  details: Observable<User>;
  followers: any;

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.details = this.githubService.getUserDetails(this.user.url).pipe(share());
    this.followers = this.githubService.getUserFollowers(this.user.followers_url).pipe(share());
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { share } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input()
  user: any;
  details: any;

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.details = this.githubService.getUserDetails(this.user.url).pipe(share());
  }

}

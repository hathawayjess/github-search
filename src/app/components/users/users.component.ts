import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Users } from '../../models/users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsersComponent {
  @Input()
  users: Users;
}

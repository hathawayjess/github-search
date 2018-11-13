import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Users } from '../../models/users.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserComponent {
  @Input()
  users: Users;
}

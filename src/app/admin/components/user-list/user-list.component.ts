import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from './../../../models/user.models';
import { UserService } from './../../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
    public users: User[] = [];

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getAll().pipe(first())
            .subscribe(users => {
                this.users = users;
            });
    }

}

import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from './../../models/user.models';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
    public users: User[] = [];

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getAll().pipe(first())
            .subscribe(users => {
                this.users = users;
            });
    }

}

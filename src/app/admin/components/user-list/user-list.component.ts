import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.userService.getAll().pipe(first())
            .subscribe(users => {
                console.log('Users (user-list): ', users);
                this.users = users;
            });
    }

    navigate(evt, options) {
        evt.preventDefault();

        const {path, id} = options;

        // this.router.navigate([id], {relativeTo: this.route});
        this.router.navigate([path, id]);
    }

}

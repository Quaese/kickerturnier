import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit, DoCheck {
    private isEdit = false;

    constructor(
        private router: Router
    ) {}

    ngOnInit() {}

    ngDoCheck() {
        // set flag to true if an user edit url was found
        this.isEdit = (new RegExp('/admin/user-edit/')).test(this.router.url);
    }

}

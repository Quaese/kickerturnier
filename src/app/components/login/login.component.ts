import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from './../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;

    loading = false;
    submitted = false;
    home = '/home';
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenicationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenicationService.currentUserValue) {
            this.router.navigate([this.home]);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.home;
    }

    // getter: convenience for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        // stop submitting if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

        this.authenicationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                err => {
                    this.error = err;
                    this.loading = false;
                }
            );
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.models';
import { HttpClient } from '@angular/common/http';
import { config } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    // public user observable
    public currentUser$: Observable<User>;

    constructor(private http: HttpClient) {
        // BehaviorSubject awaits a start state (here user or null)
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        // currentUser$ becomes a Observable
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, {username, password})
            .pipe(
                map(user => {
                    // login successful if there is a JWT token in the response
                    if (user && user.token) {
                        // store user details and JWT token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        // inform observers
                        this.currentUserSubject.next(user);
                    }

                    return user;
                })
            );
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
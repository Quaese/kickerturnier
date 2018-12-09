import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { config } from '../config/config';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {}

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users/`)
    }

    getById(id: number) {
        return this.http.get<User>(`${config.apiUrl}/users/${id}`)
    }
}

import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import { HttpHandler, HttpEvent, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenicationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with JWT token if available
        const currentUser = this.authenicationService.currentUserValue;

        if (currentUser && currentUser.token) {
            // clone request and add jwt token to Authorization header
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}

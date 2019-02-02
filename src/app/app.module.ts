import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// npm install --save angular-webstorage-service
import { StorageServiceModule } from 'angular-webstorage-service';

import { AppRoutingModule } from './app-routing.module';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
// import { AdminModule } from './admin/admin.module';
import { LocalStorageService } from './services/localstorage.service';
// import { SessionStorageService } from './services/sessionstorage.service';
// import { AuthenticationService } from './services/authentication.service';
import { StoreService } from './store/store.service';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { reducers } from './store/reducers';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DrawComponent } from './components/draw/draw.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { LoginComponent } from './components/login/login.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DrawComponent,
        ArchiveComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        DynamicFormModule,
        HttpClientModule,
        // AdminModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument(),
        StorageServiceModule
    ],
    // exports: [
    //     DynamicFormModule
    // ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy},
        StoreService,
        LocalStorageService,
        // SessionStorageService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
        // AuthenticationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

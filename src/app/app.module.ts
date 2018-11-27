import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// npm install --save angular-webstorage-service
import { StorageServiceModule } from 'angular-webstorage-service';

import { AppRoutingModule } from './app-routing.module';
import { LocalStorageService } from './services/localstorage.service';
import { SessionStorageService } from './services/sessionstorage.service';
import { StoreService } from './store/store.service';
import { reducers } from './store/reducers';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument(),
        StorageServiceModule
    ],
    providers: [
        StoreService,
        LocalStorageService,
        SessionStorageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
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
    ],
    providers: [
        StoreService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

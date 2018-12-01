import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DrawComponent } from './components/draw/draw.component';
import { ArchiveComponent } from './components/archive/archive.component';

const routes: Routes = [{
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'draw',
        component: DrawComponent
    },
    {
        path: 'archive',
        component: ArchiveComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

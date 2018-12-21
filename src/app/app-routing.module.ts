import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role.models';

import { HomeComponent } from './components/home/home.component';
import { DrawComponent } from './components/draw/draw.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'draw',
                component: DrawComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'archive',
                component: ArchiveComponent
            },
            {
                path: 'admin',
                component: AdminComponent,
                canActivate: [AuthGuard],
                data: { roles: [Role.Admin] }
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: '**',
                component: HomeComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

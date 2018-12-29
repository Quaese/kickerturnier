import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './../guards/auth.guard';
import { Role } from '../models/role.models';

import { AdminComponent } from './components/admin/admin.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [{
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
    children: [
        {
            path: '',
            redirectTo: 'user-list',
            canActivate: [AuthGuard],
            pathMatch: 'full'
        },
        {
            path: 'user-list',
            component: UserListComponent,
            canActivate: [AuthGuard],
            data: { roles: [Role.Admin] }
        },
        {
            path: 'user-create',
            component: UserCreateComponent,
            canActivate: [AuthGuard],
            data: { roles: [Role.Admin] }
        },
        {
            path: 'user-edit/:id',
            component: UserEditComponent,
            canActivate: [AuthGuard],
            data: { roles: [Role.Admin] }
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }

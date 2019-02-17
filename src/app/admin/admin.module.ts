import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './components/admin/admin.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';

@NgModule({
    declarations: [
        AdminComponent,
        UserCreateComponent,
        UserListComponent,
        UserEditComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        DynamicFormModule
    ]
})
export class AdminModule { }

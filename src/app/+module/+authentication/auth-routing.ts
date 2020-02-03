import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthComponent} from './auth.component';
import {RegisterComponent} from './register/register.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ProfileEmpComponent} from './profile-emp/profile-emp.component';
import {AuthGuard} from '../../_services/guards/auth.guard';

const authRoutes: Routes = [
    {
        path: '',
        component: AuthComponent,
        data: {pageTitle: 'Auth'},
        resolve: {
            // isAuthenticated: HomeAuthResolver
        },
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'changepassword',
                canActivate: [AuthGuard],
                component: ChangePasswordComponent
            },
            {
                path: 'profile',
                canActivate: [AuthGuard],
                component: ProfileEmpComponent
            }

        ]
    }
];

export const AuthRouting: ModuleWithProviders = RouterModule.forChild(authRoutes);

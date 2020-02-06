import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthComponent} from './auth.component';
import {RegisterComponent} from './register/register.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {AuthGuard} from '../../_services/guards/auth.guard';
import {API_VERIFY_ACCOUNT} from '../../_models/config/api-paths';
import {AccountConfirmationComponent} from './account-confirmation/account-confirmation.component';

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
                path: 'verify-account',
                component: AccountConfirmationComponent
            }
            // {
            //     path: 'profile',
            //     canActivate: [AuthGuard],
            //     component: ProfileEmpComponent
            // }

        ]
    }
];

export const AuthRouting: ModuleWithProviders = RouterModule.forChild(authRoutes);

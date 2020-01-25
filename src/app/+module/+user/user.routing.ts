import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserMngComponent} from './manage/user-mng.component';
import {AuthGuard} from '../../_services/guards/auth.guard';
import {UserComponent} from './user.component';

const userRoutes: Routes = [
    {
        path: '',
        data: {pageTitle: 'User'},
        component: UserComponent,
        // canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'mng',
                pathMatch: 'full',
                // canActivate: [AuthGuard]
            },
            {
                path: 'mng',
                component: UserMngComponent,
                // canActivate: [AuthGuard]
            }
        ]
    }
];

export const UserRouting: ModuleWithProviders = RouterModule.forChild(userRoutes);

import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserMngComponent} from './manage/user-mng.component';
import {UserComponent} from './user.component';

const userRoutes: Routes = [
    {
        path: '',
        data: {pageTitle: 'User'},
        component: UserComponent,
        children: [
            {
                path: '',
                redirectTo: 'mng',
                pathMatch: 'full'
            },
            {
                path: 'mng',
                component: UserMngComponent
            }
        ]
    }
];

export const UserRouting: ModuleWithProviders = RouterModule.forChild(userRoutes);

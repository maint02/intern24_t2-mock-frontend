import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeComponent} from './employee.component';
import {EmployeeMngComponent} from './manage/employee-mng.component';
import {GuardsGuard} from '../../_services/guards/guards.guard';
import {AuthGuard} from '../../_services/guards/auth.guard';
import {ProfileComponent} from './profile/profile.component';
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';

const employeeRoutes: Routes = [
    {
        path: '',
        data: {pageTitle: 'Employee'},
        component: EmployeeComponent,
        children: [
            {
                path: '',
                redirectTo: 'employee',
                pathMatch: 'full',
            },
            {
                path: 'employee',
                canActivate:[GuardsGuard],
                component: EmployeeMngComponent
            },
            {
                path: 'employee-detail',
                canActivate:[GuardsGuard],
                component: EmployeeDetailComponent
            },
            {
                path: 'profile',
                canActivate:[AuthGuard],
                component: ProfileComponent
            }
        ]
    }
];

export const EmployeeRouting: ModuleWithProviders = RouterModule.forChild(employeeRoutes);

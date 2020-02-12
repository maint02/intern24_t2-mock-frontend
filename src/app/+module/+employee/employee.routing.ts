import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeComponent} from './employee.component';
import {EmployeeMngComponent} from './manage/employee-mng.component';
import {GuardsGuard} from '../../_services/guards/guards.guard';
import {AuthGuard} from '../../_services/guards/auth.guard';
import {EmployeeDetailComponent} from './employee-detail/employee-detail.component';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';

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
                path: 'add',
                canActivate:[GuardsGuard],
                component: EmployeeCreateComponent
            },
        ]
    }
];

export const EmployeeRouting: ModuleWithProviders = RouterModule.forChild(employeeRoutes);

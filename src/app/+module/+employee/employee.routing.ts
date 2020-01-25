import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeComponent} from './employee.component';
import {EmployeeMngComponent} from './manage/employee-mng.component';

const employeeRoutes: Routes = [
    {
        path: '',
        data: {pageTitle: 'Employee'},
        component: EmployeeComponent,
        children: [
            {
                path: '',
                redirectTo: 'mng',
                pathMatch: 'full',
            },
            {
                path: 'mng',
                component: EmployeeMngComponent
            }
        ]
    }
];

export const EmployeeRouting: ModuleWithProviders = RouterModule.forChild(employeeRoutes);

import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AppComponent} from './app.component';

export const AppRoutes: Routes = [
    {
        path: '',
        component: AppComponent,
        // load các module con
        children: [
            {
                path: 'auth',
                loadChildren: () =>
                    import('./+module/+authentication/auth.module').then(
                        m => m.AuthModule
                    )
            },
            {
                path: '',
                loadChildren: () =>
                    import('./+module/+home/home.module').then(
                        m => m.HomeModule
                    )
            },
            {
                path: 'user',
                loadChildren: () =>
                    import('./+module/+user/user.module').then(
                        m => m.UserModule
                    )
            },
            {
                path: 'employee',
                loadChildren: () =>
                    import('./+module/+employee/employee.module').then(
                        m => m.EmployeeModule
                    )
            }
        ]
    }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes, {useHash: true});


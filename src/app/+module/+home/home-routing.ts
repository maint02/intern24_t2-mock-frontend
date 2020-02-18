import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {NewsComponent} from './news/news.component';
import {NewsDetailComponent} from './news-detail/news-detail.component';
import {NewsAddComponent} from './news-add/news-add.component';
import {ProfileEmpComponent} from './profile-emp/profile-emp.component';
import {AuthGuard} from '../../_services/guards/auth.guard';
import {NewsManagerComponent} from './news-manager/news-manager.component';

const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: {pageTitle: 'Home'},
        children: [
            {
                path: '',
                redirectTo: 'news',
                pathMatch: 'full'
            },
            {
                path: 'news/:id',
                component: NewsDetailComponent
            },
            {
                path: 'news',
                component: NewsComponent
            },
            {
                path: 'newsAdd',
                component: NewsAddComponent
            },
            {
                path: 'profile',
                component: ProfileEmpComponent
            },
            {
                path: 'newMng',
                component: NewsManagerComponent
            }
        ]
    }
];

export const HomeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);

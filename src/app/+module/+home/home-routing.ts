import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {MonitorComponent} from './monitor/monitor.component';
import {NewsComponent} from './news/news.component';
import {NewsDetailComponent} from './news-detail/news-detail.component';

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
            }
        ]
    }
];

export const HomeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);

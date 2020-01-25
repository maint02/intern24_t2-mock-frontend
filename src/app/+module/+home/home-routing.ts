import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {MonitorComponent} from './monitor/monitor.component';
import {NewsComponent} from './news/news.component';
import {HomepageComponent} from './homepage/homepage.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {pageTitle: 'Home'},
    children: [
      {
        path: '',
        redirectTo: 'homepage',
        pathMatch: 'full'
      },
      { path: 'home/homepage',
        component: HomepageComponent
      },
      { path: 'home/news',
        component: NewsComponent
      }
    ]
  }
];

export const HomeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);

import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {HomeComponent} from './home.component';
import {HomeRouting} from './home-routing';
import { NewsComponent } from './news/news.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsAddComponent } from './news-add/news-add.component';
import { ProfileEmpComponent } from './profile-emp/profile-emp.component';
import { NewsManagerComponent } from './news-manager/news-manager.component';

@NgModule({
  imports: [
    SharedModule,
    HomeRouting
  ],
  declarations: [
    HomeComponent,
    NewsComponent,
    NewsDetailComponent,
    NewsAddComponent,
    ProfileEmpComponent,
    NewsManagerComponent
  ],
  exports: []
})
export class HomeModule {}

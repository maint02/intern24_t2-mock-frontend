import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {HomeComponent} from './home.component';
import {HomeRouting} from './home-routing';
import {MonitorComponent} from './monitor/monitor.component';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  imports: [
    SharedModule,
    HomeRouting
  ],
  declarations: [
    HomeComponent,
    MonitorComponent,
    HomepageComponent
  ],
  exports: []
})
export class HomeModule {}

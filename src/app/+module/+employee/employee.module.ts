import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {EmployeeComponent} from './employee.component';
import {EmployeeRouting} from './employee.routing';
import {EmployeeMngComponent} from './manage/employee-mng.component';
import { ProfileComponent } from './profile/profile.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

@NgModule({
  imports: [
    SharedModule,
    EmployeeRouting
  ],
  declarations: [
    EmployeeComponent,
    EmployeeMngComponent,
    ProfileComponent,
    EmployeeDetailComponent
  ],
  exports: []
})
export class EmployeeModule {}

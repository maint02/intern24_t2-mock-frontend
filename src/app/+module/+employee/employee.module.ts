import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {EmployeeComponent} from './employee.component';
import {EmployeeRouting} from './employee.routing';
import {EmployeeMngComponent} from './manage/employee-mng.component';

@NgModule({
  imports: [
    SharedModule,
    EmployeeRouting
  ],
  declarations: [
    EmployeeComponent,
    EmployeeMngComponent
  ],
  exports: []
})
export class EmployeeModule {}

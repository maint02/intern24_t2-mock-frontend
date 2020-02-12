import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {EmployeeComponent} from './employee.component';
import {EmployeeRouting} from './employee.routing';
import {EmployeeMngComponent} from './manage/employee-mng.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';

@NgModule({
  imports: [
    SharedModule,
    EmployeeRouting
  ],
  declarations: [
    EmployeeComponent,
    EmployeeMngComponent,
    EmployeeDetailComponent,
    EmployeeCreateComponent
  ],
  exports: []
})
export class EmployeeModule {}

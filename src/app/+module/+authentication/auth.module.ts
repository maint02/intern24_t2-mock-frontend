import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {SharedModule} from '../../shared/shared.module';
import {LoginComponent} from './login/login.component';

import {AuthRouting} from './auth-routing';
import {RegisterComponent} from './register/register.component';
import { AccountConfirmationComponent } from './account-confirmation/account-confirmation.component';
import {AuthService} from '../../_services/auth.service';
import { ProfileEmpComponent } from './profile-emp/profile-emp.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
    imports: [SharedModule, AuthRouting],
    declarations: [AuthComponent,
        LoginComponent, RegisterComponent, AccountConfirmationComponent, ProfileEmpComponent, ChangePasswordComponent],
    exports: [],
    providers: [AuthService]
})
export class AuthModule {
}

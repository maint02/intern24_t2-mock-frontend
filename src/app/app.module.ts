import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Routing} from './app.routing';
import {SharedModule} from './shared/shared.module';
import {HomeModule} from './+module/+home/home.module';
import {AuthModule} from './+module/+authentication/auth.module';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtInterceptor} from './_services/interceptors/jwt.interceptor';
import {ErrorInterceptor} from './_services/interceptors/error.interceptor';
import {UserModule} from './+module/+user/user.module';
import {EmployeeModule} from './+module/+employee/employee.module';


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        HomeModule,
        AuthModule,
        UserModule,
        EmployeeModule,
        Routing,
        ToastrModule .forRoot({
            timeOut: 1000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true
        })
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    exports: [],
    bootstrap: [AppComponent]
})

export class AppModule {
}

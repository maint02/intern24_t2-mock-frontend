import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FooterComponent} from './layout/footer/footer.component';
import {NavbarComponent} from './layout/global-navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ListErrorsComponent} from './layout/list-errors/list-errors.component';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ApiService} from '../_services/api.service';
import {NgxPaginationModule} from 'ngx-pagination';
import {PaginationModule} from 'ngx-bootstrap';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        NgbModule,
        NgxPaginationModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
            isolate: false
        }),
        PaginationModule.forRoot()
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        ListErrorsComponent
        // ListErrorsComponent,
        // ShowAuthedDirective
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        // ListErrorsComponent,
        RouterModule,
        NavbarComponent,
        FooterComponent,
        ListErrorsComponent,
        // ShowAuthedDirective
        TranslateModule,
        ToastrModule,
        NgxPaginationModule,
        PaginationModule
    ],
    providers: [ApiService]
})
export class SharedModule {
    constructor(private translate: TranslateService) {
        translate.addLangs(['en', 'vi']);
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|vi/) ? browserLang : 'en');
    }
}

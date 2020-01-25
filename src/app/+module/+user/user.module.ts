import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {UserMngComponent} from './manage/user-mng.component';
import {UserRouting} from './user.routing';
import {UserComponent} from './user.component';

@NgModule({
    declarations:[ UserMngComponent, UserComponent ],
    imports: [ SharedModule, UserRouting ],
    exports: [],
    providers: []
})
export class UserModule{}

import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {USER_ROLE_KEY, USER_TOKEN_KEY} from '../../_models/config/local-storage-keys';
import {ROLE_HR, ROLE_MANAGER} from '../../_models/config/user-roles-keys';

@Injectable({
    providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
    constructor(
        private router: Router,
        private auth: AuthService
    ) {

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const role = localStorage.getItem(USER_ROLE_KEY);
        if (((role === ROLE_HR) || (role === ROLE_MANAGER)) && (this.auth.isLoggedIn())) {
            return true;
        }
        return false;
    }

}

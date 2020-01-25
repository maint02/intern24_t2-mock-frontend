import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../authentication.service';
import {USER_TOKEN_KEY} from '../../_models/config/local-storage-keys';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let jsonReq: HttpRequest<any> = request.clone({
            setHeaders: {
                Authorization: `Bearer ${localStorage.getItem(USER_TOKEN_KEY)}`
            }
        });

        return next.handle(jsonReq);


        // add auth header with jwt if user is logged in and request is to api url
        // const currentUser = this.authenticationService.currentUserValue;
        // const isLoggedIn = currentUser && currentUser.token;
        // const isApiUrl = request.url.startsWith('api');
        //
        // const headersConfig = {
        //     'Content-Type': 'application/json',
        //     'Accept': 'application/json'
        // };
        //
        // if (isLoggedIn && isApiUrl) {
        //     headersConfig['Auth-Token'] = currentUser.token;
        // }
        //
        // const req = request.clone({setHeaders: headersConfig});
        //
        // return next.handle(req);
    }
}

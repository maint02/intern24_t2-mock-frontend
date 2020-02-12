import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {AbstractControl, AsyncValidatorFn} from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ExistingUsernameValidator {
    constructor(
        private http: HttpClient
    ) {
    }

    searchUsername(username) {
        // debounce
        return timer(1000)
            .pipe(
                switchMap(() => {
                    // Check if username is available
                    return this.http.get<any>(`${environment}/employee/${username}`);
                })
            );
    }

    usernameValidator(): AsyncValidatorFn{
        return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
            return this.searchUsername(control.value)
                .pipe(
                    map(res => {
                        // if username is already taken
                        if (res.length) {
                            // return error
                            return { 'userNameExists': true};
                        }
                    })
                );
        };
    }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchEmployeeResponseModel} from '../_models/response/search-employee-response.model';
import {Observable, throwError} from 'rxjs';
import {API_USER_GETALL} from '../_models/config/api-paths';
import {catchError, retry} from 'rxjs/operators';
import {error} from 'util';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(
        private http: HttpClient
    ) {
    }


    getAllByParams(employeRes: SearchEmployeeResponseModel): Observable<any> {
        return this.http.post(API_USER_GETALL, employeRes)
            .pipe(
                retry(2),
                catchError((err) => {
                    return throwError(err);
                })
            );
    }
}

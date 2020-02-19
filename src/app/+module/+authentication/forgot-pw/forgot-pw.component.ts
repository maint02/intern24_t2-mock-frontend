import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../_services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-forgot-pw',
    templateUrl: './forgot-pw.component.html',
    styleUrls: ['./forgot-pw.component.css']
})
export class ForgotPwComponent implements OnInit {
    isEmailSent: boolean = false;
    change: FormGroup;

    constructor(
        private apiService: ApiService,
        private fb: FormBuilder,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.change = this.fb.group({
            email: ['', [Validators.required, Validators.pattern(
                new RegExp('^[a-z][a-z0-9_\\.]{4,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$')
            )]]
        }, {updateOn: 'blur'});
    }

    get f() {
        return this.change.controls;
    }

    onSubmit() {
        const email = this.change.controls['email'].value;

        if (this.change.invalid) {
            return;
        }

        this.apiService.get('/employee/pw/' + email)
            // bỏ qua first value
            .pipe(first())
            .subscribe(res => {
                this.isEmailSent = true;
                this.router.navigate(['/login']);
            });
    }

    onClickGoHome() {
        this.router.navigate(['']);
    }

}

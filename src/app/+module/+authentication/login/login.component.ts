import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AuthService} from '../../../_services/auth.service';
import {USER_ID_KEY, USER_ROLE_KEY, USER_TOKEN_KEY, USERNAME_KEY} from '../../../_models/config/local-storage-keys';
import {LoginRequestModel} from '../../../_models/request/login-request.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {throwError} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    username: string = '';
    password: string = '';
    submited: boolean = false;
    loginForm: FormGroup;

    constructor(
        private toastr: ToastrService,
        private router: Router,
        private auth: AuthService,
        private formBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['',[ Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        }, {updateOn: 'blur'});

        if (this.auth.isLoggedIn()) {
            this.router.navigate(['']);
        }
    }

    get f() {
        return this.loginForm.controls;
    }

    onClickLogin(): void {
        this.submited = true;
        const loginInfo: LoginRequestModel = {
            username: this.loginForm.controls['username'].value,
            password: this.loginForm.controls['password'].value
        };
        if (this.loginForm.invalid) {
            return;
        }
        this.auth.login(loginInfo).subscribe(data => {
            localStorage.setItem(USER_ID_KEY, data.id);
            localStorage.setItem(USER_ROLE_KEY, data.authorities[0]);
            localStorage.setItem(USERNAME_KEY, data.username);
            localStorage.setItem(USER_TOKEN_KEY, data.employeeToken.accessToken);

            this.router.navigate(['']);
        }, error => {
            return throwError(error);
        });
    }

    onClickRegister(): void {
        this.router.navigate(['/register']);
    }

    onClickGoHome(): void {
        this.router.navigate(['']);
    }
    onClickForgotPW(){
        this.router.navigate(['/forgot-password']);
    }
}


import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AuthService} from '../../../_services/auth.service';
import {USER_ID_KEY, USER_ROLE_KEY, USER_TOKEN_KEY, USERNAME_KEY} from '../../../_models/config/local-storage-keys';
import {LoginRequestModel} from '../../../_models/request/login-request.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    username: string = '';
    password: string = '';

    constructor(
        private toastr: ToastrService,
        private router: Router,
        private auth: AuthService
    ) {
    }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            this.router.navigate(['']);
        }
    }

    onClickLogin(): void {
        const loginInfo: LoginRequestModel = {
            username: this.username,
            password: this.password
        };

        this.auth.login(loginInfo).subscribe(data => {
            localStorage.setItem(USER_ID_KEY, data.id);
            localStorage.setItem(USER_ROLE_KEY, data.authorities[0]);
            localStorage.setItem(USERNAME_KEY, data.username);
            localStorage.setItem(USER_TOKEN_KEY, data.token.accessToken);

            this.router.navigate(['']);
        }, error => {
            this.toastr.warning(error.error.message, 'Warning');
        });
    }

    onClickRegister(): void {
        this.router.navigate(['/register']);
    }


}


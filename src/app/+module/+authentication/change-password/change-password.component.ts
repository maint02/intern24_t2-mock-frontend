import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ChangePasswordModel} from '../../../_models/request/change-password.model';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    passwordForm: FormGroup;


    constructor(
        private auth: AuthService,
        private router: Router,
        private toastr: ToastrService
    ) {
    }

    ngOnInit() {
        this.passwordForm = new FormGroup({
            oldPassword: new FormControl('', Validators.required),
            newPassword: new FormControl('', Validators.required)
        });
    }

    onSubmitNewPW() {
        if (!this.passwordForm.valid) {
            this.toastr.error('All fields must be filled out');
            return;
        }
        const oldPassword = this.passwordForm.controls['oldPassword'].value;
        const newPassword = this.passwordForm.controls['newPassword'].value;

        const passwords: ChangePasswordModel = {
            oldPassword: oldPassword,
            newPassword: newPassword
        };
        this.auth.changePassword(passwords).subscribe(data => {
            this.toastr.success('Your password has been changed. Please login again.');
            this.auth.logout();
            this.router.navigate(['/login']);
        }, error => {
            this.toastr.error('There was an error. Your password will remain the same');
        });
    }

    onClickGoHome(): void {
        this.router.navigate(['']);
    }
}

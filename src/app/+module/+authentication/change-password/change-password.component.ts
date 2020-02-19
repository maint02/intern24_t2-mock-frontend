import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ChangePasswordModel} from '../../../_models/request/change-password.model';
import {PasswordMatchValidatorValidator} from '../custom-validators/PasswordMatchValidator.validator';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    passwordForm: FormGroup;

    messege = '';

    constructor(
        private auth: AuthService,
        private router: Router,
        private toastr: ToastrService,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.passwordForm = this.fb.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(
                new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
            )]],
            rePassword: ['', Validators.required]
        }, {
            updateOn: 'blur',
            validators: PasswordMatchValidatorValidator.passwordMatchValidator
        });

    }

    get f() {
        return this.passwordForm.controls;
    }


    onSubmitNewPW() {
        // check passwordForm có hợp lệ không
        if (this.passwordForm.invalid) {
            this.toastr.error('All fields must be filled out');
            return;
        }
        const oldPassword = this.passwordForm.controls['oldPassword'].value;
        const newPassword = this.passwordForm.controls['newPassword'].value;
        const rePassword = this.passwordForm.controls['rePassword'].value;


        // gắn giá trị model cho form
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

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ApiService} from '../../../_services/api.service';
import {EmployeeRequestModel} from '../../../_models/request/employee-request.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    isUserInfoSent: boolean = false;
    registrationForm: FormGroup;
    selectedFile: File;
    imgURL: any;
    // isUserNotSent: boolean = false;
    retrievedImage: any;
    base64Data: any;
    retrieveResonse: any;
    message: string;
    imageName: any;

    constructor(
        private auth: AuthService,
        private toastr: ToastrService,
        private router: Router,
        private apiService: ApiService
    ) {
    }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            this.toastr.warning('Please logout if you want to create a new account.', 'Warning');
            this.router.navigate(['']);
        }

        this.registrationForm = new FormGroup({
            username: new FormControl('', Validators.required),
            fullName: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            phoneNumber: new FormControl('', Validators.required),
            skypeAcc: new FormControl('', Validators.required),
            fbLink: new FormControl('', Validators.required),
            userType: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required),
            education: new FormControl('', Validators.required),
            university: new FormControl('', Validators.required),
            faculty: new FormControl('', Validators.required),
            graduationYear: new FormControl('', Validators.required)
        });
    }

    onRegisterSubmit(): void {
        if (!this.registrationForm.valid) {
            this.toastr.error('All fields need to be filled.');
            return;
        }

        // const password = this.registrationForm.controls['password'].value;
        // const repeatPassword = this.registrationForm.controls['repeatPassword'].value;
        //
        // if (password !== repeatPassword) {
        //     this.toastr.warning('Passwords don\'t match', 'Warning');
        //     return;
        // }

        const userInfo: EmployeeRequestModel = {
                username: this.registrationForm.controls['username'].value,
                fullName: this.registrationForm.controls['fullName'].value,
                email: this.registrationForm.controls['email'].value,
                phoneNumber: this.registrationForm.controls['phoneNumber'].value,
                skypeAcc: this.registrationForm.controls['skypeAcc'].value,
                fbLink: this.registrationForm.controls['fbLink'].value,
                userType: this.registrationForm.controls['userType'].value,
                address: this.registrationForm.controls['address'].value,
                education: this.registrationForm.controls['education'].value,
                university: this.registrationForm.controls['university'].value,
                faculty: this.registrationForm.controls['faculty'].value,
                graduationYear: this.registrationForm.controls['graduationYear'].value
            }
        ;

        this.apiService.post('/employee/add', userInfo).subscribe(data => {
            this.isUserInfoSent = true;
            // this.isUserNotSent = true;
        }, error => {
            // this.isUserNotSent = false;
            this.toastr.error('There was an error while adding your account. Try again later.');
        });
    }

    onClickSignIn(): void {
        this.router.navigate(['/login']);
    }

    onClickGoHome(): void {
        this.router.navigate(['']);
    }

    //Employee Info
    // getImage() {
    //     this.httpClient.get('http://localhost:9999/api/employee/info' + this.imageName)
    //         .subscribe(
    //             res => {
    //                 this.retrieveResonse = res;
    //                 this.base64Data = this.retrieveResonse.picByte;
    //                 this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    //             }
    //         );
    // }

}

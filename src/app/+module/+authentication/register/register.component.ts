import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../_services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {ApiService} from '../../../_services/api.service';
import {EmployeeRequestModel} from '../../../_models/request/employee-request.model';
import {ExistingUsernameValidator} from '../custom-validators/existingUsernameValidator';

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
        private apiService: ApiService,
        private fb: FormBuilder,
        private val: ExistingUsernameValidator
    ) {
    }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            this.toastr.warning('Please logout if you want to create a new account.', 'Warning');
            this.router.navigate(['']);
        }

        this.registrationForm = this.fb.group({
            username: ['',Validators.compose( [Validators.required]),this.val.usernameValidator],
            fullName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern(
                new RegExp('^[a-z][a-z0-9_\\.]{4,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$')
            )]],
            phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
            skypeAcc: ['', [Validators.required]],
            fbLink: ['', [Validators.required]],
            userType: ['', Validators.required],
            address: ['', Validators.required],
            education: ['', Validators.required],
            university: ['', Validators.required],
            faculty: ['', Validators.required],
            graduationYear: ['', [Validators.required, Validators.minLength(4)]]
        }, {updateOn: 'blur'});
        const username = this.registrationForm.controls['username'].value;
    }

    get f() {
        return this.registrationForm.controls;
    }

    sendMail() {
        console.log('email : ');
    }

    onRegisterSubmit(): void {
        if (this.registrationForm.invalid) {
            return;
        }

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
        }, error => {
            this.toastr.error('There was an error while adding your account. Try again later.');
        });

    }

    checkUsername() {
        const username = this.registrationForm.controls['username'].value;
        console.log('username : ' + username);

        return this.apiService.get('/employee/' + username).subscribe(res => {
            if (res.code === '00') {
                 this.message = 'Username Already Exist!';
            } else {
                this.message = '';
            }
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

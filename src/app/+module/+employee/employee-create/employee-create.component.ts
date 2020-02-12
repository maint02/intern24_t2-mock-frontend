import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../_services/api.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../_services/auth.service';
import {EmployeeAddModel} from '../../../_models/request/employee-add.model';

@Component({
    selector: 'app-employee-create',
    templateUrl: './employee-create.component.html',
    styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
    isSent: boolean = false;
    addForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private router: Router,
        private toastr: ToastrService,
        private auth: AuthService
    ) {
    }

    ngOnInit() {
        if (!this.auth.isLoggedIn()) {
            this.toastr.error('Please login!');
            return;
        }

        this.addForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required,Validators.pattern(
                new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
            )]],
            email: ['', [Validators.required, Validators.pattern(
                new RegExp('^[a-z][a-z0-9_\\.]{4,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$')
            )]],
            birthday: ['', [Validators.required]],
            address: ['', [Validators.required]],
            education: ['', [Validators.required]],
            faculty: ['', [Validators.required]],
            fbLink: ['', [Validators.required]],
            fullName: ['', [Validators.required]],
            graduationYear: ['', [Validators.required, Validators.maxLength(4)]],
            actived: ['', [Validators.required]],
            leader: ['', [Validators.required]],
            manager: ['', [Validators.required]],
            phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
            skypeAcc: ['', [Validators.required]],
            university: ['', [Validators.required]],
            userType: ['', [Validators.required]],
            role: ['', [Validators.required]],
            department: ['', [Validators.required]],
            position: ['', [Validators.required]]
        }, {
            updateOn: 'blur'
        });
    }

    get f() {
        return this.addForm.controls;
    }

    onCreate() {
        if (this.addForm.invalid) {
            this.toastr.error('All fields need to be filled!');
            return;
        }

        const employeeAdd: EmployeeAddModel = {
            username: this.addForm.controls['username'].value,
            password: this.addForm.controls['password'].value,
            email: this.addForm.controls['email'].value,
            birthday: this.addForm.controls['birthday'].value,
            address: this.addForm.controls['address'].value,
            education: this.addForm.controls['education'].value,
            faculty: this.addForm.controls['faculty'].value,
            fbLink: this.addForm.controls['fbLink'].value,
            fullName: this.addForm.controls['fullName'].value,
            graduationYear: this.addForm.controls['graduationYear'].value,
            actived: this.addForm.controls['actived'].value,
            leader: this.addForm.controls['leader'].value,
            manager: this.addForm.controls['manager'].value,
            phoneNumber: this.addForm.controls['phoneNumber'].value,
            skypeAcc: this.addForm.controls['skypeAcc'].value,
            university: this.addForm.controls['university'].value,
            userType: this.addForm.controls['userType'].value,
            role: this.addForm.controls['role'].value,
            department: this.addForm.controls['department'].value,
            position: this.addForm.controls['position'].value
        };
        this.apiService.postByAd('/add', employeeAdd).subscribe(data => {
            this.isSent = true;
            this.toastr.success('create successfully!');
            this.router.navigate(['/employee']);
        }, error => {
            this.toastr.error('Cant add employee');
        });

    }
}

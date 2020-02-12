import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../_services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProfileEmp} from '../../../_models/profile-emp';
import {USER_ID_KEY} from '../../../_models/config/local-storage-keys';
import {first} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-profile-emp',
    templateUrl: './profile-emp.component.html',
    styleUrls: ['./profile-emp.component.css']
})
export class ProfileEmpComponent implements OnInit {
    profileEmp: ProfileEmp[] = [];

    profileForm: FormGroup;

    idProfile: any;

    status: any;

    constructor(
        private apiService: ApiService,
        private fb: FormBuilder,
        private router: Router,
        private toastr: ToastrService
    ) {
    }

    ngOnInit() {
        this.idProfile = localStorage.getItem(USER_ID_KEY);
        if (this.idProfile == null) {
            console.log('id is not found!');
            return;
        }
        this.profileForm = this.fb.group({
            id: [0],
            username: [1],
            password: [2],
            email: ['', [Validators.required, Validators.pattern(
                new RegExp('^[a-z][a-z0-9_\\.]{4,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$')
            )]],
            birthday: ['', Validators.required],
            address: ['', Validators.required],
            createdDate: ['', Validators.required],
            education: ['', Validators.required],
            faculty: ['', Validators.required],
            fbLink: ['', Validators.required],
            fullName: ['', Validators.required],
            graduationYear: ['', Validators.required, Validators.minLength(4)],
            lastAccess: ['', Validators.required],
            phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
            skypeAcc: ['', Validators.required],
            university: ['', Validators.required],
            userType: ['', Validators.required]

        }, {updateOn: 'blur'});
        this.profileForm.reset({value: 'username', disabled: 'true'});
        this.profileForm.reset({value: 'createdDate', disabled: 'true'});
        this.profileForm.reset({value: 'isActived', disabled: 'true'});
        this.profileForm.reset({value: 'password', disabled: 'true'});

        console.log('id pro: ' + this.idProfile);
        this.apiService.get('/employee/id/' + this.idProfile).subscribe(
            res => {
                console.log('res : ' + res.data);
                // if (res.data === '00') {
                this.profileForm.setValue(res.data);
                this.status = res.data.actived;
                this.profileEmp = res.data;
                console.log('profile: ' + this.profileEmp);

                // }
            }
        );
    }


    get f() {
        return this.profileForm.controls;
    }

    onEdit() {
        if (this.profileForm.invalid) {
            return;
        }

        this.apiService.put('/employee/update', this.profileForm.value)
            .pipe(first())
            .subscribe(res => {
                this.toastr.success('Employee Update Successfully!');
                this.router.navigate(['']);
            }, error => {
                this.toastr.error('All fields need to be filled!');
                this.router.navigate(['']);
            });

    }
}

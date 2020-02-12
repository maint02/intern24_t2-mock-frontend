import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../_services/api.service';
import {Employee} from '../../../_models/employee.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {first} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AuthService} from '../../../_services/auth.service';
import {Authorities} from '../../../_models/authorities';

@Component({
    selector: 'app-employee-detail',
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
    employee: Employee[] = [];

    editForm: FormGroup;

    name: any;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private activatedRouter: ActivatedRoute,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private authService: AuthService
    ) {

    }

    ngOnInit() {
        let empId = window.localStorage.getItem('viewOrEditUser');
        if (!empId) {
            this.toastr.error('Invalid action.');
            this.router.navigate(['/employee']);
            return;
        }

        this.editForm = this.formBuilder.group({
                id: ['', [Validators.required]],
                username: [''],
                password: [''],
                email: ['', [Validators.required]],
                birthday: ['', [Validators.required]],
                address: ['', [Validators.required]],
                createdDate: [''],
                education: ['', [Validators.required]],
                faculty: ['', [Validators.required]],
                fbLink: ['', [Validators.required]],
                fullName: ['', [Validators.required]],
                graduationYear: ['', [Validators.required]],
                lastAccess: [''],
                phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
                skypeAcc: ['', [Validators.required]],
                university: ['', [Validators.required]],
                userType: ['', [Validators.required]],
                role: ['',[Validators.required]],
                actived:['',[Validators.required]]
            },
            {
                updateOn: 'blur',
            });
        this.editForm.reset({value: 'username', disabled: 'true'});
        this.editForm.reset({value: 'id', disabled: 'true'});
        this.editForm.reset({value: 'createdDate', disabled: 'true'});
        this.editForm.reset({value: 'password', disabled: 'true'});

        this.apiService.get('/employee/id/' + empId).subscribe(res => {
            if (res.code === '00') {
                console.log(res.data);
                this.editForm.setValue(res.data);
                this.employee = res.data;
                this.name = res.data.authorities.name;
                console.log(name);
            }
        });
    }

    get authorities(): FormArray {
        return this.editForm.get('authorities') as FormArray;
    }


    get f() {
        return this.editForm.controls;
    }

    onSubmit() {
        this.authService.updateByAdmin(this.editForm.value)
            .pipe(first())
            .subscribe(res => {
                if (res) {
                    this.toastr.success('Employee Update Successfully!');
                    this.router.navigate(['/employee']);
                } else {
                    this.toastr.error('All fields need to be filled!');
                }
            }, error => {
                throwError(error);
            });
    }

}

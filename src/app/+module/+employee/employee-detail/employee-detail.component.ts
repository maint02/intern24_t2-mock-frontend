import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../_services/api.service';
import {Employee} from '../../../_models/employee.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {first} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
    selector: 'app-employee-detail',
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
    employee: Employee[] = [];

    editForm: FormGroup;

    constructor(
        private router: Router,
        private apiService: ApiService,
        private activatedRouter: ActivatedRoute,
        private formBuilder: FormBuilder,
        private toastr: ToastrService
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
            id: [''],
            username: ['', Validators.required],
            password: ['', Validators.required],
            birthday: ['',Validators.required],
            email: ['', Validators.required],
            address: ['', Validators.required],
            education: ['', Validators.required],
            faculty: ['', Validators.required],
            fbLink: ['', Validators.required],
            fullName: ['', Validators.required],
            graduationYear: ['', Validators.required],
            image: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            skypeAcc: ['', Validators.required],
            university: ['', Validators.required],
            createdDate: ['', Validators.required],
            userType: ['', Validators.required]
        });

        this.apiService.get('/employee/' + empId).subscribe(res => {
            if (res.code === '00') {
                this.editForm.setValue(res.data);
                this.employee = res.data;
                console.log(res.data);
            }
        });
    }

    onSubmit() {
        this.apiService.put('/employee/update', this.editForm.value)
            .pipe(first())
            .subscribe(res => {
                if (res.status === 200) {
                    this.toastr.success('Employee Update Successfully!');
                    this.router.navigate(['/employee']);
                } else {
                    console.log(res.message);
                    this.toastr.error('All fields need to be filled!');
                }
            }, error => {
                throwError(error);
            });
    }

}

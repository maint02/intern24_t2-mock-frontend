import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../../_services/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ProfileEmp} from '../../../_models/profile-emp';
import {USER_ID_KEY} from '../../../_models/config/local-storage-keys';
import {first} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-profile-emp',
    templateUrl: './profile-emp.component.html',
    styleUrls: ['./profile-emp.component.css']
})
export class ProfileEmpComponent implements OnInit {
    profileEmp: ProfileEmp;

    profileForm: FormGroup;

    idProfile: any;

    status: any;

    imgURL: any;
    fileData: File = null;
    previewUrl: any = null;
    fileUploadProgress: string = null;
    uploadedFilePath: string = null;

    preview: string;
    percentDone: any = 0;

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
            id: [''],
            username: [''],
            email: ['', [Validators.required, Validators.pattern(
                new RegExp('^[a-z][a-z0-9_\\.]{4,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$')
            )]],
            birthday: ['', [Validators.required]],
            address: ['', [Validators.required]],
            createdDate: ['', [Validators.required]],
            education: ['', [Validators.required]],
            faculty: ['', [Validators.required]],
            fbLink: ['', [Validators.required]],
            fullName: ['', [Validators.required]],
            image: ['', [Validators.required]],
            graduationYear: ['', [Validators.required, Validators.minLength(4)]],
            lastAccess: ['', [Validators.required]],
            phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
            skypeAcc: ['', [Validators.required]],
            university: ['', [Validators.required]],
            userType: ['', [Validators.required]]

        }, {updateOn: 'blur'});
        this.profileForm.reset({value: 'username', disabled: 'true'});
        this.profileForm.reset({value: 'createdDate', disabled: 'true'});
        this.profileForm.reset({value: 'isActived', disabled: 'true'});

        console.log('id pro: ' + this.idProfile);
        this.apiService.get('/employee/id/' + this.idProfile).subscribe(
            res => {
                console.log('res image: ' + res.data.image);
                if (res.code === '00') {
                    this.profileForm.setValue({
                        id: res.data.id,
                        username: res.data.username,
                        email: res.data.email,
                        birthday: res.data.birthday,
                        address: res.data.address,
                        createdDate: res.data.createdDate,
                        education: res.data.education,
                        faculty: res.data.faculty,
                        fbLink: res.data.fbLink,
                        fullName: res.data.fullName,
                        image: res.data.image,
                        graduationYear: res.data.graduationYear,
                        lastAccess: res.data.lastAccess,
                        phoneNumber: res.data.phoneNumber,
                        skypeAcc: res.data.skypeAcc,
                        university: res.data.university,
                        userType: res.data.userType,
                    });
                    this.uploadedFilePath = res.data.image;
                }
                this.status = res.data.actived;
                this.profileEmp = res.data;
                console.log('profile: ' + this.profileEmp);

                // }
            }
        );
    }

    uploadFile(event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.profileForm.patchValue({
            image: file
        });
        this.profileForm.get('image').updateValueAndValidity();

        // File Preview
        const reader = new FileReader();
        reader.onload = () => {
            this.preview = reader.result as string;
        };
        reader.readAsDataURL(file);
        this.profileEmp.image = this.profileForm.controls[('image')].value;

    }

    // fileProgress(fileInput: any) {
    //     this.fileData = <File> fileInput.target.files[0];
    //     this.preview();
    // }
    //
    // preview() {
    //     // Show preview
    //     var mimeType = this.fileData.type;
    //     if (mimeType.match(/image\/*/) == null) {
    //         return;
    //     }
    //
    //     var reader = new FileReader();
    //     reader.readAsDataURL(this.fileData);
    //     reader.onload = (_event) => {
    //         this.previewUrl = reader.result;
    //     };
    // }

    get f() {
        return this.profileForm.controls;
    }

    onEdit() {
        if (this.profileForm.invalid) {
            return;
        }
        this.profileEmp = this.profileForm.value;
        const formData = new FormData();

        if (this.fileData) {
            formData.append('multipartImage', this.fileData, this.fileData.name);
        }
        formData.append('info', new Blob([JSON.stringify(this.profileEmp)],
            {
                type: 'application/json'
            }));
        // const httpOptions = {
        //     headers: new HttpHeaders({})
        // };
        this.apiService.put('/employee/update', formData)
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

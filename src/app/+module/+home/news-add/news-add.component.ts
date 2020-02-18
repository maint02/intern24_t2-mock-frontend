import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ApiService} from '../../../_services/api.service';
import {Router} from '@angular/router';
import {NewsRequestModel} from '../../../_models/request/news-request.model';
import {first} from 'rxjs/operators';
import {USER_ID_KEY} from '../../../_models/config/local-storage-keys';

@Component({
    selector: 'app-news-add',
    templateUrl: './news-add.component.html',
    styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {
    newsAdd: FormGroup;

    isSentNews: boolean = false;

    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private apiService: ApiService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.newsAdd = this.fb.group({
            title: new FormControl('', [Validators.required, Validators.minLength(50)]),
            content: new FormControl('', [Validators.required]),
            summary: new FormControl('', [Validators.required, Validators.minLength(100)]),
            newCategory: new FormControl('', [Validators.required, Validators.minLength(100)]),
            thumbnail: new FormControl('')
        }, {
            updateOn: 'blur'
        });
    }

    get f() {
        return this.newsAdd.controls;
    }

    onAdd() {
        // if (this.newsAdd.invalid) {
        //   this.toastr.error('All fields need to be filled! invalid');
        //     return;
        // }
        const newRequest: NewsRequestModel = {
            title: this.newsAdd.controls['title'].value,
            content: this.newsAdd.controls['content'].value,
            summary: this.newsAdd.controls['summary'].value,
            newCategory: this.newsAdd.controls['newCategory'].value,
            thumbnail: this.newsAdd.controls['thumbnail'].value
        };
        const id = localStorage.getItem(USER_ID_KEY);
        console.log('id : ' ,id )
        this.apiService.post('/news/add/' + id, newRequest).subscribe(res => {
            this.isSentNews = true;
            this.toastr.success('add news successfully!');
            this.router.navigate(['/news']);
        }, error => {
            this.toastr.error('All fields need to be filled! ');
        });
    }

}

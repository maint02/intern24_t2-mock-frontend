import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../../../_services/api.service';
import {ToastrService} from 'ngx-toastr';
import {NewsDetailResponse} from '../../../_models/response/news-detail-response';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
    news: NewsDetailResponse;

    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService,
        private router: Router,
        private toastr: ToastrService
    ) {

    }

    ngOnInit() {
        this.getNewsById();
    }

    getNewsById() {
        const id = this.route.snapshot.paramMap.get('id');
        this.apiService.get('/news/all/' + id).subscribe(res => {
            if (res.code === '00') {
                this.news = res.data;
            }
        }, error => {
            this.toastr.error('Get News Failed!');
        });
    }
}

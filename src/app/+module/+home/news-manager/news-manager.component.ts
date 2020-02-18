import {Component, OnInit} from '@angular/core';
import {NewsResponse} from '../../../_models/response/news-response';
import {SearchNews} from '../../../_models/request/search-news';
import {ApiService} from '../../../_services/api.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-news-manager',
    templateUrl: './news-manager.component.html',
    styleUrls: ['./news-manager.component.css']
})
export class NewsManagerComponent implements OnInit {
    newsResponse: NewsResponse;
    searchNews: SearchNews = new SearchNews();

    pageOptions: any = {
        page: 0,
        pageSize: 5,
        totalRows: 0,
        totalPages: 0
    };

    listID: number[] = [];

    i: number = 0;

    constructor(
        private apiService: ApiService,
        private router: Router,
        private toastr: ToastrService
    ) {
    }

    ngOnInit() {
        this.searchNews.page = 0;
        this.searchNews.pageSize = 5;
        this.newsSearch();
        this.searchNews.page = this.pageOptions.page;
        this.searchNews.pageSize = this.pageOptions.pageSize;
        console.log('news init');
    }

    onPageChanged(event) {
        this.pageOptions.page = event.page - 1;
        this.pageOptions.pageSize = event.itemsPerPage;
        this.newsSearch();
    }

    newsSearch() {
        this.apiService.post('/news/allByParams', this.searchNews).subscribe(data => {
            if (data.code === '00') {
                this.newsResponse = data.datas;
                this.pageOptions.totalRows = data.totalRows;
                this.pageOptions.totalPages = data.totalPages;

            }
        });

    }

    onCheckBox(event) {
        console.log('event : ' + event);
        if (event.target.checked) {
            this.listID.push(event.target.value);
            console.log('list id:' + this.listID);
        } else {
            this.listID.forEach(id => {
                const vitri = this.listID.indexOf(id); // lấy index của id đó
                if (id === event.target.value) {
                    this.listID.splice(vitri, 1); // xóa 1 phần tử trong list từ id đó
                    console.log('list id:' + this.listID);
                }
            });
        }
    }

    deleteById() {
        let id = 0;
        for (let i = 0; i < this.listID.length; i++) {
            id = this.listID[i];
            this.apiService.delete('/employee/delete/' + id).subscribe(res => {
                // if (res.status === '200') {
                console.log('delete id : ' + id);
                this.newsSearch();
                this.toastr.success('delete successfully!');
                // }
            }, error => {
                this.toastr.error('Delete failed!');
            });
        }
        this.newsSearch();

    }

}

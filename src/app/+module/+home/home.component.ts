import {Component, OnInit} from '@angular/core';
import {NewsCategory} from '../../_models/news-category';
import {ApiService} from '../../_services/api.service';
import {Router} from '@angular/router';
import {NewsResponse} from '../../_models/response/news-response';
import {SearchNews} from '../../_models/request/search-news';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    newsResponse: NewsResponse[] = [];
    searchNews: SearchNews = new SearchNews();

    category: NewsCategory[] = [];

    pageOptions: any = {
        page: 0,
        pageSize: 5,
        totalRows: 0,
        totalPages: 0
    };

    constructor(
        private apiService: ApiService,
        private router: Router
    ) {
        this.searchNews.page = 0;
        this.searchNews.pageSize = 5;
    }

    ngOnInit() {
        console.log('Home init');
        this.newsSearch();
    }

    newsSearch(): void {
        this.searchNews.page = this.pageOptions.page;
        this.searchNews.pageSize = this.pageOptions.pageSize;
        this.apiService.post('/news/allByParams', this.searchNews).subscribe(data => {
            if (data.code === '00') {
                this.newsResponse = data.datas;
                this.pageOptions.totalRows = data.totalRows;
                this.pageOptions.totalPages = data.totalPages;
            }
        });
    }

    getAllCategory(): void {
        this.apiService.get('/newCategory/all').subscribe(res => {
            if (res.code === '00') {
                console.log(res);
                this.category = res.datas;
            }
        });
    }
}

import {Component, OnInit} from '@angular/core';
import {NewsResponse} from '../../../_models/response/news-response';
import {SearchNews} from '../../../_models/request/search-news';
import {NewsCategory} from '../../../_models/news-category';
import {ApiService} from '../../../_services/api.service';
import {Router} from '@angular/router';
import {HomeComponent} from '../home.component';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
    newsResponse: NewsResponse;
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
    }

    ngOnInit() {
        this.searchNews.page = 0;
        this.searchNews.pageSize = 5;
        this.newsSearch();
        this.searchNews.page = this.pageOptions.page;
        this.searchNews.pageSize = this.pageOptions.pageSize;
        console.log('news init');
    }

    newsSearch() {
        this.apiService.post('/news/allByParams', this.searchNews).subscribe(data => {
            if (data.code === '00') {
                this.newsResponse = data.datas;
                if (this.newsResponse === null) {
                    this.newsResponse = data;
                }
                this.pageOptions.totalRows = data.totalRows;
                this.pageOptions.totalPages = data.totalPages;

            }
        });

    }

    // getDetail(id: any) {
    //     this.router.navigate(['/news/', id]);
    // }

}

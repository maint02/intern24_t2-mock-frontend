import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../../_services/auth.service';
import {USERNAME_KEY} from '../../../_models/config/local-storage-keys';
import {NewsCategory} from '../../../_models/news-category';
import {ApiService} from '../../../_services/api.service';
import {throwError} from 'rxjs';
import {HomeComponent} from '../../../+module/+home/home.component';
import {GuardsGuard} from '../../../_services/guards/guards.guard';
import {NewsComponent} from '../../../+module/+home/news/news.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


    menuHidden = true;

    category: NewsCategory;

    constructor(
        private router: Router,
        private auth: AuthService,
        private apiService: ApiService,
        private guards: GuardsGuard,
        private newComponent: NewsComponent
    ) {
    }

    ngOnInit() {
        this.getAllCategory();
    }

    logout() {
        this.auth.logout();
        this.router.navigate([''], {replaceUrl: true});
    }

    getusername(): string | null {
        return localStorage.getItem(USERNAME_KEY);
    }

    getProfile() {
        this.router.navigate(['/profile']);
    }

    changePassword() {
        this.router.navigate(['/changepassword']);
    }

    addNews() {
        this.router.navigate(['/newsAdd']);
    }

    getAllCategory(): void {
        this.apiService.get('/newCategory/all').subscribe(res => {
            if (res.code === '00') {
                this.category = res.datas;
            }
        }, error => {
            return throwError(error);
        });
    }

    getCategoryById(id: any): void {
        this.apiService.get('/newCategory/all/:id', id).subscribe(
            data => {
                this.router.navigate(['/news/', id]);
            }, error => {
                return throwError(error);
            }
        );
    }

    goToEmployee() {
        this.router.navigate(['/employee']);
    }

    doSearch() {
        this.newComponent.newsSearch();
        this.router.navigate(['/news']);
    }
}

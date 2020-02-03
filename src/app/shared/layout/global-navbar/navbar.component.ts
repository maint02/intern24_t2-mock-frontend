import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../../_services/auth.service';
import {USERNAME_KEY} from '../../../_models/config/local-storage-keys';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    menuHidden = true;

    constructor(
        private router: Router,
        private i18nService: TranslateService,
        private auth: AuthService
    ) {
    }

    ngOnInit() {
    }

    toggleMenu() {
        this.menuHidden = !this.menuHidden;
    }

    setLanguage(language: string) {
        this.i18nService.use(language);
    }

    logout() {
        this.auth.logout();
        this.router.navigate([''], {replaceUrl: true});
    }

    get currentLanguage(): string {
        return this.i18nService.currentLang;
    }

    get languages(): string[] {
        return this.i18nService.getLangs();
    }

    getusername(): string | null {
        return localStorage.getItem(USERNAME_KEY);
    }

    getProfile() {
        this.router.navigate(['/profile']);
    }

  changePassword(){
      this.router.navigate(['/changepassword']);
  }
}

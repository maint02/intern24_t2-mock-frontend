import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from '../../../_services/authentication.service';

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
    private authService : AuthenticationService
  ) {}

  ngOnInit() {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  setLanguage(language: string) {
    this.i18nService.use(language);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  get currentLanguage(): string {
    return this.i18nService.currentLang;
  }

  get languages(): string[] {
    return this.i18nService.getLangs();
  }

  get username(): string | null {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    return user ? user.username : null;
    return null;
  }

}

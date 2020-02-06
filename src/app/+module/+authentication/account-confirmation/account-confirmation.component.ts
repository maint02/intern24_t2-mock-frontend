import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../_services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-account-confirmation',
    templateUrl: './account-confirmation.component.html',
    styleUrls: ['./account-confirmation.component.css']
})
export class AccountConfirmationComponent implements OnInit {
    private confirmationToken: string;

    constructor(
        private toastr: ToastrService,
        private auth: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.confirmationToken = params['token'];
            console.log('confirmationToken 111: '+this.confirmationToken);
            this.activateAccount();
        });
    }

    ngOnInit() {
        console.log('Account - Confirmation!');
    }

    activateAccount() {
        this.auth.activatedAccount(this.confirmationToken).subscribe(data => {
            this.toastr.success('Your account has been activated!');
            console.log('activated!');
            this.router.navigate(['/login']);
        }, error => {
            this.toastr.error('There was an error while activating your account.');
        });
    }

}

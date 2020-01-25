import {Component, OnInit} from '@angular/core';
import {User} from '../../../_models/user.model';

@Component({
    selector:"app-user-mng",
    templateUrl: './user-mng.component.html',
    styleUrls: ['./user-mng.component.css']
})
export class UserMngComponent implements OnInit{

    userHashCode: User[] = [
        { id: 1, email:'abc@123', fullName: 'Tran Van A', username: 'TVA', password: null, dateOfBirth: '16/12/2019' },
        { id: 2, email:'abc@123', fullName: 'Tran Van A', username: 'TVA', password: null, dateOfBirth: '16/12/2019' },
        { id: 3, email:'abc@123', fullName: 'Tran Van A', username: 'TVA', password: null, dateOfBirth: '16/12/2019' }
    ];

    users: User[] = [];
    constructor(){}
    ngOnInit(): void {
        this.users = this.userHashCode;
    }

}

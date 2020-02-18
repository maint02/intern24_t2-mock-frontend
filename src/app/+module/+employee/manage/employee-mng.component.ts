import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../_services/api.service';
import {Employee} from '../../../_models/employee.model';
import {SearchEmployeeModel} from '../../../_models/request/search-employee.model';
import {SearchEmployeeResponseModel} from '../../../_models/response/search-employee-response.model';
import {EmployeeService} from '../../../_services/employee.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-employee-mng',
    templateUrl: './employee-mng.component.html',
    styleUrls: ['./employee-mng.component.css']
})
export class EmployeeMngComponent implements OnInit {

    employee: Employee[] = [];
    searchResponseModel: SearchEmployeeResponseModel = new SearchEmployeeResponseModel();


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
        private employeService: EmployeeService,
        private router: Router,
        private toastr: ToastrService
    ) {

    }

    ngOnInit(): void {
        this.searchResponseModel.page = 0;
        this.searchResponseModel.pageSize = 5;
        this.doSearch();
        this.searchResponseModel.page = this.pageOptions.page;
        this.searchResponseModel.pageSize = this.pageOptions.pageSize;
    }

    onClickSearch() {
        this.pageOptions.page = 0;
        this.doSearch();
    }

    doSearch() {
        this.employeService.getAllByParams(this.searchResponseModel).subscribe(res => {
                if (res.code === '00') {
                    this.employee = res.datas;
                    this.pageOptions.totalPages = res.totalPages;
                    this.pageOptions.totalRows = res.totalRows;
                }
            }
        );
    }

    onPageChanged(event) {
        this.pageOptions.page = event.page - 1;
        this.pageOptions.pageSize = event.itemsPerPage;
        this.doSearch();
    }


    viewOrEditUser(employee: Employee) {
        window.localStorage.removeItem('viewOrEditUser');
        window.localStorage.setItem('viewOrEditUser', employee.id.toString());
        this.router.navigate(['/employee-detail']);
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
                    this.doSearch();
                    this.toastr.success('delete successfully!');
                // }
            }, error => {
                this.toastr.error('Delete failed!');
            });
        }
        this.doSearch();

    }

    doDelete(id: any) {
        this.apiService.delete('/employee/delete/' + id).subscribe(res => {
                this.doSearch();
                this.toastr.success('delete successfully!');
        }, error => {
            this.toastr.error('Delete failed!');
        });
    }

    goToAdd() {
        this.router.navigate(['/add']);
    }
}

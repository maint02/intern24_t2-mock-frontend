import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../_services/api.service';
import {Employee} from '../../../_models/employee.model';
import {SearchEmployeeModel} from '../../../_models/request/search-employee.model';
import {SearchEmployeeResponseModel} from '../../../_models/response/search-employee-response.model';
import {EmployeeService} from '../../../_services/employee.service';
import {Router} from '@angular/router';

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

    constructor(
        private apiService: ApiService,
        private employeService: EmployeeService,
        private router: Router
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
                console.log(res);
                if (res.code === '00') {
                    this.employee = res.datas;
                    this.pageOptions.totalPages = res.totalPages;
                    this.pageOptions.totalRows = res.totalRows;
                }
            }
        );
    }

    onPageChanged(event) {
        console.log('eeeee', this.searchResponseModel);
        this.pageOptions.page = event.page - 1;
        this.pageOptions.pageSize = event.itemsPerPage;
        this.doSearch();
    }

    deleteById(id: any) {
        this.apiService.delete('/employee/delete').subscribe(res => {
            if (res.code === '00') {
                this.doSearch();
            }
        });
    }

    viewOrEditUser(employee: Employee) {
        window.localStorage.removeItem('viewOrEditUser');
        window.localStorage.setItem('viewOrEditUser', employee.id.toString());
        this.router.navigate(['/employee-detail']);
    }
}

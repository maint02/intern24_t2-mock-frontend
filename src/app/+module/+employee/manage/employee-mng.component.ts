import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../_services/api.service';
import {Employee} from '../../../_models/employee.model';
import {SearchEmployeeModel} from '../../../_models/request/search-employee.model';
import {SearchEmployeeResponseModel} from '../../../_models/response/search-employee-response.model';

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
        private apiService: ApiService
    ) {
    }

    ngOnInit(): void {
        this.searchResponseModel.page = 0;
        this.searchResponseModel.pageSize = 5;
        this.doSearch();
    }

    getAll() {
        this.apiService.post('/getAll-by-params', this.searchResponseModel).subscribe(res => {
            if (res.code === '00') {
                this.employee = res.datas;
                this.pageOptions.totalPages = res.totalPages;
                this.pageOptions.totalRows = res.totalRows;
            }
        });
    }
    onClickSearch(){
        this.pageOptions.page = 0;
        this.doSearch();
    }

    doSearch() {
        this.searchResponseModel.page = this.pageOptions.page;
        this.searchResponseModel.pageSize = this.pageOptions.pageSize;
        this.apiService.post('/getAll-by-params', this.searchResponseModel).subscribe(res => {
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
        console.log('eeeee',this.searchResponseModel);
        this.pageOptions.page = event.page - 1;
        this.pageOptions.pageSize = event.itemsPerPage;
        this.doSearch();
    }
}

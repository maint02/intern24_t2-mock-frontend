import {BaseModel} from '../base.model';

export class SearchEmployeeModel extends BaseModel {
    username: string;
    fullName: string;
    address: string;
    email: string;
    useType: string;
}

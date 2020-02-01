import {BaseModel} from '../base.model';

export class SearchEmployeeResponseModel extends BaseModel {
    id: any;
    username: string;
    email: string;
    created_date: any;
    fullName: string;
    is_actived: any;
    last_access: any;
    phone_number: string;
    userType: string;
    role_name: string;
    department_name: string;
    leader_id: number;
}


import {Authorities} from './authorities';
import {Absents} from './absents';
import {Issues_histories} from './issues_histories';

export class Employee {
    id: number;
    username: string;
    password: string;
    address: string;
    email: string;
    createdDate: any;
    fullName: string;
    actived: any;
    lastAccess: any;
    phoneNumber: number;
    departmentName: string;
    leaderId: number;
    fbLink: string;
    faculty: string;
    education: string;
    birthday: any;
    isLeader: any;
    isManager: any;
    skypeAcc: string;
    university: string;
    userType: string;
    graduationYear: number;
    role: string;
    roleName: string;
    authorities: Authorities[];
    absents: Absents[];
    issues_histories: Issues_histories[];


    constructor(id: any, username: string, password: string, address: string, email: string, createdDate: any, fullName: string, actived: any, lastAccess: any, phoneNumber: number, departmentName: string, leaderId: number, fbLink: string, faculty: string, education: string, birthday: any, isLeader: any, isManager: any, skypeAcc: string, university: string, userType: string, graduationYear: number) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.address = address;
        this.email = email;
        this.createdDate = createdDate;
        this.fullName = fullName;
        this.actived = actived;
        this.lastAccess = lastAccess;
        this.phoneNumber = phoneNumber;
        this.departmentName = departmentName;
        this.leaderId = leaderId;
        this.fbLink = fbLink;
        this.faculty = faculty;
        this.education = education;
        this.birthday = birthday;
        this.isLeader = isLeader;
        this.isManager = isManager;
        this.skypeAcc = skypeAcc;
        this.university = university;
        this.userType = userType;
        this.graduationYear = graduationYear;
    }

    reset() {
        this.id = null;
        this.username = '';
        this.password = '';
        this.address = '';
        this.email = '';
        this.createdDate = '';
        this.fullName = '';
        this.actived = '';
        this.lastAccess = '';
        this.phoneNumber = null;
        this.departmentName = '';
        this.leaderId = null;
        this.fbLink = '';
        this.faculty = '';
        this.education = '';
        this.birthday = '';
        this.isLeader = '';
        this.isManager = '';
        this.skypeAcc = '';
        this.university = '';
        this.userType = '';
        this.graduationYear = null;
        this.authorities = null;
        this.absents = null;
        this.issues_histories = null;
    }
}

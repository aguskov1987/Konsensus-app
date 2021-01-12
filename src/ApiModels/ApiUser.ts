import {UserVm} from "../ViewModels/UserVm";
import {ApiStatement} from "./ApiStatement";

export class ApiUser {
    public id: string = '';
    public currentHiveId: string = '';
    public currentSelectedStatementId: string = '';
    public savedStatementIds: ApiStatement[] = [];

    toVm(): UserVm {
        return new UserVm();
    }
}
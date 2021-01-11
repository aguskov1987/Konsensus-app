import {HiveDataVm} from "./ViewModels/HiveDataVm";
import {HiveInfoVm} from "./ViewModels/HiveInfoVm";
import {UserVm} from "./ViewModels/UserVm";

export class AppState {
    public hiveInfo: HiveInfoVm = new HiveInfoVm();
    public hiveData: HiveDataVm = new HiveDataVm();
    public user: UserVm = new UserVm();
}
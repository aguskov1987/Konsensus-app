import {HiveDataVm} from "../ViewModels/HiveDataVm";
import {HiveInfoVm} from "../ViewModels/HiveInfoVm";
import {UserVm} from "../ViewModels/UserVm";
import {Layout, ViewResponse} from "../ViewModels/HiveVisualisationParams";

export class AppState {
    public hiveInfo: HiveInfoVm = new HiveInfoVm();
    public hiveData: HiveDataVm = new HiveDataVm();
    public user: UserVm = new UserVm();

    public favStatementsOpen: boolean = false;
    public myHivesOpen: boolean = false;
    public loginOpen: boolean = true;

    public responseView: ViewResponse = ViewResponse.All;
    public hiveLayout: Layout = Layout.Random;
}
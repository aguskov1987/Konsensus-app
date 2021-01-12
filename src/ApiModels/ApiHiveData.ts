import {ApiStatement} from "./ApiStatement";
import {ApiSynapse} from "./ApiSynapse";
import {HiveDataVm} from "../ViewModels/HiveDataVm";

export class ApiHiveData {
    public statements: ApiStatement[] = [];
    public synapses: ApiSynapse[] = [];

    public toVm(): HiveDataVm {
        return new HiveDataVm();
    }
}
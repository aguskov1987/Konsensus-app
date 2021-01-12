import {ApiHiveData} from "../ApiModels/ApiHiveData";
import {ApiHiveInfo} from "../ApiModels/ApiHiveInfo";

export class HiveService {
    public static loadHiveInfo(id: string): Promise<ApiHiveInfo> {
        // todo: replace with actual API call
        return Promise.resolve(new ApiHiveInfo());
    }

    public static loadHiveData(statementId: string): Promise<ApiHiveData> {
        // todo: replace with actual API call
        return Promise.resolve(new ApiHiveData());
    }
 }
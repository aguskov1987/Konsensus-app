import {HiveManifest} from "../AppState/HiveManifest";
import axios, {AxiosResponse} from "axios";
import {YardRequestParams} from "../AppState/YardRequestParams";
import {HivesPagedSet} from "../AppState/HivesPagedSet";

export class YardService {
    public static loadHive(hiveId: string): Promise<AxiosResponse<HiveManifest>> {
        return axios.get<HiveManifest>("/yard/hive/", {params: {hiveId}});
    }

    public static createNewHive(title: string, description: string): Promise<AxiosResponse<HiveManifest>> {
        return axios.post<HiveManifest>("/yard/hive", {title, description});
    }

    public static loadYard(params: YardRequestParams): Promise<AxiosResponse<HivesPagedSet>> {
        return axios.get<HivesPagedSet>("/yard", {params});
    }
 }
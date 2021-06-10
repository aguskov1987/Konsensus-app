import {HiveManifest} from "../AppState/HiveManifest";
import axios, {AxiosResponse} from "axios";

export class YardService {
    public static loadHive(hiveId: string): Promise<AxiosResponse<HiveManifest>> {
        return axios.get<HiveManifest>("/yard/hive/", {params: {hiveId}});
    }

    public static createNewHive(title: string, description: string): Promise<AxiosResponse<HiveManifest>> {
        return axios.post<HiveManifest>("/yard/hive", {title, description});
    }

    public static loadUserSavedHives(): Promise<AxiosResponse<HiveManifest[]>> {
        return axios.get<HiveManifest[]>("/yard/saved");
    }

    public static loadInitialYard(): Promise<AxiosResponse<HiveManifest[]>> {
        return axios.get<HiveManifest[]>("/yard/start");
    }

    public static loadSearchResults(phrase: string): Promise<AxiosResponse<HiveManifest[]>> {
        return axios.post<HiveManifest[]>("/yard/search", {phrase});
    }
 }
import {ApiHiveManifest} from "../ApiModels/ApiHiveManifest";
import {HiveManifest} from "../ViewModels/HiveManifest";
import axios, {AxiosResponse} from "axios";

export class YardService {
    public static loadHive(hiveId: string): Promise<AxiosResponse<ApiHiveManifest>> {
        return axios.get<ApiHiveManifest>("/yard/hive/" + hiveId.replace("/", "_"));
    }

    public static createNewHive(title: string, description: string): Promise<AxiosResponse<ApiHiveManifest>> {
        return axios.post<ApiHiveManifest>("/yard/hive", {title, description});
    }

    public static loadUserSavedHives(): Promise<AxiosResponse<ApiHiveManifest[]>> {
        return axios.get<ApiHiveManifest[]>("/yard/saved");
    }

    public static loadInitialYard(): Promise<AxiosResponse<ApiHiveManifest[]>> {
        return axios.post<ApiHiveManifest[]>("/yard/start");
    }

    public static loadSearchResults(phrase: string): Promise<AxiosResponse<ApiHiveManifest[]>> {
        return axios.post<ApiHiveManifest[]>("/yard/search", {phrase});
    }

    public static convertToViewModel(data: ApiHiveManifest): HiveManifest {
        let hive = new HiveManifest();

        // * one-to-one mapping
        hive.id= data._id;
        hive.description = data.description;
        hive.title = data.title;
        hive.numberOfParticipants = data.numberOfParticipants;
        hive.numberOfStatements = data.numberOfStatements;

        return hive;
    }
 }
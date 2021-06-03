import axios, {AxiosResponse} from "axios";
import {FoundPoint} from "../AppState/FoundPoint";
import {SubGraph} from "../AppState/SubGraph";

export class HiveService {
    public static loadPointSearchResults(phrase: string, identifier: string): Promise<AxiosResponse<FoundPoint[]>> {
        return axios.post<any>("/hive/search", {phrase, identifier});
    }

    public static createNewPoint(point: string, hiveId: string, identifier: string): Promise<AxiosResponse<SubGraph>> {
        return axios.post<SubGraph>("/hive/point", {point, hiveId, identifier});
    }

    public static loadSubGraph(pointId: string): Promise<AxiosResponse<SubGraph>> {
        return axios.get<any>(`/hive/subgraph`, {params: {pointId}});
    }
}
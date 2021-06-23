import axios, {AxiosResponse} from "axios";
import {FoundPoint} from "../AppState/FoundPoint";
import {SubGraph} from "../AppState/SubGraph";

export class HiveService {
    public static loadPointSearchResults(phrase: string, identifier: string): Promise<AxiosResponse<FoundPoint[]>> {
        return axios.post<any>("/hive/search", {phrase, identifier});
    }

    public static createNewPoint(point: string,
                                 hiveId: string,
                                 identifier: string,
                                 fromId: string,
                                 toId: string): Promise<AxiosResponse<SubGraph>> {
        return axios.post<SubGraph>("/hive/point", {point, hiveId, identifier, fromId, toId});
    }

    public static createNewSynapse(fromId: string, toId: string, hiveId: string): Promise<AxiosResponse<SubGraph>> {
        return axios.post<SubGraph>("/hive/synapse", {fromId, toId, hiveId});
    }

    public static respond(itemId: string, agree: boolean, hiveId: string): Promise<AxiosResponse<SubGraph>> {
        return axios.post<SubGraph>("/hive/respond", {itemId, agree, hiveId});
    }

    public static loadSubGraph(pointId: string): Promise<AxiosResponse<SubGraph>> {
        return axios.get<any>(`/hive/subgraph`, {params: {pointId}});
    }
}
import axios, {AxiosResponse} from "axios";
import {FoundPoint} from "../AppState/FoundPoint";
import {SubGraph} from "../AppState/SubGraph";
import {PointType} from "../AppState/PointType";
import {ItemDeletionResult} from "./ItemDeletion";

export class HiveService {
    public static loadPointSearchResults(query: string, identifier: string): Promise<AxiosResponse<FoundPoint[]>> {
        return axios.post<any>("/hive/search", {query, identifier});
    }

    public static loadPointQuantSearchResult(query: string, identifier: string): Promise<AxiosResponse<FoundPoint[]>> {
        return axios.post<any>("/hive/quant-search", {query, identifier});
    }

    public static createNewPoint(point: string,
                                 hiveId: string,
                                 identifier: string,
                                 fromId: string,
                                 toId: string,
                                 type: PointType): Promise<AxiosResponse<SubGraph>> {
        return axios.post<SubGraph>("/hive/point", {point, hiveId, identifier, fromId, toId, type});
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

    public static tryDeleteItem(stamp: string): Promise<AxiosResponse<ItemDeletionResult>> {
        return axios.delete<any>(`/hive/item`, {data: {stamp}});
    }
}

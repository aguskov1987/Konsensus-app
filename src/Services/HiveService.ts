import {ApiSubGraph} from "../ApiModels/ApiSubGraph";
import {MainGraph} from "../ViewModels/MainGraph";
import axios, {AxiosResponse} from "axios";

export class HiveService {
    public static loadStatementSearchResults(value: string, bucketId: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    public static createNewStatement(statement: string, hiveId: string, statementCollectionId: string): Promise<AxiosResponse<ApiSubGraph>> {
        return axios.post<ApiSubGraph>("/hive/statement", {statement, hiveId, statementCollectionId})
    }

    public static loadSubGraph(statementId: string, collectionId: string): Promise<ApiSubGraph> {
        // todo: replace with actual API call
        return Promise.resolve(new ApiSubGraph());
    }

    public static mergeSubgraphIntoMainGraph(subGraph: ApiSubGraph, mainGraph: MainGraph): MainGraph {
        return mainGraph;
    }
}
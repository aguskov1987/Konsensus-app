import {SubGraph} from "../ViewModels/SubGraph";
import axios, {AxiosResponse} from "axios";
import {FoundStatement} from "../ViewModels/Statement";

export class HiveService {
    public static loadStatementSearchResults(phrase: string, viewId: string): Promise<AxiosResponse<FoundStatement[]>> {
        return axios.post<any>("/hive/search", {phrase, viewId});
    }

    public static createNewStatement(statement: string, hiveId: string, statementCollectionId: string): Promise<AxiosResponse<SubGraph>> {
        return axios.post<SubGraph>("/hive/statement", {statement, hiveId, statementCollectionId});
    }

    public static loadSubGraph(statementId: string): Promise<AxiosResponse<SubGraph>> {
        let gId = "G" + statementId.split("/")[0].slice(2);
        statementId = statementId.replace("/", "_");
        return axios.get<any>(`/hive/subgraph/${gId}/${statementId}`);
    }
}
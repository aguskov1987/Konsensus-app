import {ApiSubGraph} from "../ApiModels/ApiSubGraph";
import {MainGraph} from "../ViewModels/MainGraph";

export class HiveService {
    public static loadStatementSearchResults(value: string): Promise<any[]> {
        return Promise.resolve([]);
    }

    public static loadSubGraph(hiveId: string, statementId: string): Promise<ApiSubGraph> {
        // todo: replace with actual API call
        return Promise.resolve(new ApiSubGraph());
    }

    public static mergeSubgraphIntoMainGraph(subGraph: ApiSubGraph, mainGraph: MainGraph): MainGraph {
        return mainGraph;
    }
}
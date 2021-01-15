import {ApiSubGraph} from "../ApiModels/ApiSubGraph";
import {ApiHiveOverview} from "../ApiModels/ApiHiveOverview";
import {MainGraph} from "../ViewModels/MainGraph";
import {HiveOverview} from "../ViewModels/HiveOverview";

export class HiveService {
    public static loadHiveOverview(hiveId: string): Promise<ApiHiveOverview> {
        // todo: replace with actual API call
        return Promise.resolve(new ApiHiveOverview());
    }

    public static loadSubGraph(hiveId: string, statementId: string): Promise<ApiSubGraph> {
        // todo: replace with actual API call
        return Promise.resolve(new ApiSubGraph());
    }

    public static convertToViewModel(apiOverview: ApiHiveOverview): HiveOverview {
        return new HiveOverview();
    }

    public static mergeSubgraphIntoMainGraph(subGraph: ApiSubGraph, mainGraph: MainGraph): MainGraph {
        return mainGraph;
    }
 }
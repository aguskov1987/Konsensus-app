import {StatefulObject} from "./StatefulObject";
import {StatefulOption} from "./StatefulOption";
import {ActiveHiveState} from "./ActiveHiveState";
import {YardService} from "../Services/YardService";
import {AxiosError} from "axios";
import {YardRequestParams} from "./YardRequestParams";
import {HiveSorting} from "./HiveSorting";
import {HiveOrder} from "./HiveOrder";
import {HivesPagedSet} from "./HivesPagedSet";

export class YardState {
    public static hives: StatefulObject<HivesPagedSet> = new StatefulObject<HivesPagedSet>();

    public static hivesSearchQuery: StatefulOption<string> = new StatefulOption<string>();
    public static hiveSorting: StatefulOption<HiveSorting> = new StatefulOption<HiveSorting>();
    public static hiveOrder: StatefulOption<HiveOrder> = new StatefulOption<HiveOrder>();
    public static currentPage: StatefulOption<number> = new StatefulOption<number>();

    public static loadYard(params: YardRequestParams) {
        YardState.hives.setStatusPending();
        YardService.loadYard(params).then((response) => {
            YardState.hives.updateValue(response.data);
            YardState.hives.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            YardState.hives.setStatusError(!code ? '' : code);
        });
    }

    public static loadHive(hiveId: string) {
        ActiveHiveState.activeHiveManifest.setStatusPending();
        YardService.loadHive(hiveId).then((response) => {
            ActiveHiveState.activeHiveManifest.updateValue(response.data);
            ActiveHiveState.activeHiveManifest.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            ActiveHiveState.activeHiveManifest.setStatusError(!code ? '' : code);
        });
    }
}
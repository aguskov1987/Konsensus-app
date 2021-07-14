import {HiveSorting} from "./HiveSorting";
import {HiveOrder} from "./HiveOrder";

export class YardRequestParams {
    query: string = '';
    page: number = 1;
    hivesPerPage: number = 1;
    sort: HiveSorting = HiveSorting.ByActivity;
    order: HiveOrder = HiveOrder.Asc;
}
import {HiveSorting} from "./HiveSorting";
import {HiveOrder} from "./HiveOrder";

export class YardRequestParams {
    hivesPerPage: number = 1;
    order: HiveOrder = HiveOrder.Asc;
    page: number = 1;
    query: string = '';
    sort: HiveSorting = HiveSorting.ByActivity;
}

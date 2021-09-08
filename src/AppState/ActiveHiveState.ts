import {StatefulObject} from "./StatefulObject";
import {HiveManifest} from "./HiveManifest";
import {FoundPoint} from "./FoundPoint";
import {Point} from "./Point";
import {StashedSubGraph, SubGraph} from "./SubGraph";
import {Stash} from "./Stash";
import {YardService} from "../Services/YardService";
import {AxiosError} from "axios";
import {HiveService} from "../Services/HiveService";
import {PointType} from "./PointType";
import {ItemDeletionStatus} from "../Services/ItemDeletion";

export class LastAddedItem {
    itemStamp: string = '';
    itemStatus: ItemDeletionStatus = ItemDeletionStatus.Irrelevant;
}

export class ActiveHiveState {
    public static activeHiveManifest: StatefulObject<HiveManifest> = new StatefulObject<HiveManifest>();
    public static foundPoints: StatefulObject<FoundPoint[]> = new StatefulObject<FoundPoint[]>();
    public static newPoint: StatefulObject<Point> = new StatefulObject<Point>();
    public static savedPoints: StatefulObject<Point[]> = new StatefulObject<Point[]>();
    public static subgraph: StatefulObject<SubGraph> = new StatefulObject<SubGraph>();
    public static lastAddedItem: StatefulObject<LastAddedItem> = new StatefulObject<LastAddedItem>();

    public static graphStash: Stash<StashedSubGraph> = new Stash<StashedSubGraph>();

    public static loadDefaultHive(id: string) {
        ActiveHiveState.activeHiveManifest.setStatusPending();
        YardService.loadHive(id).then((response) => {
            ActiveHiveState.activeHiveManifest.updateValue(response.data);
            ActiveHiveState.activeHiveManifest.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            ActiveHiveState.activeHiveManifest.setStatusError(!code ? '' : code);
        });
    }

    /***
     * Get point search results based on the passed query
     * @param query - query
     * @param quantQuery - indicates whether the query is of quantitative type
     */
    public static searchPoints(query: string, quantQuery: boolean = false) {
        ActiveHiveState.foundPoints.setStatusPending();
        if (!quantQuery) {
            HiveService.loadPointSearchResults(query, ActiveHiveState.activeHiveManifest.getValue().collectionId)
                .then((response) => {
                    ActiveHiveState.foundPoints.updateValue(response.data);
                    ActiveHiveState.foundPoints.setStatusLoaded();
                }).catch(({code}: AxiosError) => {
                ActiveHiveState.foundPoints.setStatusError(!code ? '' : code);
            });
        } else {
            HiveService.loadPointQuantSearchResult(query, ActiveHiveState.activeHiveManifest.getValue().collectionId)
                .then((response) => {
                    ActiveHiveState.foundPoints.updateValue(response.data);
                    ActiveHiveState.foundPoints.setStatusLoaded();
                }).catch(({code}: AxiosError) => {
                ActiveHiveState.foundPoints.setStatusError(!code ? '' : code);
            });
        }
    }

    public static createNewPoint(content: string, supportingLinks: string[], fromId: string, toId: string, question: boolean) {
        let hiveId = ActiveHiveState.activeHiveManifest.getValue().id;
        let identifier = ActiveHiveState.activeHiveManifest.getValue().collectionId;
        ActiveHiveState.newPoint.setStatusPending();

        let type = question ? PointType.Question : PointType.Statement;
        HiveService.createNewPoint(content, hiveId, identifier, fromId, toId, type)
            .then((subgraph) => {
                try {
                    let item = new LastAddedItem();
                    item.itemStamp = subgraph.data.points[0].lastItemStamp;
                    ActiveHiveState.lastAddedItem.updateValue(item);
                } catch (error) {
                    console.log('cannot set the last added point: ' + error);
                }

                ActiveHiveState.subgraph.updateValue(subgraph.data);
                ActiveHiveState.subgraph.setStatusLoaded();
            }).catch(({code}: AxiosError) => {
            ActiveHiveState.subgraph.setStatusError(!code ? '' : code);
        });
    }

    /***
     * Connect two points by a synapse
     * @param fromId ID of the 'from' point
     * @param toId ID of the 'to' point
     */
    public static createNewSynapse(fromId: string, toId: string) {
        ActiveHiveState.subgraph.setStatusPending();
        HiveService.createNewSynapse(fromId, toId, ActiveHiveState.activeHiveManifest.getValue().id)
            .then((subgraph) => {
                try {
                    let item = new LastAddedItem();
                    item.itemStamp = subgraph.data.synapses[0].lastItemStamp;
                    ActiveHiveState.lastAddedItem.updateValue(item);
                } catch (error) {
                    console.log('cannot set the last added synapse: ' + error);
                }

                if (subgraph.data.origin == null) {
                    subgraph.data.origin = ActiveHiveState.subgraph.getValue().origin;
                }
                ActiveHiveState.subgraph.updateValue(subgraph.data);
                ActiveHiveState.subgraph.setStatusLoaded();
            }).catch(({code}: AxiosError) => {
            ActiveHiveState.subgraph.setStatusError(!code ? '' : code);
        });
    }

    /***
     * Respond to either a point or synapse
     * @param id Either ID of a point or ID of an synapse
     * @param agree Agree or disagree
     */
    public static respond(id: string, agree: boolean) {
        ActiveHiveState.subgraph.setStatusPending();
        HiveService.respond(id, agree, ActiveHiveState.activeHiveManifest.getValue().id).then((sg) => {
            sg.data.origin = ActiveHiveState.subgraph.getValue().origin;
            ActiveHiveState.subgraph.updateValue(sg.data);
            ActiveHiveState.subgraph.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            ActiveHiveState.subgraph.setStatusError(!code ? '' : code);
        });
    }

    public static loadSubgraph(pointId: string) {
        ActiveHiveState.subgraph.setStatusPending();
        HiveService.loadSubGraph(pointId).then((subgraph) => {
            ActiveHiveState.subgraph.updateValue(subgraph.data);
            ActiveHiveState.subgraph.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            ActiveHiveState.subgraph.setStatusError(!code ? '' : code);
        });
    }

    public static tryDeleteLastItem() {
        ActiveHiveState.lastAddedItem.setStatusPending();
        HiveService.tryDeleteItem(ActiveHiveState.lastAddedItem.getValue().itemStamp).then((response) => {
            let item = new LastAddedItem();
            item.itemStamp = '';
            item.itemStatus = response.data.status;
            ActiveHiveState.lastAddedItem.updateValue(item);
            ActiveHiveState.lastAddedItem.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            ActiveHiveState.lastAddedItem.setStatusError(!code ? '' : code);
        });
    }
}

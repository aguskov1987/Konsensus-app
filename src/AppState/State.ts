import {UserService} from "../Services/UserService";
import {AxiosError} from "axios";
import {HiveManifest} from "./HiveManifest";
import {YardService} from "../Services/YardService";
import {User} from "./User";
import {StatefulObject} from "./StatefulObject";
import {FoundPoint} from "./FoundPoint";
import {HiveService} from "../Services/HiveService";
import {StashedSubGraph, SubGraph} from "./SubGraph";
import {Point} from "./Point";
import {Stash} from "./Stash";
import {Subject} from "rxjs";

export class UserState {
    public static user: StatefulObject<User> = new StatefulObject<User>();

    public static loadUser() {
        UserState.user.setStatusPending();
        UserService.loadUser().then((response) => {
            UserState.user.updateValue(UserService.convertToViewModel(response.data));
            UserState.user.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            UserState.user.setStatusError(!code ? '' : code);
        });
    }
}

export class NewHiveState {
    public static newHive: StatefulObject<HiveManifest> = new StatefulObject<HiveManifest>();

    public static createNewHive(title: string, description: string) {
        NewHiveState.newHive.setStatusPending();
        YardService.createNewHive(title, description).then((manifest) => {
            NewHiveState.newHive.updateValue(YardService.convertToViewModel(manifest.data));
            NewHiveState.newHive.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            NewHiveState.newHive.setStatusError(!code ? '' : code);
        });
    }
}

export class ActiveHiveState {
    public static activeHiveManifest: StatefulObject<HiveManifest> = new StatefulObject<HiveManifest>();
    public static foundPoints: StatefulObject<FoundPoint[]> = new StatefulObject<FoundPoint[]>();
    public static newPoint: StatefulObject<Point> = new StatefulObject<Point>();
    public static savedPoints: StatefulObject<Point[]> = new StatefulObject<Point[]>();
    public static subgraph: StatefulObject<SubGraph> = new StatefulObject<SubGraph>();

    public static newPointText: Stash<string> = new Stash<string>();
    public static graphStash: Stash<StashedSubGraph> = new Stash<StashedSubGraph>();

    public static loadDefaultHive(id: string) {
        ActiveHiveState.activeHiveManifest.setStatusPending();
        YardService.loadHive(id).then((response) => {
            ActiveHiveState.activeHiveManifest.updateValue(YardService.convertToViewModel(response.data));
            ActiveHiveState.activeHiveManifest.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            ActiveHiveState.activeHiveManifest.setStatusError(!code ? '' : code);
        });
    }

    public static searchPoints(phrase: string) {
        ActiveHiveState.foundPoints.setStatusPending();
        HiveService.loadPointSearchResults(phrase, ActiveHiveState.activeHiveManifest.getValue().collectionId)
            .then((response) => {
                ActiveHiveState.foundPoints.updateValue(response.data);
                ActiveHiveState.foundPoints.setStatusLoaded();
            }).catch(({code}: AxiosError) => {
            ActiveHiveState.foundPoints.setStatusError(!code ? '' : code);
        });
    }

    public static createNewPoint(content: string, supportingLinks: string[]) {
        let hiveId = ActiveHiveState.activeHiveManifest.getValue().id;
        let identifier = ActiveHiveState.activeHiveManifest.getValue().collectionId;
        ActiveHiveState.newPoint.setStatusPending();
        HiveService.createNewPoint(content, hiveId, identifier).then((subgraph) => {
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
        console.log('creating synapse for: ' + fromId + ' ' + toId);
    }

    /***
     * Respond to either a point or synapse
     * @param id Either ID of a point or ID of an synapse
     * @param agree Agree or disagree
     */
    public static respond(id: string, agree: boolean) {
        console.log(id);
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

    public static loadSavedPoints() {

    }
}

export enum ButtonCommand {
    ZoomIn,
    ZoomOut,
    PanLeft,
    PanUp,
    PanRight,
    PanDown,
    SelectNextPoint,
    SelectPreviousPoint,
    SelectNextSynapse,
    SelectPreviousSynapse,
    Agree,
    Disagree,
    MarkAsFrom,
    MarkAsTo,
    Discard
}

export class HiveOperationsState {
    public static layout: Subject<string> = new Subject<string>();
    public static responseView: Subject<string> = new Subject<string>();
    public static lastButtonCommand: Subject<ButtonCommand> = new Subject<ButtonCommand>();
}

export class YardState {

}

export class SavedHivesState {

}
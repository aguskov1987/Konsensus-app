import {UserService} from "../Services/UserService";
import {AxiosError} from "axios";
import {HiveManifest} from "./HiveManifest";
import {YardService} from "../Services/YardService";
import {User} from "./User";
import {StatefulObject} from "./StatefulObject";
import {FoundStatement} from "./FoundStatement";
import {HiveService} from "../Services/HiveService";
import {SubGraph} from "./SubGraph";
import {Subject} from "rxjs";
import {Statement} from "./Statement";

export class UserState {
    public static user: StatefulObject<User> = new StatefulObject<User>();

    public static loadUser() {
        UserState.user.setStatusPending();
        UserService.loadUser().then((response) => {
            UserState.user.update(UserService.convertToViewModel(response.data));
            UserState.user.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            UserState.user.setStatusError(!code ? '' : code);
        });
    }
}

export class ActiveHiveState {
    public static activeHiveManifest: StatefulObject<HiveManifest> = new StatefulObject<HiveManifest>();
    public static foundStatements: StatefulObject<FoundStatement[]> = new StatefulObject<FoundStatement[]>();
    public static savedStatements: StatefulObject<Statement[]> = new StatefulObject<Statement[]>();
    public static subgraph: StatefulObject<SubGraph> = new StatefulObject<SubGraph>();
    public static leavingGraphArea: Subject<boolean> = new Subject<boolean>();

    public static loadDefaultHive(id: string) {
        ActiveHiveState.activeHiveManifest.setStatusPending();
        YardService.loadHive(id).then((response) => {
            ActiveHiveState.activeHiveManifest.update(YardService.convertToViewModel(response.data));
            ActiveHiveState.activeHiveManifest.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            ActiveHiveState.activeHiveManifest.setStatusError(!code ? '' : code);
        });
    }

    public static searchStatements(phrase: string) {
        ActiveHiveState.foundStatements.setStatusPending();
        HiveService.loadStatementSearchResults(phrase, ActiveHiveState.activeHiveManifest.obj.collectionId)
            .then((response) => {
            ActiveHiveState.foundStatements.update(response.data);
            ActiveHiveState.foundStatements.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            ActiveHiveState.foundStatements.setStatusError(!code ? '' : code);
        });
    }

    public static loadSubgraph(statementId: string) {
        ActiveHiveState.subgraph.setStatusPending();
        HiveService.loadSubGraph(statementId).then((response) => {
                ActiveHiveState.subgraph.update(response.data);
                ActiveHiveState.subgraph.setStatusLoaded();
            }).catch(({code}: AxiosError) => {
            ActiveHiveState.subgraph.setStatusError(!code ? '' : code);
        });
    }

    public static loadSavedStatements() {

    }

    public static notifyOfLeavingGraphArea() {
        ActiveHiveState.leavingGraphArea.next(true);
    }
}

export class YardState {

}

export class SavedHivesState {

}
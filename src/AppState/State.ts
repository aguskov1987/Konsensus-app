import {UserService} from "../Services/UserService";
import {AxiosError} from "axios";
import {HiveManifest} from "./HiveManifest";
import {YardService} from "../Services/YardService";
import {User} from "./User";
import {StatefulObject} from "./StatefulObject";
import {FoundStatement} from "./FoundStatement";
import {HiveService} from "../Services/HiveService";
import {StashedSubGraph, SubGraph} from "./SubGraph";
import {Statement} from "./Statement";
import {Stash} from "./Stash";
import {Subject} from "rxjs";

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

export class NewHiveState {
    public static newHive: StatefulObject<HiveManifest> = new StatefulObject<HiveManifest>();

    public static createNewHive(title: string, description: string) {
        NewHiveState.newHive.setStatusPending();
        YardService.createNewHive(title, description).then((manifest) => {
            NewHiveState.newHive.update(YardService.convertToViewModel(manifest.data));
            NewHiveState.newHive.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            NewHiveState.newHive.setStatusError(!code ? '' : code);
        });
    }
}

export class ActiveHiveState {
    public static activeHiveManifest: StatefulObject<HiveManifest> = new StatefulObject<HiveManifest>();
    public static foundStatements: StatefulObject<FoundStatement[]> = new StatefulObject<FoundStatement[]>();
    public static newStatement: StatefulObject<Statement> = new StatefulObject<Statement>();
    public static savedStatements: StatefulObject<Statement[]> = new StatefulObject<Statement[]>();
    public static subgraph: StatefulObject<SubGraph> = new StatefulObject<SubGraph>();

    public static newStatementText: Stash<string> = new Stash<string>();
    public static graphStash: Stash<StashedSubGraph> = new Stash<StashedSubGraph>();

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
        HiveService.loadStatementSearchResults(phrase, ActiveHiveState.activeHiveManifest.value.collectionId)
            .then((response) => {
                ActiveHiveState.foundStatements.update(response.data);
                ActiveHiveState.foundStatements.setStatusLoaded();
            }).catch(({code}: AxiosError) => {
            ActiveHiveState.foundStatements.setStatusError(!code ? '' : code);
        });
    }

    public static createNewStatement(content: string, supportingLinks: string[]) {
        let hiveId = ActiveHiveState.activeHiveManifest.value.id;
        let identifier = ActiveHiveState.activeHiveManifest.value.collectionId;
        ActiveHiveState.newStatement.setStatusPending();
        HiveService.createNewStatement(content, hiveId, identifier).then((subgraph) => {
            ActiveHiveState.subgraph.update(subgraph.data);
            ActiveHiveState.subgraph.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            ActiveHiveState.subgraph.setStatusError(!code ? '' : code);
        });
    }

    /***
     * Connect two statements by a cause-effect relationship
     * @param causeId ID of the causing statement
     * @param effectId ID of the effected statement
     */
    public static createNewEffect(causeId: string, effectId: string) {
        console.log('creating effect for: ' + causeId + ' ' + effectId);
    }

    /***
     * Respond to either a statement or an effect
     * @param id Either ID of a statement or ID of an effect
     * @param agree Agree or disagree
     */
    public static respond(id: string, agree: boolean) {
        console.log(id);
    }

    public static loadSubgraph(statementId: string) {
        ActiveHiveState.subgraph.setStatusPending();
        HiveService.loadSubGraph(statementId).then((subgraph) => {
            ActiveHiveState.subgraph.update(subgraph.data);
            ActiveHiveState.subgraph.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            ActiveHiveState.subgraph.setStatusError(!code ? '' : code);
        });
    }

    public static loadSavedStatements() {

    }
}

export enum ButtonCommand {
    ZoomIn,
    ZoomOut,
    PanLeft,
    PanUp,
    PanRight,
    PanDown,
    SelectNextStatement,
    SelectPreviousStatement,
    SelectNextEffect,
    SelectPreviousEffect,
    Agree,
    Disagree,
    MarkAsCause,
    MarkAsEffect,
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
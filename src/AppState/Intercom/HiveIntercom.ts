import {HiveService} from "../../Services/HiveService";
import {
    searchedStatementsFoundAction,
    subgraphLoadedAction,
    subgraphLoadFailedAction
} from "../Actions";
import {HiveManifest} from "../../ViewModels/HiveManifest";
import {AppDispatch, AppGetState} from "../Store";
import {AxiosError} from "axios";

export function loadStatementSearchResults(value: string): any {
    return async function loadStatementSearchResultsThunk(dispatch: AppDispatch, getState: AppGetState) {
        if (value == null || value === '') {
            dispatch(searchedStatementsFoundAction([]));
            return;
        }
        let viewId: string = "V" + getState().currentActiveHive.collectionId.slice(2);
        HiveService.loadStatementSearchResults(value, viewId).then((response: any) => {
            dispatch(searchedStatementsFoundAction(response.data));
        })
    }
}

export function createNewStatement(label: string): any {
    return async function createNewStatementThunk(dispatch: AppDispatch, getState: AppGetState) {
        let hive: HiveManifest = getState().currentActiveHive;
        HiveService.createNewStatement(label, hive.id, hive.collectionId).then((response) => {
            dispatch(subgraphLoadedAction(response.data))
        }).catch((error: AxiosError) => {
            if (error.response) {
                dispatch(subgraphLoadFailedAction(error.code + ': ' + error.message));
            } else {
                dispatch(subgraphLoadFailedAction(error.message));
            }
        });
    }
}

export function loadSubgraph(statementId: string): any {
    return async function loadSubgraphThunk(dispatch: AppDispatch, getState: AppGetState) {
        HiveService.loadSubGraph(statementId).then((response) => {
            dispatch(subgraphLoadedAction(response.data));
        }).catch((error: AxiosError) => {
            if (error.response) {
                dispatch(subgraphLoadFailedAction(error.code + ': ' + error.message));
            } else {
                dispatch(subgraphLoadFailedAction(error.message));
            }
        });
    }
}
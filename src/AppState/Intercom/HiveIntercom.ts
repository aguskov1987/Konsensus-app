import {HiveService} from "../../Services/HiveService";
import {searchedStatementsFoundAction, subgraphLoadedAction} from "../Actions";
import {HiveManifest} from "../../ViewModels/HiveManifest";
import {AppDispatch, AppGetState} from "../Store";

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
        })
    }
}
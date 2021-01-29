import {HiveService} from "../../Services/HiveService";
import {searchedStatementsFoundAction, subgraphLoadedAction} from "../Actions";
import {HiveManifest} from "../../ViewModels/HiveManifest";

export function loadStatementSearchResults(value: string) {
    return async function loadStatementSearchResultsThunk(dispatch: any, getState: any) {
        if (value == null || value === '') {
            dispatch(searchedStatementsFoundAction([]));
            return;
        }
        let bucketId: string = getState().currentActiveHive.collectionId;
        HiveService.loadStatementSearchResults(value, bucketId).then((data: any) => {
            dispatch(searchedStatementsFoundAction(data));
        })
    }
}

export function createNewStatement(label: string) {
    return async function createNewStatementThunk(dispatch: any, getState: any) {
        let hive: HiveManifest = getState().currentActiveHive;
        HiveService.createNewStatement(label, hive.id, hive.collectionId).then((response) => {
            dispatch(subgraphLoadedAction(response.data))
        })
    }
}
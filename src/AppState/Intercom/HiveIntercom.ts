import {HiveService} from "../../Services/HiveService";
import {searchedStatementsFoundAction} from "../Actions";

export function loadStatementSearchResults(value: string) {
    return async function loadStatementSearchResultsThunk(dispatch: any, getState: any) {
        if (value == null || value === '') {
            dispatch(searchedStatementsFoundAction([]));
            return;
        }
        HiveService.loadStatementSearchResults(value).then((data: any) => {
            dispatch(searchedStatementsFoundAction(data));
        })
    }
}
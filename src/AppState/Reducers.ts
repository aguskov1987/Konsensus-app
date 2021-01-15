import {AppState} from "./AppState";
import {
    CLOSE_MY_HIVES,
    CLOSE_SAVED_STATEMENTS,
    SUBGRAPH_LOADED, HIVE_OVERVIEW_LOADED,
    OPEN_MY_HIVES,
    OPEN_SAVED_STATEMENTS,
    USER_LOADED
} from "./ActionTypes";
import {HiveService} from "../Services/HiveService";
import {UserService} from "../Services/UserService";

const initialAppState = new AppState()

type Action = { type: string, payload: any }

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialAppState, action: Action): AppState {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                loginOpen: false,
                user: UserService.convertToViewModel(action.payload)
            }
        case OPEN_MY_HIVES:
            return {
                ...state,
                myHivesOpen: true
            }
        case CLOSE_MY_HIVES:
            return {
                ...state,
                myHivesOpen: false
            }
        case OPEN_SAVED_STATEMENTS:
            return {
                ...state,
                favStatementsOpen: true
            }
        case CLOSE_SAVED_STATEMENTS:
            return {
                ...state,
                favStatementsOpen: false
            }
        case HIVE_OVERVIEW_LOADED:
            return {
                ...state,
                hiveInfo: HiveService.convertToViewModel(action.payload)
            }
        case SUBGRAPH_LOADED:
            let newHiveData = HiveService.mergeSubgraphIntoMainGraph(action.payload, state.mainGraph);
            return {
                ...state,
                mainGraph: newHiveData
            }
        default:
            return state;
    }
}
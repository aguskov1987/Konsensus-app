import {AppState} from "./AppState";
import {
    CLOSE_MY_HIVES,
    CLOSE_SAVED_STATEMENTS,
    HIVE_DATA_LOADED, HIVE_INFO_LOADED,
    OPEN_MY_HIVES,
    OPEN_SAVED_STATEMENTS,
    USER_LOADED
} from "./ActionTypes";

const initialAppState = new AppState()

type Action = { type: string, payload: any }

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialAppState, action: Action): AppState {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                loginOpen: false,
                user: action.payload
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
        case HIVE_INFO_LOADED:
            return {
                ...state,
                hiveInfo: action.payload
            }
        case HIVE_DATA_LOADED:
            return {
                ...state,
                hiveData: action.payload
            }
        default:
            return state;
    }
}
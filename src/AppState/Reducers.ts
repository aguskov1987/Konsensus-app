import {AppState} from "./AppState";
import {CLOSE_SAVED_STATEMENTS, LOAD_USER, LOGIN, OPEN_SAVED_STATEMENTS} from "./ActionTypes";
import {UserVm} from "../ViewModels/UserVm";

const initialAppState = new AppState()

type Action = {type: string, payload: any}

export default function(state = initialAppState, action: Action): AppState {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: new UserVm()
            }
        case LOAD_USER:
            return {
                ...state,
                user: new UserVm()
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
        default:
            return state;
    }
}
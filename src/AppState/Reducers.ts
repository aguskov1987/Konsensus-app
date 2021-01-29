import {AppState} from "./AppState";
import {
    CLOSE_MY_HIVES,
    CLOSE_SAVED_STATEMENTS,
    SUBGRAPH_LOADED,
    HIVE_LOADED,
    OPEN_MY_HIVES,
    OPEN_SAVED_STATEMENTS,
    USER_LOADED,
    OPEN_HIVE_YARD,
    CLOSE_HIVE_YARD,
    USER_SAVED_HIVES_LOADED,
    OPEN_CREATE_NEW_HIVE,
    CLOSE_CREATE_NEW_HIVE,
    INIT_CREATING_NEW_HIVE,
    NEW_HIVE_CREATED,
    SEARCHED_STATEMENTS_FOUND,
    SEARCHED_HIVES_FOUND,
    USER_SAVED_HIVES_LOAD_FAILED, INIT_STATEMENT_SEARCH
} from "./ActionTypes";
import {YardService} from "../Services/YardService";
import {UserService} from "../Services/UserService";
import {ApiHiveManifest} from "../ApiModels/ApiHiveManifest";
import {HiveService} from "../Services/HiveService";

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
                savedHivesOpen: true,
                savedHivesLoading: true,
                savedHivesLoaded: false,
                savedHivesLoadingError: '',

                loginOpen: false,
                savedStatementsOpen: false,
                hiveYardOpen: false,
                newHiveOpen: false
            }
        case CLOSE_MY_HIVES:
            return {
                ...state,
                savedHivesOpen: false,
                savedHivesLoaded: false,
                savedHivesLoading: true,
                savedHivesLoadingError: '',
                savedHives: []
            }
        case USER_SAVED_HIVES_LOADED:
            return {
                ...state,
                savedHivesLoading: false,
                savedHivesLoaded: true,
                savedHivesLoadingError: '',
                savedHives: action.payload
            }
        case USER_SAVED_HIVES_LOAD_FAILED:
            return {
                ...state,
                savedHivesLoaded: false,
                savedHivesLoading: false,
                savedHivesLoadingError: action.payload
            }
        case OPEN_CREATE_NEW_HIVE:
            return {
                ...state,
                savedHivesOpen: false,
                loginOpen: false,
                savedStatementsOpen: false,
                hiveYardOpen: false,
                newHiveOpen: true
            }
        case CLOSE_CREATE_NEW_HIVE:
            if (state.user.defaultHiveId) {
                return {
                    ...state,
                    newHiveOpen: false,
                    creatingNewHive: false
                }
            } else {
                return {
                    ...state,
                    newHiveOpen: false,
                    creatingNewHive: false,
                    savedHivesOpen: true
                }
            }
        case OPEN_HIVE_YARD:
            return {
                ...state,
                savedHivesOpen: false,
                loginOpen: false,
                savedStatementsOpen: false,
                hiveYardOpen: true,
                newHiveOpen: false
            }
        case CLOSE_HIVE_YARD:
            if (state.user.defaultHiveId) {
                return {
                    ...state,
                    hiveYardOpen: false
                }
            } else {
                return {
                    ...state,
                    hiveYardOpen: false,
                    savedHivesOpen: true
                }
            }
        case OPEN_SAVED_STATEMENTS:
            return {
                ...state,
                savedHivesOpen: false,
                loginOpen: false,
                savedStatementsOpen: true,
                hiveYardOpen: false,
                newHiveOpen: false
            }
        case CLOSE_SAVED_STATEMENTS:
            return {
                ...state,
                savedStatementsOpen: false
            }
        case HIVE_LOADED:
            return {
                ...state,
                savedHivesOpen: false,
                hiveYardOpen: false,
                currentActiveHive: YardService.convertToViewModel(action.payload as ApiHiveManifest)
            }
        case SUBGRAPH_LOADED:
            let newHiveData = HiveService.mergeSubgraphIntoMainGraph(action.payload, state.mainGraph);
            return {
                ...state,
                mainGraph: newHiveData
            }
        case INIT_CREATING_NEW_HIVE:
            return {
                ...state,
                creatingNewHive: true
            }
        case NEW_HIVE_CREATED:
            return {
                ...state,
                user: {
                    username: state.user.username,
                    id: state.user.id,
                    defaultHiveId: action.payload.id
                },
                currentActiveHive: action.payload,
                creatingNewHive: false,
                savedHivesOpen: false,
                loginOpen: false,
                savedStatementsOpen: false,
                hiveYardOpen: false,
                newHiveOpen: false
            }
        case SEARCHED_HIVES_FOUND:
            return {
                ...state,
                foundYardHives: action.payload
            }
        case SEARCHED_STATEMENTS_FOUND:
            return {
                ...state,
                statementSearchLoading: false,
                foundStatements: action.payload
            }
        case INIT_STATEMENT_SEARCH:
            return {
                ...state,
                statementSearchLoading: true
            }
        default:
            return state;
    }
}
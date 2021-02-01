import {AppState} from "./AppState";
import {
    CLOSE_CREATE_NEW_HIVE,
    CLOSE_HIVE_YARD,
    CLOSE_MY_HIVES,
    CLOSE_SAVED_STATEMENTS,
    HIVE_LOAD_FAILED,
    HIVE_LOADED,
    HIVE_SEARCH_FAILED,
    INIT_CREATING_NEW_HIVE,
    INIT_STATEMENT_SEARCH,
    NEW_HIVE_CREATED,
    NEW_HIVE_FAILED,
    OPEN_CREATE_NEW_HIVE,
    OPEN_HIVE_YARD,
    OPEN_MY_HIVES,
    OPEN_SAVED_STATEMENTS,
    SEARCHED_HIVES_FOUND,
    SEARCHED_STATEMENTS_FOUND,
    SUBGRAPH_LOADED,
    USER_LOADED,
    USER_SAVED_HIVES_LOAD_FAILED,
    USER_SAVED_HIVES_LOADED
} from "./Actions";
import {YardService} from "../Services/YardService";
import {UserService} from "../Services/UserService";
import {ApiHiveManifest} from "../ApiModels/ApiHiveManifest";
import {HiveService} from "../Services/HiveService";
import {CurrentActiveFeatureState} from "./CurrentActiveFeatureState";
import {AppFeature} from "./AppFeature";
import {AsyncOperation} from "./AsyncOperation";

const initialAppState = new AppState()

type Action = { type: string, payload: any }

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialAppState, action: Action): AppState {
    let feature = new CurrentActiveFeatureState();
    switch (action.type) {
        case USER_LOADED:
            feature.feature = AppFeature.Graph;
            return {
                ...state,
                currentActiveFeature: feature,
                user: UserService.convertToViewModel(action.payload)
            }
        case OPEN_MY_HIVES:
            feature.feature = AppFeature.SavedHives;
            return {
                ...state,
                currentActiveFeature: feature
            }
        case CLOSE_MY_HIVES:
            feature.feature = AppFeature.Graph;
            return {
                ...state,
                currentActiveFeature: feature,
                savedHives: []
            }
        case USER_SAVED_HIVES_LOADED:
            feature.feature = AppFeature.SavedHives;
            feature.asyncStatus = AsyncOperation.Done;
            return {
                ...state,
                currentActiveFeature: feature,
                savedHives: action.payload
            }
        case USER_SAVED_HIVES_LOAD_FAILED:
            feature.feature = AppFeature.SavedHives;
            feature.asyncStatus = AsyncOperation.Error;
            feature.errorIfAny = action.payload;
            return {
                ...state,
                currentActiveFeature: feature,
            }
        case OPEN_CREATE_NEW_HIVE:
            feature.feature = AppFeature.NewHive;
            return {
                ...state,
                currentActiveFeature: feature,
            }
        case CLOSE_CREATE_NEW_HIVE:
            feature.feature = state.user.defaultHiveId? AppFeature.Graph : AppFeature.SavedHives
                return {
                    ...state,
                    currentActiveFeature: feature,
                }
        case OPEN_HIVE_YARD:
            feature.feature = AppFeature.Yard;
            return {
                ...state,
                currentActiveFeature: feature,
            }
        case CLOSE_HIVE_YARD:
            feature.feature = state.user.defaultHiveId? AppFeature.Graph : AppFeature.SavedHives;
            return {
                ...state,
                currentActiveFeature: feature,
            }
        case OPEN_SAVED_STATEMENTS:
            feature.feature = AppFeature.SavedStatements;
            return {
                ...state,
                currentActiveFeature: feature,
            }
        case CLOSE_SAVED_STATEMENTS:
            feature.feature = AppFeature.Graph;
            return {
                ...state,
                currentActiveFeature: feature,
            }
        case HIVE_LOADED:
            feature.feature = AppFeature.Graph;
            return {
                ...state,
                currentActiveFeature: feature,
                currentActiveHive: YardService.convertToViewModel(action.payload as ApiHiveManifest)
            }
        case HIVE_LOAD_FAILED:
            feature.feature = AppFeature.Graph;
            feature.asyncStatus = AsyncOperation.Error;
            feature.errorIfAny = action.payload;
            return {
                ...state,
                currentActiveHive: action.payload
            }
        case SUBGRAPH_LOADED:
            let newHiveData = HiveService.mergeSubgraphIntoMainGraph(action.payload, state.mainGraph);
            return {
                ...state,
                mainGraph: newHiveData
            }
        case INIT_CREATING_NEW_HIVE:
            feature.feature = AppFeature.NewHive;
            return {
                ...state,
                currentActiveFeature: feature,
            }
        case NEW_HIVE_CREATED:
            feature.feature = AppFeature.Graph;
            return {
                ...state,
                currentActiveFeature: feature,
                user: {
                    username: state.user.username,
                    id: state.user.id,
                    defaultHiveId: action.payload.id
                },
                currentActiveHive: action.payload
            }
        case NEW_HIVE_FAILED:
            feature.feature = AppFeature.NewHive;
            feature.asyncStatus = AsyncOperation.Error;
            feature.errorIfAny = action.payload;
            return {
                ...state,
                currentActiveFeature: feature
            }
        case SEARCHED_HIVES_FOUND:
            return {
                ...state,
                foundYardHives: action.payload
            }
        case HIVE_SEARCH_FAILED:
            feature.feature = AppFeature.Yard
            feature.asyncStatus = AsyncOperation.Error;
            feature.errorIfAny = action.payload;
            return {
                ...state,
                currentActiveFeature: feature
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
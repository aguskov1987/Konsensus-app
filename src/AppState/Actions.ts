import {
    CLOSE_MY_HIVES,
    CLOSE_SAVED_STATEMENTS,
    SUBGRAPH_LOADED,
    HIVE_LOADED,
    OPEN_MY_HIVES,
    OPEN_SAVED_STATEMENTS,
    USER_LOGIN_FAILED,
    USER_LOADED,
    USER_LOGGED_IN,
    USER_SAVED_HIVES_LOADED,
    OPEN_HIVE_YARD,
    CLOSE_HIVE_YARD,
    OPEN_CREATE_NEW_HIVE,
    CLOSE_CREATE_NEW_HIVE,
    INIT_CREATING_NEW_HIVE,
    NEW_HIVE_CREATED,
    SEARCHED_STATEMENTS_FOUND,
    SEARCHED_HIVES_FOUND
} from "./ActionTypes";
import {ApiUser} from "../ApiModels/ApiUser";
import {ApiHiveManifest} from "../ApiModels/ApiHiveManifest";
import {ApiSubGraph} from "../ApiModels/ApiSubGraph";
import {HiveManifest} from "../ViewModels/HiveManifest";
import {FoundStatement} from "../ViewModels/Statement";


export const openSavedStatementsAction = () => ({
    type: OPEN_SAVED_STATEMENTS,
    payload: {}
});

export const closeSavedStatementsAction = () => ({
    type: CLOSE_SAVED_STATEMENTS,
    payload: {}
});

export const openMyHivesAction = () => ({
    type: OPEN_MY_HIVES,
    payload: {}
});

export const closeMyHivesAction = () => ({
    type: CLOSE_MY_HIVES,
    payload: {}
});

export const openCreateNewHiveAction = () => ({
    type: OPEN_CREATE_NEW_HIVE,
    payload: {}
});

export const closeCreateNewHiveAction = () => ({
    type: CLOSE_CREATE_NEW_HIVE,
    payload: {}
});

export const openHiveYardAction = () => ({
    type: OPEN_HIVE_YARD,
    payload: {}
});

export const initNCreateNewHiveAction = () => ({
    type: INIT_CREATING_NEW_HIVE,
    payload: {}
});

export const newHiveCreatedAction = (hive: HiveManifest) => ({
    type: NEW_HIVE_CREATED,
    payload: hive
});

export const closeHiveYardAction = () => ({
    type: CLOSE_HIVE_YARD,
    payload: {}
});

export const userLoggedInAction = () => ({
    type: USER_LOGGED_IN,
    payload: {}
})

export const userLoadedAction = (user: ApiUser) => ({
    type: USER_LOADED,
    payload: user
})

export const userLoginFailedAction = () => ({
    type: USER_LOGIN_FAILED,
    payload: {}
})

export const userSavedHivesLoaded = (items: ApiHiveManifest[]) => ({
    type: USER_SAVED_HIVES_LOADED,
    payload: items
});

export const hiveLoadedAction = (manifest: ApiHiveManifest) => ({
    type: HIVE_LOADED,
    payload: manifest
});

export const subgraphLoadedAction = (data: ApiSubGraph) => ({
    type: SUBGRAPH_LOADED,
    payload: data
});

export const searchedStatementsFoundAction = (statements: FoundStatement[]) => ({
    type: SEARCHED_STATEMENTS_FOUND,
    payload: statements
});

export const searchedHivesFoundAction = (hives: HiveManifest[]) => ({
    type: SEARCHED_HIVES_FOUND,
    payload: hives
});
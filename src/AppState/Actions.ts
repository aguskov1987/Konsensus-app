import {
    CLOSE_MY_HIVES,
    CLOSE_SAVED_STATEMENTS,
    SUBGRAPH_LOADED,
    HIVE_OVERVIEW_LOADED,
    OPEN_MY_HIVES,
    OPEN_SAVED_STATEMENTS,
    USER_LOGIN_FAILED,
    USER_LOADED,
    USER_LOGGED_IN
} from "./ActionTypes";
import {ApiUser} from "../ApiModels/ApiUser";
import {ApiHiveOverview} from "../ApiModels/ApiHiveOverview";
import {ApiSubGraph} from "../ApiModels/ApiSubGraph";


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

export const hiveInfoLoadedAction = (info: ApiHiveOverview) => ({
    type: HIVE_OVERVIEW_LOADED,
    payload: info
});

export const hiveDataLoadedAction = (data: ApiSubGraph) => ({
    type: SUBGRAPH_LOADED,
    payload: data
});

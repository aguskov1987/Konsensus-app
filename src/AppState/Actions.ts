import {
    CLOSE_MY_HIVES,
    CLOSE_SAVED_STATEMENTS,
    HIVE_DATA_LOADED,
    HIVE_INFO_LOADED,
    OPEN_MY_HIVES,
    OPEN_SAVED_STATEMENTS,
    USER_LOAD_FAILED,
    USER_LOADED
} from "./ActionTypes";
import {HiveInfoVm} from "../ViewModels/HiveInfoVm";
import {HiveDataVm} from "../ViewModels/HiveDataVm";
import {UserVm} from "../ViewModels/UserVm";


export const openSavedStatements = () => ({
    type: OPEN_SAVED_STATEMENTS,
    payload: {}
});

export const closeSavedStatements = () => ({
    type: CLOSE_SAVED_STATEMENTS,
    payload: {}
});

export const openMyHives = () => ({
    type: OPEN_MY_HIVES,
    payload: {}
});

export const closeMyHives = () => ({
    type: CLOSE_MY_HIVES,
    payload: {}
});

export const userLoaded = (user: UserVm) => ({
    type: USER_LOADED,
    payload: user
})

export const userLoadFailed = () => ({
    type: USER_LOAD_FAILED,
    payload: {}
})

export const hiveInfoLoaded = (info: HiveInfoVm) => ({
    type: HIVE_INFO_LOADED,
    payload: info
});

export const hiveDataLoaded = (data: HiveDataVm) => ({
    type: HIVE_DATA_LOADED,
    payload: data
});

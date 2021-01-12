import {AppState} from "./AppState";

export const getUserState = (store: AppState) => store.user;
export const getHiveInfoState = (store: AppState) => store.hiveInfo;
export const getHiveDataState = (store: AppState) => store.hiveData;
import {AppState} from "./AppState";

export const getUserState = (store: AppState) => store.user;
export const getHiveInfoState = (store: AppState) => store.currentActiveHive;
export const getHiveDataState = (store: AppState) => store.mainGraph;
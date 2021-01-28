import {YardService} from "../../Services/YardService";
import {
    hiveLoadedAction,
    newHiveCreatedAction,
    searchedHivesFoundAction,
    userSavedHivesLoaded,
    userSavedHivesLoadFailedAction
} from "../Actions";
import {AxiosError} from "axios";

export function loadUserSavedHives() {
    return async function loadUserSavedHivesThunk(dispatch: any, getState: any) {
        YardService.loadUserSavedHives().then((response) => {
            dispatch(userSavedHivesLoaded(response.data));
        }).catch((error: AxiosError) => {
            if (error.response) {
                dispatch(userSavedHivesLoadFailedAction(error.code + ': ' + error.message))
            } else {
                dispatch(userSavedHivesLoadFailedAction(error.message));
            }
        })
    }
}

export function loadHive(id: string) {
    return async function loadHiveThunk(dispatch: any, getState: any) {
        YardService.loadHive(id).then((hive) => {
            dispatch(hiveLoadedAction(hive.data));
        })
    }
}

export function postNewHive(title: string, description: string) {
    return async function postNewHiveThunk(dispatch: any, getState: any) {
        YardService.createNewHive(title, description).then((response) => {
            dispatch(newHiveCreatedAction(YardService.convertToViewModel(response.data)))
        });
    }
}

export function searchYard(phrase: string) {
    return async function searchYardThunk(dispatch: any, getState: any) {
        YardService.loadSearchResults(phrase).then((response) => {
            dispatch(
                searchedHivesFoundAction(
                    response.data
                        .map(
                            (manifest) => YardService.convertToViewModel(manifest)
                        )
                )
            );
        })
    }
}

export function loadYardStart() {
    return async function loadYardStart(dispatch: any, getState: any) {
        YardService.loadInitialYard().then((response) => {
            dispatch(
                searchedHivesFoundAction(
                    response.data
                        .map(
                            (manifest) => YardService.convertToViewModel(manifest)
                        )
                )
            );
        })
    }
}
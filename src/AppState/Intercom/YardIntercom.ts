import {YardService} from "../../Services/YardService";
import {newHiveCreatedAction, searchedHivesFoundAction, userSavedHivesLoaded} from "../Actions";

export function loadUserSavedHives() {
    return async function loadUserSavedHivesThunk(dispatch: any, getState: any) {
        YardService.loadUserSavedHives().then((response) => {
            dispatch(userSavedHivesLoaded(response.data));
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
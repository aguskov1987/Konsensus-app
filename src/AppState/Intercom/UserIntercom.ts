import {UserService} from "../../Services/UserService";
import {ApiUser} from "../../ApiModels/ApiUser";
import {YardService} from "../../Services/YardService";
import {
    hiveLoadedAction,
    openMyHivesAction,
    userLoadedAction,
    userLoginFailedAction,
    userLoggedInAction
} from "../Actions";
import {AxiosResponse} from "axios";
import {AppDispatch, AppGetState} from "../Store";

/***
 * This composed function takes in username and password, logs in the user, loads the user
 * and retrieves the default hive overview if one is present on the user
 * @param username
 * @param password
 */
export function loginAndLoadUserAndLoadHive(username: string, password: string): any {
    return async function loginThunk(dispatch: AppDispatch, getState: AppGetState) {
        fetchLogin(dispatch, username, password).then(() => {
            fetchUser(dispatch).then((action) => {
                if (action.payload.currentHiveId) {
                    fetchHiveManifest(dispatch, action.payload.currentHiveId).then(() => {})
                } else {
                    dispatch(openMyHivesAction());
                }
            })
        }).catch((reason: any) => {
            dispatch(userLoginFailedAction());
        });
    }
}

/***
 * This composed function loads the user and retrieves the default hive overview if one is present on the user
 */
export function loadUserAndLoadHive(): any {
    return async function loadUserThunk(dispatch: AppDispatch, getState: AppGetState) {
        fetchUser(dispatch).then((action) => {
            if (action.payload.currentHiveId) {
                fetchHiveManifest(dispatch, action.payload.currentHiveId).then(() => {})
            } else {
                dispatch(openMyHivesAction());
            }
        });
    }
}

async function fetchLogin(dispatch: any, username: string, password: string) {
    let jwt: AxiosResponse<string> = await UserService.login(username, password);
    UserService.saveJwt(jwt.data);
    return dispatch(userLoggedInAction());
}

async function fetchUser(dispatch: any) {
    let user: AxiosResponse<ApiUser> = await UserService.loadUser()
    return dispatch(userLoadedAction(user.data));
}

async function fetchHiveManifest(dispatch: any, hiveId: string) {
    let info = await YardService.loadHive(hiveId);
    return dispatch(hiveLoadedAction(info.data));
}

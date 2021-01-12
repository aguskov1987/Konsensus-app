import {UserService} from "../../Services/UserService";
import {ApiUser} from "../../ApiModels/ApiUser";
import {HiveService} from "../../Services/HiveService";
import {hiveDataLoaded, hiveInfoLoaded, openMyHives, userLoaded, userLoadFailed} from "../Actions";

export function login(username: string, password: string) {
    return async function loginThunk(dispatch: any, getState: any) {
        UserService.login(username, password).then((jwt) => {
            UserService.clearJwt();
            UserService.saveJwt(jwt);
            loadUserHiveAndData(dispatch);
        }).catch((reason: any) => {
            dispatch(userLoadFailed())
        });
    }
}

export function loadUser() {
    return async function loadUserThunk(dispatch: any, getState: any) {
        loadUserHiveAndData(dispatch);
    }
}

function loadUserHiveAndData(dispatch: any) {
    UserService.loadUser().then((user: ApiUser) => {
        if (user.currentHiveId) {
            HiveService.loadHiveInfo(user.currentHiveId).then((info) => {
                dispatch(userLoaded(user.toVm()));
                dispatch(hiveInfoLoaded(info.toVm()));

                if (user.currentSelectedStatementId) {
                    HiveService.loadHiveData(user.currentSelectedStatementId).then((data) => {
                        dispatch(hiveDataLoaded(data.toVm()));
                    })
                }
            })
        } else {
            dispatch(dispatch(userLoaded(user.toVm())));
            dispatch(openMyHives);
        }
    })
}
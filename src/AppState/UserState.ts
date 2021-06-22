import {UserService} from "../Services/UserService";
import {AxiosError} from "axios";
import {User} from "./User";
import {StatefulObject} from "./StatefulObject";

export class UserState {
    public static user: StatefulObject<User> = new StatefulObject<User>();

    public static loadUser() {
        UserState.user.setStatusPending();
        UserService.loadUser().then((response) => {
            UserState.user.updateValue(UserService.convertToViewModel(response.data));
            UserState.user.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            UserState.user.setStatusError(!code ? '' : code);
        });
    }
}
import {ApiUser} from "../ApiModels/ApiUser";
import axios, {AxiosResponse} from "axios";
import {User} from "../AppState/User";

export class UserService {

    public static login(username: string, password: string): Promise<AxiosResponse<string>> {
        return axios.post<string>("/user/authenticate", {username, password});
    }

    public static loadUser(): Promise<AxiosResponse<ApiUser>> {
        let jwt: string | null = this.getJwt();
        if (jwt != null) {
            return axios.get<ApiUser>(`/user/user`);
        } else {
            return Promise.reject("missing jwt");
        }
    }

    public static saveJwt(jwt: string) {
        localStorage.removeItem("jwt");
        localStorage.setItem("jwt", jwt);
    }

    public static isJwtValid(): boolean {
        let jwt = localStorage.getItem("jwt");
        if (jwt == null) {
            return false;
        } else {
            let decoded = UserService.parseJwt();
            return Date.now()/1000 <= decoded.exp;
        }
    }

    public static getJwt() {
        return localStorage.getItem("jwt");
    }

    public static convertToViewModel(data: ApiUser): User {
        let user: User = new User();
        user.id = data.id;
        user.defaultHiveId = data.currentHiveId;
        user.username = data.username;
        return user;
    }

    private static parseJwt() {
        let jwt: string|null = UserService.getJwt();
        if (jwt != null) {
            let split = atob(jwt.split('.')[1])
            return JSON.parse(split);
        } else {
            return null;
        }
    }
}
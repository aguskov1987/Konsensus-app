import axios from "axios";
import {UserService} from "./UserService";

export function configureAxios() {
    axios.defaults.baseURL = "https://localhost:5001";

    axios.interceptors.request.use(function (config) {
        let auth = UserService.getJwt();
        if (auth != null) {
            config.headers.common["Authorization"] = auth;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
}
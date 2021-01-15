import {ApiUser} from "../ApiModels/ApiUser";
import {User} from "../ViewModels/User";

export class UserService {
    public static login(username: string, password: string): Promise<string> {
        return Promise.resolve("jwt");
    }

    public static loadUser(): Promise<ApiUser> {
        // todo: replace with actual API call
        let user = new ApiUser();
        return Promise.resolve(user);
    }

    public static saveJwt(jwt: string) {
        console.log('Jwt saved');
    }

    public static isJwtValid(): boolean {
        console.log('Jwt is not valid');
        return false;
    }

    public static clearJwt(): boolean {
        console.log('Jwt cleared');
        return true;
    }

    public static getJwt() {
        return "Jwt";
    }

    public static convertToViewModel(data: ApiUser): User {
        return new User();
    }
}
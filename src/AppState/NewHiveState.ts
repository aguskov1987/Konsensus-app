import {StatefulObject} from "./StatefulObject";
import {HiveManifest} from "./HiveManifest";
import {YardService} from "../Services/YardService";
import {AxiosError} from "axios";

export class NewHiveState {
    public static newHive: StatefulObject<HiveManifest> = new StatefulObject<HiveManifest>();

    public static createNewHive(title: string, description: string) {
        NewHiveState.newHive.setStatusPending();
        YardService.createNewHive(title, description).then((manifest) => {
            NewHiveState.newHive.updateValue(manifest.data);
            NewHiveState.newHive.setStatusLoaded();
        }).catch(({code}: AxiosError) => {
            NewHiveState.newHive.setStatusError(!code ? '' : code);
        });
    }
}
import {AppFeature} from "./AppFeature";
import {AsyncOperation} from "./AsyncOperation";

export class CurrentActiveFeatureState {
    public feature: AppFeature = AppFeature.Login;
    public asyncStatus: AsyncOperation = AsyncOperation.Done;
    public errorIfAny: string = '';
}
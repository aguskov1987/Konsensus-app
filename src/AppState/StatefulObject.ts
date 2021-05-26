import {Model} from "./Model";
import {Subject} from "rxjs";
import {LoadingStatus} from "./LoadingStatus";
import cloneDeep from "lodash.clonedeep";

export class StatefulObject<T extends Model | Model[] | null> {
    public obj: T = null as any;
    public notifier: Subject<T> = new Subject<T>();
    public status: Subject<LoadingStatus> = new Subject<LoadingStatus>();
    public error: string = '';
    public history: T[] = [];

    public update(value: T) {
        this.history.push(cloneDeep(this.obj));

        this.notifier.next(value);
        this.obj = value;

        if (this.history.length > 100) {
            this.history.pop();
        }
    }

    public setStatusPending() {
        this.status.next(LoadingStatus.Pending);
        this.error = '';
    }

    public setStatusLoaded() {
        this.status.next(LoadingStatus.Loaded);
        this.error = '';
    }

    public setStatusError(error: string) {
        this.status.next(LoadingStatus.Error);
        this.error = error;
    }

    public resetStatus() {
        this.status.next(LoadingStatus.Ready);
        this.error = '';
    }
}
import {Model} from "./Model";
import {Subject} from "rxjs";
import {LoadingStatus} from "./LoadingStatus";
import cloneDeep from "lodash.clonedeep";

export class StatefulObject<T extends Model | Model[] | null> {
    private value: T = null as any;

    public valueUpdatedEvent: Subject<T> = new Subject<T>();
    public statusUpdatedEvent: Subject<LoadingStatus> = new Subject<LoadingStatus>();

    public error: string = '';
    public history: T[] = [];

    public updateValue(value: T) {
        this.history.push(cloneDeep(this.value));

        this.valueUpdatedEvent.next(value);
        this.value = value;

        if (this.history.length > 100) {
            this.history.pop();
        }
    }

    public getValue(): T {
        return cloneDeep(this.value);
    }

    public setStatusPending() {
        this.statusUpdatedEvent.next(LoadingStatus.Pending);
        this.error = '';
    }

    public setStatusLoaded() {
        this.statusUpdatedEvent.next(LoadingStatus.Loaded);
        this.error = '';
    }

    public setStatusError(error: string) {
        this.statusUpdatedEvent.next(LoadingStatus.Error);
        this.error = error;
    }

    public resetStatus() {
        this.statusUpdatedEvent.next(LoadingStatus.Ready);
        this.error = '';
    }
}
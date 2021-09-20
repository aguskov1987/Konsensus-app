import cloneDeep from "lodash.clonedeep";
import {BehaviorSubject} from "rxjs";
import {LoadingStatus} from "./LoadingStatus";


export class StatefulObject<T> {
    private value: T = null as any;

    public valueUpdatedEvent: BehaviorSubject<T> = new BehaviorSubject<T>(null as any);
    public statusUpdatedEvent: BehaviorSubject<LoadingStatus> = new BehaviorSubject<LoadingStatus>(LoadingStatus.Ready);

    public error: string = '';
    public history: T[] = [];

    public updateValue(value: T) {
        this.history.push(cloneDeep(this.value));
        let newValue = cloneDeep(value);

        this.valueUpdatedEvent.next(newValue);
        this.value = newValue;

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

    public restartListener() {
        this.statusUpdatedEvent.complete();
        this.statusUpdatedEvent = new BehaviorSubject<LoadingStatus>(LoadingStatus.Ready);

        this.valueUpdatedEvent.complete();
        this.valueUpdatedEvent = new BehaviorSubject<T>(null as any);

        this.error = '';
    }
}

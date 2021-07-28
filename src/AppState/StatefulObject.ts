import {Model} from "./Model";
import {BehaviorSubject} from "rxjs";
import {LoadingStatus} from "./LoadingStatus";
import cloneDeep from "lodash.clonedeep";


export class StatefulObject<T> {
    private value: T = null as any;

    public valueUpdatedEvent: BehaviorSubject<T> = new BehaviorSubject<T>(null as any);
    public statusUpdatedEvent: BehaviorSubject<LoadingStatus> = new BehaviorSubject<LoadingStatus>(null as any);

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

    // TODO: merge reset methods?
    public resetStatus() {
        this.statusUpdatedEvent.next(LoadingStatus.Ready);
        this.error = '';
    }

    public restartListener() {
        this.statusUpdatedEvent.complete();
        this.statusUpdatedEvent = new BehaviorSubject<LoadingStatus>(null as any);

        this.valueUpdatedEvent.complete();
        this.valueUpdatedEvent = new BehaviorSubject<T>(null as any);
    }
}


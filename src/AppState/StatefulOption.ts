import cloneDeep from "lodash.clonedeep";
import {BehaviorSubject} from "rxjs";


export class StatefulOption<T> {
    public optionUpdatedEvent: BehaviorSubject<T>;
    private option: T = null as any;

    public constructor(initialValue: any = null) {
        this.optionUpdatedEvent = new BehaviorSubject<T>(initialValue as any);
        this.option = cloneDeep(initialValue);
    }

    public updateOption(option: T) {
        let newOption = cloneDeep(option);

        this.optionUpdatedEvent.next(newOption);
        this.option = newOption;
    }

    public getOption(): T {
        return cloneDeep(this.option);
    }
}

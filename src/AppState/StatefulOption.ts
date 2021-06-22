import cloneDeep from "lodash.clonedeep";
import {BehaviorSubject} from "rxjs";


export class StatefulOption<T> {
    private option: T = null as any;

    public optionUpdatedEvent: BehaviorSubject<T> = new BehaviorSubject<T>(null as any);

    public updateOption(option: T) {
        let newOption = cloneDeep(option);

        this.optionUpdatedEvent.next(newOption);
        this.option = newOption;
    }

    public getOption(): T {
        return cloneDeep(this.option);
    }
}
import {BehaviorSubject} from "rxjs";
import cloneDeep from "lodash.clonedeep";

/***
 * @description Temporarily stashed value. Can be used to exchange objects between components or to save and
 * restore component data. The values are deep copied so the original object's changes will not affect the stash.
 *
 * The structure is used by two parties: 1. the initiator (calling code) which calls the stash() method
 * and listens to the onStashed event to further proceed. 2. The stasher (code responsible for saving the
 * value) listens to the onStash event and executes the put() method which saves the value. Either the
 * initiator or the stasher can call the take() method to retrieve the value back. The retrieval will clear
 * the stash. Alternatively the drop() method can be called. It will drop the value without returning
 * anything.
 */
export class Stash<T> {
    private value: T = null as any;
    /***
     * @description Fires when the initiator calls the stash() method
     */
    public onStash: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    /***
     * @description Fires when the stasher calls the put() method to store the value
     */
    public onStashed: BehaviorSubject<number> = new BehaviorSubject<number>(1);

    public stash() {
        this.onStash.next(1);
    }

    /***
     * @description Saves the passed object into the stash and fires the onStashed notification
     * @param value Value to store
     */
    public put(value: T) {
        this.value = cloneDeep(value);
        this.onStashed.next(1);
    }

    /***
     * @description Returns the saved value and clears the stash
     * @return The stashed value
     */
    public take(): T {
        let response = cloneDeep(this.value);
        this.value = null as any;
        return response;
    }

    /***
     * Clear the value
     */
    public drop() {
        this.value = null as any;
    }
}
import {Model} from "./Model";
import {Statement} from "./Statement";
import {Effect} from "./Effect";

export class SubGraph extends Model {
    public statements: Statement[] = [];
    public effects: Effect[] = [];
    public origin: Statement = new Statement();
}
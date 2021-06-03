import {Model} from "./Model";
import {Statement} from "./Statement";
import {Effect} from "./Effect";
import {Position} from "cytoscape";

export class SubGraph extends Model {
    public statements: Statement[] = [];
    public effects: Effect[] = [];
    public origin: Statement = new Statement();
}

export class StashedStatement {
    public id: string = '';
    public label: string = '';
    public position: Position = {x: 0, y: 0};
    public userResponse: number = 0;
    public commonResponse: number = 0;
    public penetration: number = 0;
}

export class StashedEffect {
    public id: string = '';
    public source: string  = '';
    public target: string = '';
    public userResponse: number = 0;
    public commonResponse: number = 0;
    public penetration: number = 0;
}

export class StashedSubGraph {
    public statements: StashedStatement[] = [];
    public effects: StashedEffect[] = [];
    public pan: Position = {x: 0, y: 0};
    public zoom: number = 0;
}
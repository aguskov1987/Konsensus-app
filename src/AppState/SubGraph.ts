import {Model} from "./Model";
import {Point} from "./Point";
import {Synapse} from "./Synapse";
import {Position} from "cytoscape";

export class SubGraph extends Model {
    public points: Point[] = [];
    public synapses: Synapse[] = [];
    public origin: Point = new Point();
}

export class StashedPoint {
    public id: string = '';
    public label: string = '';
    public position: Position = {x: 0, y: 0};
    public userResponse: number = 0;
    public commonResponse: number = 0;
    public penetration: number = 0;
}

export class StashedSynapse {
    public id: string = '';
    public source: string  = '';
    public target: string = '';
    public userResponse: number = 0;
    public commonResponse: number = 0;
    public penetration: number = 0;
}

export class StashedSubGraph {
    public points: StashedPoint[] = [];
    public synapses: StashedSynapse[] = [];
    public pan: Position = {x: 0, y: 0};
    public zoom: number = 0;
}
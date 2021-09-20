import {Model} from "./Model";
import {Point} from "./Point";
import {Synapse} from "./Synapse";
import {Position} from "cytoscape";
import {PointType} from "./PointType";

export class SubGraph extends Model {
    public origin: Point = new Point();
    public points: Point[] = [];
    public synapses: Synapse[] = [];
}

export class StashedPoint {
    public commonResponse: number = 0;
    public id: string = '';
    public label: string = '';
    public penetration: number = 0;
    public position: Position = {x: 0, y: 0};
    public type: PointType = PointType.Statement;
    public userResponse: number = 0;
}

export class StashedSynapse {
    public commonResponse: number = 0;
    public from: string = '';
    public id: string = '';
    public penetration: number = 0;
    public to: string = '';
    public userResponse: number = 0;
}

export class StashedSubGraph {
    public pan: Position = {x: 0, y: 0};
    public points: StashedPoint[] = [];
    public synapses: StashedSynapse[] = [];
    public zoom: number = 0;
}

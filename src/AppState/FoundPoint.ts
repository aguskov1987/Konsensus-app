import {Model} from "./Model";
import {PointType} from "./PointType";

export class FoundPoint extends Model {
    public type: PointType = PointType.Statement;
    public commonResponse: number = 0;
    public label: string = '';
    public myResponse: number = 0;
    public penetration: number = 0;
}

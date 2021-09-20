import {Model} from "./Model";
import {PointType} from "./PointType";

/*
Hive participant:
    somebody who:
    - has created a hive
    - has created a point
    - has created an synapse
    - has responded to either a point or synapse
*/

export class Point extends Model{
    public commonResponse: number = 0; // (Positive + Negative) / Total
    public label: string = '';
    public lastItemStamp: string = '';
    public penetration: number = 0; // ratio of all responses to the total number of hive participants
    public type: PointType = PointType.Statement;
    public userResponse: number = 0; // either positive or negative
}

import {Model} from "./Model";

/*
Hive participant:
    somebody who:
    - has created a hive
    - has created a point
    - has created an synapse
    - has responded to either a point or synapse
*/

export class Point extends Model{
    public label: string = '';
    public userResponse: number = 0; // either positive or negative
    public commonResponse: number = 0; // (Positive + Negative) / Total
    public penetration: number = 0; // ratio of all responses to the total number of hive participants
}

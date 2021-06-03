import {Model} from "./Model";

/*
Hive participant:
    somebody who:
    - has created a hive
    - has created a statement
    - has created an effect
    - has responded to either a statement or an effect
*/

export class Statement extends Model{
    public label: string = '';
    public userResponse: number = 0; // either positive or negative
    public commonResponse: number = 0; // (Positive + Negative) / Total
    public penetration: number = 0; // ration of all responses to the total number of hive participants
}

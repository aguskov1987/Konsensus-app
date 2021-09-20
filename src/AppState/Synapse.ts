import {Model} from "./Model";

export class Synapse extends Model{
    public commonResponse: number = 0;
    public from: string = '';
    public lastItemStamp: string = '';
    public penetration: number = 0;
    public to: string = '';
    public userResponse: number = 0;
}

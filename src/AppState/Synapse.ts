import {Model} from "./Model";

export class Synapse extends Model{
    public from: string = '';
    public to: string = '';
    public userResponse: number = 0;
    public commonResponse: number = 0;
    public penetration: number = 0;
    public lastItemStamp: string = '';
}

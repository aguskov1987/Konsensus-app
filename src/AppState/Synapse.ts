import {Model} from "./Model";

export class Synapse extends Model{
    public source: string = '';
    public target: string = '';
    public userResponse: number = 0;
    public commonResponse: number = 0;
    public penetration: number = 0;
}
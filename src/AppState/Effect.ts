import {Model} from "./Model";

export class Effect extends Model{
    public label: string = '';
    public source: string = '';
    public target: string = '';
    public myResponse: number = 0;
    public commonResponse: number = 0;
    public penetration: number = 0;
}
import {Model} from "./Model";

export class HiveManifest extends Model{
    public allowDanglingPoints: boolean = false;
    public collectionId: string = '';
    public dateCreated: string = '';
    public description: string = '';
    public participationCount: number[] = [];
    public pointCount: number[] = [];
    public title: string = '';
}

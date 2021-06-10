import {Model} from "./Model";

export class HiveManifest extends Model{
    public collectionId: string = '';
    public dateCreated: string = '';
    public description: string = '';
    public participationCount: number[] = [];
    public pointCount: number[] = [];
    public title: string = '';
}

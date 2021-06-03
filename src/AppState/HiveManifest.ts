import {Model} from "./Model";

export class HiveManifest extends Model{
    public title: string = '';
    public description: string = '';
    public dateCreated: string = '';
    public numberOfParticipants: number = 0;
    public numberOfParticipantsGrowth: number = 0;
    public numberOfPoints: number = 0;
    public numberOfPointsGrowth: number = 0;
    public collectionId: string = '';
}

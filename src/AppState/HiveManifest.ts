import {Model} from "./Model";

export class HiveManifest extends Model{
    public title: string = '';
    public description: string = '';
    public dateCreated: string = '';
    public numberOfParticipants: number = 0;
    public numberOfParticipantsGrowth: number = 0;
    public numberOfStatements: number = 0;
    public numberOfStatementsGrowth: number = 0;
    public collectionId: string = '';
}

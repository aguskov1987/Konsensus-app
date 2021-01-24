export class HiveManifest {
    // * ID of the Hive
    public id: string = '';
    // * Title of the Hive
    public title: string = '';
    // * Description of the Hive
    public description: string = '';
    // * Number of interactions for the last several days
    public activity: number = 0;
    // * How many users have left a response
    public numberOfParticipants: number = 0;
    // * How many statement neurons the Hive has
    public numberOfStatements: number = 0;
}

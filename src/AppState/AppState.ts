import {MainGraph} from "../ViewModels/MainGraph";
import {HiveOverview} from "../ViewModels/HiveOverview";
import {User} from "../ViewModels/User";
import {HiveVisualisationParams} from "../ViewModels/HiveVisualisationParams";
import {SavedHive} from "../ViewModels/SavedHive";
import {Statement} from "../ViewModels/Statement";

export class AppState {
    public hiveInfo: HiveOverview = new HiveOverview();
    public mainGraph: MainGraph = new MainGraph();

    public user: User = new User();
    public savedHives: SavedHive[] = [];
    public savedStatements: Statement[] = [];

    public favStatementsOpen: boolean = false;
    public myHivesOpen: boolean = false;
    public loginOpen: boolean = true;

    public visualization: HiveVisualisationParams = new HiveVisualisationParams();
}

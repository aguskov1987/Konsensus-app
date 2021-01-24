import {MainGraph} from "../ViewModels/MainGraph";
import {HiveManifest} from "../ViewModels/HiveManifest";
import {User} from "../ViewModels/User";
import {HiveVisualisationParams} from "../ViewModels/HiveVisualisationParams";
import {FoundStatement, Statement} from "../ViewModels/Statement";

export class AppState {
    public currentActiveHive: HiveManifest = new HiveManifest();
    public mainGraph: MainGraph = new MainGraph();

    public user: User = new User();
    public savedHives: HiveManifest[] = [];
    public savedStatements: Statement[] = [];

    public savedHivesLoading: boolean = true;
    public favStatementsLoading: boolean = true;
    public hiveYardLoading: boolean = true;
    public creatingNewHive: boolean = false;

    public favStatementsOpen: boolean = false;
    public savedHivesOpen: boolean = false;
    public hiveYardOpen: boolean = false;
    public loginOpen: boolean = true;
    public newHiveOpen: boolean = false;

    public foundYardHives: HiveManifest[] = [];
    public foundStatements: FoundStatement[] = []

    public visualization: HiveVisualisationParams = new HiveVisualisationParams();
}

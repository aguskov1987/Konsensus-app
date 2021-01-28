import {MainGraph} from "../ViewModels/MainGraph";
import {HiveManifest} from "../ViewModels/HiveManifest";
import {User} from "../ViewModels/User";
import {HiveVisualisationParams} from "../ViewModels/HiveVisualisationParams";
import {FoundStatement, Statement} from "../ViewModels/Statement";

export class AppState {
    // * Core state objects
    public currentActiveHive: HiveManifest = new HiveManifest();
    public mainGraph: MainGraph = new MainGraph();

    public user: User = new User();
    public savedHives: HiveManifest[] = [];
    public savedStatements: Statement[] = [];

    // * Loading states
    public savedHivesLoading: boolean = true;
    public savedHivesLoaded: boolean = false;
    public savedHivesLoadingError: string = "";

    public savedStatementsLoading: boolean = true;
    public savedStatementsLoadingError: string = "";
    public hiveYardLoading: boolean = true;
    public hiveYardLoadingError: string = "";
    public creatingNewHive: boolean = false;
    public creatingNewHiveError: string = "";

    // * Currently open dialogs
    public savedStatementsOpen: boolean = false;
    public savedHivesOpen: boolean = false;
    public hiveYardOpen: boolean = false;
    public loginOpen: boolean = true;
    public newHiveOpen: boolean = false;

    // * Found options
    public foundYardHives: HiveManifest[] = [];
    public foundStatements: FoundStatement[] = []

    public visualization: HiveVisualisationParams = new HiveVisualisationParams();
}

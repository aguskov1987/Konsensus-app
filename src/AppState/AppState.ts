import {MainGraph} from "../ViewModels/MainGraph";
import {HiveManifest} from "../ViewModels/HiveManifest";
import {User} from "../ViewModels/User";
import {HiveVisualisationParams} from "../ViewModels/HiveVisualisationParams";
import {FoundStatement, Statement} from "../ViewModels/Statement";
import {CurrentActiveFeatureState} from "./CurrentActiveFeatureState";

export class AppState {
    public currentActiveHive: HiveManifest = new HiveManifest();
    public mainGraph: MainGraph = new MainGraph();

    public user: User = new User();
    public savedHives: HiveManifest[] = [];
    public savedStatements: Statement[] = [];

    public currentActiveFeature: CurrentActiveFeatureState = new CurrentActiveFeatureState();

    public foundYardHives: HiveManifest[] = [];
    public foundStatements: FoundStatement[] = [];
    public statementSearchLoading: boolean = false;

    public visualization: HiveVisualisationParams = new HiveVisualisationParams();
}

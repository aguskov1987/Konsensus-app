import {StatefulOption} from "./StatefulOption";
import {HiveLayout} from "./HiveLayout";
import {ResponseView} from "./ResponseView";
import {Subject} from "rxjs";
import {ButtonCommand} from "./ButtonCommand";

export class HiveOperationsState {
    public static layout: StatefulOption<HiveLayout> = new StatefulOption<HiveLayout>();
    public static responseView: StatefulOption<ResponseView> = new StatefulOption<ResponseView>();
    public static lastButtonCommand: Subject<ButtonCommand> = new Subject<ButtonCommand>();
}
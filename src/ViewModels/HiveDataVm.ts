import {StatementVm} from "./StatementVm";
import {SynapseVm} from "./SynapseVm";

export class HiveDataVm {
    public statements: StatementVm[] = [];
    public synapses: SynapseVm[] = [];
    public currentSelectedStatement: StatementVm = new StatementVm();
}
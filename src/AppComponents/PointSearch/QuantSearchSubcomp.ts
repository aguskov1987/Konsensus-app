import {FoundPoint} from "../../AppState/FoundPoint";

export class QuantOptionsResult {
    public options: FoundPoint[] = [];
    public queryValid: boolean = false;
}

export class QuantSearchSubcomp {
    public signalToken: string = '!!';

    getOptions(query: string): QuantOptionsResult {
        let result = new QuantOptionsResult();

        return result;
    }
}

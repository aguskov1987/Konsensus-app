import {FoundPoint} from "../../AppState/FoundPoint";

export class QuantOptionsResult {
    public options: FoundPoint[] = [];
    public queryValid: boolean = false;
}

export class QuantSearchSubcomp {
    public token: string = '~';
    private filters: string[] = [
        'most active',
        'most connected',
        'most old',
        'most recently responded',
        'most positive',
        'least active',
        'least connected',
        'least old',
        'least recently responded',
        'least positive',
    ]

    getOptions(query: string): QuantOptionsResult {
        let result = new QuantOptionsResult();

        for(let filter of this.filters) {
            let point = new FoundPoint();
            point.label = '~'+filter;
            result.options.push(point);
        }

        let norm = query.replace('~', '').trim().replace(/  +/g, ' ');
        result.queryValid = this.filters.some(f => f === norm);

        return result;
    }
}

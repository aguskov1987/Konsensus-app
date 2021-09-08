import {FoundPoint} from "../../AppState/FoundPoint";

export class QuantOptionsResult {
    public options: FoundPoint[] = [];
    public queryValid: boolean = true;
}

export class QuantSearchSubcomp {
    public signalToken: string = '!!';
    private qualifiers: string[] = ['most', 'least'];
    private specifiers: string[] = ['active', 'connected', 'old', 'positive', 'recently-responded'];
    private usedSpecifiers: string[] = [];

    public isQuantQuery(query: string): boolean {
        query = query.trimStart();
        let firstChar = query.charAt(0);
        let secondChar = query.charAt(1);
        return firstChar + secondChar === this.signalToken;
    }

    public getOptions(query: string): QuantOptionsResult {
        let result = new QuantOptionsResult();

        query = query.replace('!!', '');
        let words: string[] = [];
        let word: string = '';
        words = this.splitQuery(query, word, words);

        // trivial: nothing in the query
        if (words.length < 1) {
            result.options = this.qualifiers.map(q => {
                let p = new FoundPoint();
                p.label = q;
                return p;
            });
            for(let opt of result.options) {
                opt.label = '!! ' + opt.label;
            }
            return result;
        }

        let currentQualifier = '';
        let currentSpecifier = '';
        words.forEach((word, idx) => {
            if (idx !== words.length - 1) {
                // check validity
                if (this.qualifiers.some(q => q === word)) {
                    currentQualifier = word;
                } else if (this.specifiers.some(q => q === word) && currentQualifier !== '') {
                    currentSpecifier = word;
                } else if (word === ';') {
                    //do nothing
                } else {
                    result.queryValid = false;
                }

                if (currentQualifier !== '' && currentSpecifier !== '') {
                    this.usedSpecifiers.push(currentSpecifier.slice());
                    currentQualifier = '';
                    currentSpecifier = '';
                }
            } else {
                // last word; populate suggestions
                for(let q of this.qualifiers) {
                    if (q === word) {
                        for(let s of this.specifiers) {
                            if (!this.usedSpecifiers.some(used => used === s)) {
                                let point = new FoundPoint();
                                point.label = point.label = (words.join(' ') + ' ' + s).replace(' ;', ';');
                                result.options.push(point);
                            }
                        }
                        result.queryValid = true;
                        break;
                    } else if (q.startsWith(word) && q !== word) {
                        let point = new FoundPoint();
                        words.pop();
                        point.label = point.label = (words.join(' ') + ' ' + q).replace(' ;', ';').trim();
                        result.options.push(point);
                        result.queryValid = true;
                        break;
                    } else {
                        result.queryValid = false;
                    }
                }

                if (result.options.length > 0) {
                    return result;
                }

                for(let s of this.specifiers) {
                    if (s === word) {
                        this.usedSpecifiers.push(s);
                        let point = new FoundPoint();
                        point.label = words.join(' ').replace(' ;', ';').trim();
                        result.options.push(point);
                        result.queryValid = true;
                        break;
                    } else if (s.startsWith(word) && s !== word && !this.usedSpecifiers.some(used => used === s)) {
                        let point = new FoundPoint();
                        words.pop();
                        point.label = point.label = (words.join(' ') + ' ' + s).replace(' ;', ';').trim();
                        result.options.push(point);
                        result.queryValid = true;
                        break;
                    } else {
                        result.queryValid = false;
                    }
                }

                if (word === ';') {
                    for (let q of this.qualifiers) {
                        let point = new FoundPoint();
                        point.label = (words.join(' ') + ' ' + q).replace(' ;', ';');
                        result.options.push(point);
                        result.queryValid = true;
                    }
                }
            }
        });

        // check duplicates
        let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
        let dups = findDuplicates(this.usedSpecifiers);
        if (dups.length > 0) {
            result.queryValid = false;
            result.options = [];
        }

        this.usedSpecifiers = [];

        if (result.options.length > 0) {
            for(let opt of result.options) {
                opt.label = '!! ' + opt.label;
            }
        }
        return result;
    }

    public isQueryComplete(query: string):boolean {
        query = query.replace('!!', '');
        let words: string[] = [];
        let word: string = '';
        words = this.splitQuery(query, word, words);

        let last = words.pop();
        return this.specifiers.some(s => s === last);
    }

    private splitQuery(query: string, word: string, words: string[]) {
        for (let char of query) {
            if (char !== ' ' && char !== ';') {
                word += char;
            } else if (char === ';') {
                if (word !== '') {
                    words.push(word.slice());
                    word = '';
                }
                words.push(';')
            } else {
                if (word !== '') {
                    words.push(word.slice());
                    word = '';
                }
            }
        }
        if (word !== '') {
            words.push(word.slice());
            word = '';
        }

        return words.filter(w => w !== '');
    }
}

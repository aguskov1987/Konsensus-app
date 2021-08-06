import {QuantSearchSubcomp} from "./QuantSearchSubcomp";

it('should exist if created', () => {
    let subcomp = new QuantSearchSubcomp();
    expect(subcomp).not.toBeNull()
})

it('should return most/least if "!!" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!!');
    expect(result.queryValid).toBeTruthy();
    expect(result.options.length).toBe(2);
    expect(result.options[0].label).toBe('most');
    expect(result.options[1].label).toBe('least');
});

it('should return most if "!!m" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!!m');
    expect(result.queryValid).toBeTruthy();
    expect(result.options.length).toBe(1);
    expect(result.options[0].label).toBe('most');
});

it('should return most if "!! mo" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!!mo');
    expect(result.queryValid).toBeTruthy();
    expect(result.options.length).toBe(1);
    expect(result.options[0].label).toBe('most');
});

it('should return least if "!!    leas" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!!    leas');
    expect(result.queryValid).toBeTruthy();
    expect(result.options.length).toBe(1);
    expect(result.options[0].label).toBe('least');
});

it('should return INVALID QUERY if "!!  z" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!! z');
    expect(result.queryValid).toBeFalsy();
    expect(result.options.length).toBe(0);
});

it('should return positive/old/active/connected/fresh if "!! most" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!! most');
    expect(result.queryValid).toBeTruthy();
    expect(result.options.length).toBe(5);
    expect(result.options[0].label).toBe('active');
    expect(result.options[1].label).toBe('connected');
    expect(result.options[2].label).toBe('old');
    expect(result.options[3].label).toBe('positive');
    expect(result.options[4].label).toBe('fresh');
});

it('should return positive/old/active/connected/fresh if "!! least" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!! least');
    expect(result.queryValid).toBeTruthy();
    expect(result.options.length).toBe(5);
    expect(result.options[0].label).toBe('active');
    expect(result.options[1].label).toBe('connected');
    expect(result.options[2].label).toBe('old');
    expect(result.options[3].label).toBe('positive');
    expect(result.options[4].label).toBe('fresh');
});

it('should return positive if "!! most p" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!! most p');
    expect(result.queryValid).toBeTruthy();
    expect(result.options.length).toBe(1);
    expect(result.options[0].label).toBe('positive');
});

it('should return positive if "!! least pos" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!! least pos');
    expect(result.queryValid).toBeTruthy();
    expect(result.options.length).toBe(1);
    expect(result.options[0].label).toBe('positive');
});

it('should return INVALID QUERY if "!! least v" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('! least v');
    expect(result.queryValid).toBeFalsy();
    expect(result.options.length).toBe(0);
});

it('should return most/least if "!! most old;" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!! most old;');
    expect(result.queryValid).toBeTruthy();
    expect(result.options.length).toBe(2);
    expect(result.options[0].label).toBe('most');
    expect(result.options[1].label).toBe('least');
});

it('should return positive if "!! most old; least pos" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!! most old; least pos');
    expect(result.queryValid).toBeTruthy();
    expect(result.options.length).toBe(1);
    expect(result.options[0].label).toBe('positive');
});

it('should return positive if "!! most old;   mo" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!! most old;   mo');
    expect(result.queryValid).toBeTruthy();
    expect(result.options.length).toBe(1);
    expect(result.options[0].label).toBe('most');
});

it('should return positive/active/connected/fresh if "!! most old; least" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!! most old; least');
    expect(result.queryValid).toBeTruthy();
    expect(result.options.length).toBe(4);
    expect(result.options[0].label).toBe('active');
    expect(result.options[1].label).toBe('connected');
    expect(result.options[2].label).toBe('positive');
    expect(result.options[3].label).toBe('fresh');
});

it('should return INVALID QUERY if "!! most old; least v" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!! most old; least v');
    expect(result.queryValid).toBeFalsy();
    expect(result.options.length).toBe(0);
});

it('should return positive/active/fresh responded if "!! most old; least connected; least" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!! most old; least connected; least');
    expect(result.queryValid).toBeTruthy();
    expect(result.options.length).toBe(3);
    expect(result.options[0].label).toBe('active');
    expect(result.options[1].label).toBe('positive');
    expect(result.options[2].label).toBe('fresh');
});

it('should return INVALID QUERY if "!!most connected; least connected" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!!most connected; least connected');
    expect(result.queryValid).toBeFalsy();
    expect(result.options.length).toBe(0);
});

it('should return INVALID QUERY if "!!most connected; least c" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!!most connected; least c');
    expect(result.queryValid).toBeFalsy();
    expect(result.options.length).toBe(0);
});

it('should return INVALID QUERY if "!!most connected; least con" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!!most connected; least con');
    expect(result.queryValid).toBeFalsy();
    expect(result.options.length).toBe(0);
});

it('should return INVALID QUERY if "!! most old; least connected" is supplied', () => {
    let subcomp = new QuantSearchSubcomp();
    let result = subcomp.getOptions('!! most old; least connected');
    expect(result.queryValid).toBeTruthy();
    expect(result.options.length).toBe(0);
});

export {}

/*
* Quantitative search subcomponent
* Besides live search for point text, the search supports what's called quantitative queries - the user can specify
* qualities of the points to search for. Such qualities are:
*   - user response (positive)
*   - date of creation (old)
*   - activity (active)
*   - connectivity (connected)
*   - date of the last response (fresh)
* More criteria can be added so the design should allow somewhat easy additions. To facilitate this, a framework is
* required. It can look something like this:
*
*     -----------------------------
*     | ~ | qualifier | specifier |
*     -----------------------------
*     where |~| = flag for quantitative query
*           |qualifier| = how to compare the specifier (most, least)
*           |specifier| = the actual property to look at
*
* So the queries would look something like this:
* ~most positive
* ~least active
* ~most connected
* etc...
*
* The subcomp should probably provide a check for query validity. User cannot, for example, specify both 'most' and
* 'least' qualifiers. This does not make sense. Spelling should match too.
*
* It should be possible to combine -different- qualifier-specifier pairs to perform more complex queries. They can be
* comma separated.
*/

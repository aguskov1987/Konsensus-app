import {QuantSearchSubcomp} from "./QuantSearchSubcomp";

it('should exist if created', () => {
    let subcomp = new QuantSearchSubcomp();
    expect(subcomp).not.toBeNull()
})

// ****** TEST CASES:  input -> list of options *******

// !! -> most/least
// !!m -> most
// !! mo -> most
// !!    leas -> least
// !! f -> INVALID QUERY
// !! most -> positive/old/active/connected/recently responded
// !! least -> positive/old/active/connected/recently responded
// !! most p -> positive
// !! least   pos -> positive
// !! least v -> INVALID QUERY

// !! most old; -> most/least
// !! most old; least   pos -> positive
// !! most old; mo -> most
// !! most old; least -> positive/active/connected/recently responded
// !! most old; least v -> INVALID QUERY

// !! most old; least connected; least -> positive/active/recently responded

// !!most connected; least connected -> INVALID QUERY
// !!most connected; least c -> INVALID QUERY
// !!most connected; least con -> INVALID QUERY
// !! most old; least connected; least connected -> INVALID QUERY

export {}

/*
* Quantitative search subcomponent
* Besides live search for point text, the search supports what's called quantitative queries - the user can specify
* qualities of the points to search for. Such qualities are:
*   - user response (positive)
*   - date of creation (old)
*   - activity (active)
*   - connectivity (connected)
*   - date of the last response (recently responded)
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

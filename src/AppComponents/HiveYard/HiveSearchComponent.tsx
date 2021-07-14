import React from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {YardState} from "../../AppState/YardState";

class HiveSearchComponent extends React.Component<any, any> {

    constructor(props: any) {
        super(props);

        this.updateSearchPhrase = this.updateSearchPhrase.bind(this);
        this.searchHives = this.searchHives.bind(this);

        this.state = {searchPhrase: ''};
    }

    updateSearchPhrase(event: any) {
        this.setState({
            searchPhrase: event.target.value
        });
    }

    searchHives() {
        YardState.hivesSearchQuery.updateOption(this.state.searchPhrase);
    }

    render() {
        return (
            <InputGroup className="mb-3" size="sm">
                <FormControl onChange={this.updateSearchPhrase}
                             placeholder="Search hives"
                             aria-label="Search hives"
                             aria-describedby="search hives"
                />
                <InputGroup.Append>
                    <Button variant="secondary">Search</Button>
                    <Button variant="secondary">Home</Button>
                </InputGroup.Append>
            </InputGroup>
        );
    }
}

export default HiveSearchComponent;
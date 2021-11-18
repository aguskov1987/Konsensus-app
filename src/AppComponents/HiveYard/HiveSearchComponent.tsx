import React from "react";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {YardState} from "../../AppState/YardState";

class HiveSearchComponent extends React.Component<any, any> {
    private inputRef: any = null;

    constructor(props: any) {
        super(props);

        this.updateSearchPhrase = this.updateSearchPhrase.bind(this);
        this.searchHives = this.searchHives.bind(this);
        this.goHome = this.goHome.bind(this);

        this.state = {searchPhrase: ''};
    }

    // TODO: fix needing to click twice on Home button after search phrase has been entered
    updateSearchPhrase(event: any) {
        this.setState({
            searchPhrase: event.target.value
        });
    }

    searchHives() {
        YardState.hivesSearchQuery.updateOption(this.state.searchPhrase);
    }

    goHome() {
        this.inputRef.value = '';
        this.setState({
            searchPhrase: ''
        });
        YardState.hivesSearchQuery.updateOption(this.state.searchPhrase);
    }

    render() {
        return (
            <InputGroup className="mb-3" size="sm">
                <FormControl onChange={this.updateSearchPhrase}
                             ref={c => (this.inputRef = c)}
                             placeholder="Search hives"
                             aria-label="Search hives"
                             aria-describedby="search hives"
                />
                <InputGroup.Append>
                    <Button variant="secondary" onClick={this.searchHives} >Search</Button>
                    <Button variant="secondary" onClick={this.goHome}>Home</Button>
                </InputGroup.Append>
            </InputGroup>
        );
    }
}

export default HiveSearchComponent;

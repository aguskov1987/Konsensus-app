import React from "react";
import {connect} from "react-redux";
import {createNewStatement, loadStatementSearchResults, loadSubgraph} from "../../AppState/Intercom/HiveIntercom";
import {AppState} from "../../AppState/AppState";
import {initStatementSearchAction} from "../../AppState/Actions";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {FoundStatement} from "../../ViewModels/Statement";
import {Button, InputGroup} from "react-bootstrap";

let dispatchers = {loadStatementSearchResults, initStatementSearchAction, createNewStatement, loadSubgraph}
type PropDispatchers = typeof dispatchers;

const mapStateToProps = (state: AppState) => {
    return {
        options: state.foundStatements,
        loading: state.statementSearchLoading
    }
}
type PropValues = ReturnType<typeof mapStateToProps>;

// The component uses react-bootstrap-typeahead
// https://github.com/ericgio/react-bootstrap-typeahead
class StatementFinderCreator extends React.Component<PropDispatchers & PropValues, { query: string }> {
    private timer: any;

    constructor(props: any) {
        super(props);

        this.state = {query: ''}

        this.dummy = this.dummy.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.loadStatement = this.loadStatement.bind(this);
        this.createNewStatement = this.createNewStatement.bind(this);
    }

    private dummy(query: string) {
    }

    private handleLoadStatements() {
        this.props.initStatementSearchAction();
        this.props.loadStatementSearchResults(this.state.query);
    }

    private updateQuery(event: any) {
        this.setState({query: event});

        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            this.handleLoadStatements();
            this.timer = null;
        }, 1000)
    }

    private createNewStatement() {
        this.props.createNewStatement(this.state.query);
    }

    private loadStatement(event: FoundStatement[]) {
        if (event && event.length && event.length === 1) {
            this.props.loadSubgraph(event[0].id);
        }
    }

    render() {
        const filterBy = () => true;
        return (
            <div>
                <InputGroup className="mb-3" size="sm">
                    <AsyncTypeahead
                        emptyLabel="Nothing catches the eye. Add a new statement to kickstart a discussion!"
                        id="search-statements-typeahead"
                        size="small"
                        isLoading={this.props.loading}
                        onSearch={this.dummy}
                        options={this.props.options}
                        filterBy={filterBy}
                        onInputChange={this.updateQuery}
                        onChange={this.loadStatement}
                        renderMenuItemChildren={(option: FoundStatement) => (
                            <React.Fragment>{option.label}</React.Fragment>
                        )}>
                    </AsyncTypeahead>
                    <InputGroup.Append>
                        <Button variant="secondary" onClick={this.createNewStatement}>New</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        )
    }
}

export default connect(mapStateToProps, dispatchers)(StatementFinderCreator);
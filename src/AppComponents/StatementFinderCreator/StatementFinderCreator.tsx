import React from "react";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {Button, InputGroup} from "react-bootstrap";
import {LoadingStatus} from "../../AppState/LoadingStatus";
import {FoundStatement} from "../../AppState/FoundStatement";
import {ActiveHiveState} from "../../AppState/State";
import {Subscription} from "rxjs";

class InternalState {
    public query: string = '';
    public loadingStatus: LoadingStatus = LoadingStatus.Ready;
    public foundStatements: FoundStatement[] = [];
}


// The component uses react-bootstrap-typeahead
// https://github.com/ericgio/react-bootstrap-typeahead
class StatementFinderCreator extends React.Component<any, InternalState> {
    private timer: any;
    private foundStatementSub: Subscription = new Subscription();
    private foundStatementsStatusSub: Subscription = new Subscription();

    constructor(props: any) {
        super(props);

        this.state = new InternalState();

        this.dummy = this.dummy.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.loadStatement = this.loadStatement.bind(this);
        this.createNewStatement = this.createNewStatement.bind(this);
    }

    public componentDidMount() {
        this.foundStatementSub = ActiveHiveState.foundStatements.notifier.subscribe((statements) => {
            this.setState({
                foundStatements: statements
            })
        });
        this.foundStatementsStatusSub = ActiveHiveState.foundStatements.status.subscribe((status) => {
            this.setState({
                loadingStatus: status
            })
        });
    }

    public componentWillUnmount() {
        this.foundStatementSub.unsubscribe();
        this.foundStatementsStatusSub.unsubscribe();
    }

    private dummy(query: string) {
    }

    private handleLoadSearchResults() {
        ActiveHiveState.searchStatements(this.state.query);
    }

    private updateQuery(event: any) {
        this.setState({query: event});

        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            this.handleLoadSearchResults();
            this.timer = null;
        }, 1000)
    }

    private createNewStatement() {
        // go to create new statement
    }

    private loadStatement(event: FoundStatement[]) {
        if (event && event.length && event.length === 1) {
            ActiveHiveState.loadSubgraph(event[0].id);
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
                        isLoading={this.state.loadingStatus === LoadingStatus.Pending}
                        onSearch={this.dummy}
                        options={this.state.foundStatements}
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

export default StatementFinderCreator;
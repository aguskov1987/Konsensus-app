import React from "react";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {LoadingStatus} from "../../AppState/LoadingStatus";
import {FoundPoint} from "../../AppState/FoundPoint";
import {Subscription} from "rxjs";
import {History} from "history";
import {withRouter} from "react-router-dom";
import {ActiveHiveState} from "../../AppState/ActiveHiveState";
import {QuantSearchSubcomp} from "./QuantSearchSubcomp";
import 'react-bootstrap-typeahead/css/Typeahead.css';

class InternalState {
    public query: string = '';
    public queryValid: boolean = true;
    public loadingStatus: LoadingStatus = LoadingStatus.Ready;
    public found: FoundPoint[] = [];
}


// The component uses react-bootstrap-typeahead
// https://github.com/ericgio/react-bootstrap-typeahead
class PointSearchComponent extends React.Component<any, InternalState> {
    private timer: any;
    private foundSub: Subscription = new Subscription();
    private foundStatusSub: Subscription = new Subscription();
    private history: History;

    private textSub: Subscription = new Subscription();
    private graphSub: Subscription = new Subscription();

    private quant: QuantSearchSubcomp = new QuantSearchSubcomp();

    constructor(props: any) {
        super(props);

        this.state = new InternalState();
        this.history = this.props.history;

        this.dummy = this.dummy.bind(this);
        this.updateQuery = this.updateQuery.bind(this);
        this.loadPoint = this.loadPoint.bind(this);
    }

    public componentDidMount() {
        this.foundSub = ActiveHiveState.foundPoints.valueUpdatedEvent.subscribe((points) => {
            if (!points) {
                return;
            }

            this.setState({
                found: points
            })
        });
        this.foundStatusSub = ActiveHiveState.foundPoints.statusUpdatedEvent.subscribe((status) => {
            if (!status) {
                return;
            }

            this.setState({
                loadingStatus: status
            })
        });
    }

    private dummy(query: string) {
    }

    private handleLoadSearchResults() {
        ActiveHiveState.searchPoints(this.state.query);
    }

    public componentWillUnmount() {
        this.foundSub.unsubscribe();
        this.foundStatusSub.unsubscribe();
        this.textSub.unsubscribe();
        this.graphSub.unsubscribe();
    }

    render() {
        const filterBy = () => true;
        return (
            <AsyncTypeahead
                emptyLabel="No Results"
                id="search-point-typeahead"
                size="small" isInvalid={!this.state.queryValid} isValid={this.state.queryValid}
                isLoading={this.state.loadingStatus === LoadingStatus.Pending}
                onSearch={this.dummy}
                options={this.state.found}
                filterBy={filterBy}
                onInputChange={this.updateQuery}
                onChange={this.loadPoint}
                renderMenuItemChildren={(option: FoundPoint) => (
                    <React.Fragment>{option.label}</React.Fragment>
                )}>
            </AsyncTypeahead>
        )
    }

    private updateQuery(event: any) {
        this.setState({query: event});

        clearTimeout(this.timer);

        this.timer = setTimeout(() => {
            this.handleLoadSearchResults();
            this.timer = null;
        }, 1000)
    }

    private loadPoint(event: FoundPoint[]) {
        if (event && event.length && event.length === 1) {
            ActiveHiveState.loadSubgraph(event[0].id);
        }
    }
}

export default withRouter(PointSearchComponent);

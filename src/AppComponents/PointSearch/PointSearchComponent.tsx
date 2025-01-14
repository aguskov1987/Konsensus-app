import React from "react";
import {AsyncTypeahead} from "react-bootstrap-typeahead";
import {LoadingStatus} from "../../AppState/LoadingStatus";
import {FoundPoint} from "../../AppState/FoundPoint";
import {Subscription} from "rxjs";
import {History} from "history";
import {withRouter} from "react-router-dom";
import {ActiveHiveState} from "../../AppState/ActiveHiveState";
import FoundPointComponent from "./FoundPointComponent";
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

    private quant: QuantSearchSubcomp = new QuantSearchSubcomp(); // quantitative queries subcomp
    private quantQuery: boolean = false;

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
        if (this.quant.isQuantQuery(this.state.query)) {
            let result = this.quant.getOptions(this.state.query);
            this.setState({
                found: result.options,
                queryValid: result.queryValid
            });
            this.quantQuery = true;
        } else {
            this.quantQuery = false;
            ActiveHiveState.searchPoints(this.state.query, false);
        }
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
                    <FoundPointComponent point={option}/>
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
        }, 500)
    }

    private loadPoint(event: FoundPoint[]) {
        console.log(this.quantQuery, this.state.queryValid);
        if (this.quantQuery && this.state.queryValid) {
            if (this.quant.isQueryComplete(this.state.query)) {
                // send off the quantitative query
                ActiveHiveState.searchPoints(this.state.query, true);
            } else if (event.length > 0) {
                this.setState({
                    query: event[0].label
                });
                this.handleLoadSearchResults();
            }
        } else {
            if (event && event.length && event.length === 1) {
                ActiveHiveState.loadSubgraph(event[0].id);
            }
        }
    }
}

export default withRouter(PointSearchComponent);

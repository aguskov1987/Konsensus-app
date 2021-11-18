import React from "react";
import {Card} from "react-bootstrap";
import HiveCardComponent from "../HiveCard/HiveCardComponent";
import {History} from "history";
import {withRouter} from "react-router-dom";
import TitleBarComponent from "../TitleBar/TitleBarComponent";
import HiveSearchComponent from "./HiveSearchComponent";
import HiveSortingWidget from "../Widgets/HiveSortingWidget/HiveSortingWidget";
import PaginationWidget from "../Widgets/PaginationWidget/PaginationWidget";
import './HiveYardStyle.scss'
import {Subscription} from "rxjs";
import {YardState} from "../../AppState/YardState";
import {HiveSorting} from "../../AppState/HiveSorting";
import {HiveOrder} from "../../AppState/HiveOrder";

class HiveYardComponent extends React.Component<any, any> {
    private history: History;
    private hivesSub: Subscription = new Subscription();
    private pageSub: Subscription = new Subscription();
    private querySub: Subscription = new Subscription();
    private sortSub: Subscription = new Subscription();
    private initLoad: boolean = true;
    private hivesPerPage: number = 5;

    constructor(props: any) {
        super(props);

        this.history = this.props.history;
        this.state = {hives: [], disableSort: false};
    }

    componentDidMount() {
        this.hivesSub = YardState.hives.valueUpdatedEvent.subscribe((set) => {
            if (set == null || set.hives == null || this.initLoad) {
                return;
            }

            this.setState({
                hives: set.hives
            })
        });

        this.pageSub = YardState.currentPage.optionUpdatedEvent.subscribe((page) => {
            if (page == null || this.initLoad) {
                return;
            }
            YardState.loadYard({
                query: YardState.hivesSearchQuery.getOption(),
                page: page,
                hivesPerPage: this.hivesPerPage,
                sort: YardState.hiveSorting.getOption(),
                order: HiveOrder.Desc
            });
        });

        this.sortSub = YardState.hiveSorting.optionUpdatedEvent.subscribe((sort) => {
            if (sort == null || this.initLoad) {
                return;
            }
            YardState.loadYard({
                query: YardState.hivesSearchQuery.getOption(),
                page: YardState.currentPage.getOption(),
                hivesPerPage: this.hivesPerPage,
                sort: sort,
                order: HiveOrder.Desc
            });
        });

        this.querySub = YardState.hivesSearchQuery.optionUpdatedEvent.subscribe((query) => {
            if (query == null || this.initLoad) {
                return;
            }

            YardState.loadYard({
                query: query,
                page: YardState.currentPage.getOption(),
                hivesPerPage: this.hivesPerPage,
                sort: YardState.hiveSorting.getOption(),
                order: HiveOrder.Desc
            });

            if (query !== '') {
                this.setState({
                    disableSort: true
                });
            } else {
                this.setState({
                    disableSort: false
                });
            }

            console.log(this.state);
        });

        YardState.loadYard({
            query: '',
            page: 1,
            hivesPerPage: this.hivesPerPage,
            sort: HiveSorting.ByActivity,
            order: HiveOrder.Desc
        });
        this.initLoad = false;
    }

    componentWillUnmount() {
        this.hivesSub.unsubscribe();
        this.pageSub.unsubscribe();
        this.querySub.unsubscribe();
        this.sortSub.unsubscribe();
    }

    render() {
        return (
            <div style={{padding: 20, height: '100%', position: 'relative'}}>
                <TitleBarComponent title='Yard' icon='Images/Navigation/YardIcon.svg'/>
                <HiveSearchComponent/>

                <Card border="primary" bg="light" style={{height: '86%'}}>
                    <div className='hive-yard-header'>
                        <div className='hive-sort-container'>
                            <HiveSortingWidget disabled={this.state.disableSort}/>
                        </div>
                        <div className='hive-paging-container'>
                            <PaginationWidget/>
                        </div>
                    </div>
                    <Card.Body style={{overflowY: 'auto'}}>
                        {this.state.hives.map((manifest, idx) => {
                            return (
                                <div style={{width: '100%', height: 250, marginBottom: 70}}>
                                    <HiveCardComponent key={'hyc' + idx} manifest={manifest}/>
                                </div>
                            )
                        })}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default withRouter(HiveYardComponent);

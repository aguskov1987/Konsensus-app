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
    private hivesPerPage: number = 10;

    constructor(props: any) {
        super(props);

        this.history = this.props.history;
        this.state = {hives: []};
    }

    componentDidMount() {
        this.hivesSub = YardState.hives.valueUpdatedEvent.subscribe((set) => {
            if (set == null || set.hives == null) {
                return;
            }
            console.log(set);
            this.setState({
                hives: set.hives
            })
        });

        YardState.loadYard({
            query: '',
            page: 1,
            hivesPerPage: this.hivesPerPage,
            sort: HiveSorting.ByActivity,
            order: HiveOrder.Asc
        });
    }

    componentWillUnmount() {
        this.hivesSub.unsubscribe();
    }

    render() {
        return (
            <div style={{padding: 20, height: '100%', position: 'relative'}}>
                <TitleBarComponent title='Yard' icon='Images/Navigation/YardIcon.svg'/>
                <HiveSearchComponent/>

                <Card border="primary" bg="light" style={{height: '86%'}}>
                    <div className='hive-yard-header'>
                        <div className='hive-sort-container'>
                            <HiveSortingWidget/>
                        </div>
                        <div className='hive-paging-container'>
                            <PaginationWidget/>
                        </div>
                    </div>
                    <Card.Body style={{overflowY: 'auto'}}>
                        {this.state.hives.map((manifest, idx) => {
                            return (
                                <div style={{width: '100%', height: 250, marginBottom: 20}}>
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

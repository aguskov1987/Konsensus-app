import React from "react";
import './HiveCardStyle.scss'
import HiveImageWidget from "../Widgets/HiveImageWidget/HiveImageWidget";
import HiveActivityWidget from "../Widgets/HiveActivityWidget/HiveActivityWidget";
import {HiveManifest} from "../../AppState/HiveManifest";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {History} from "history";
import {YardState} from "../../AppState/YardState";
import {ActiveHiveState} from "../../AppState/ActiveHiveState";
import dateformat from 'dateformat';

interface HiveCardProps {
    manifest: HiveManifest
}

// TODO: added stats into the footer
class HiveCardComponent extends React.Component<HiveCardProps & RouteComponentProps, any> {
    private history: History;

    constructor(props: HiveCardProps & RouteComponentProps) {
        super(props);
        this.history = this.props.history;
        this.goToHive = this.goToHive.bind(this);
    }
    render() {
        return (
            <div className='hive-card-container'>
                <div className='hive-card-picture' tabIndex={0} onClick={this.goToHive}>
                    <HiveImageWidget pointCount={this.props.manifest.totalPoints}/>
                </div>
                <div className='hive-card-name'>
                    {this.props.manifest.title}
                </div>
                <div className='hive-card-date'>
                    {dateformat(this.props.manifest.dateCreated, "mmmm dS, yyyy")}
                </div>
                <div className='hive-card-description'>
                    {this.props.manifest.description}
                </div>
                <div className='hive-card-activity'>
                    <HiveActivityWidget dataPoints={[this.props.manifest.pointCount, this.props.manifest.participationCount]}/>
                </div>
            </div>
        )
    }

    private goToHive(event: any) {
        let sub = ActiveHiveState.activeHiveManifest.valueUpdatedEvent.subscribe((hive) => {
            sub.unsubscribe();
            this.history.push('/');
        });
        YardState.loadHive(this.props.manifest.id);

        event.preventDefault();
    }
}

export default withRouter(HiveCardComponent);
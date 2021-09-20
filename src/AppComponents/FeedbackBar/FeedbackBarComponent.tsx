import React from "react";
import {Keyframes} from "react-spring/renderprops";
import {Subscription} from "rxjs";
import {ActiveHiveState} from "../../AppState/ActiveHiveState";
import {LoadingStatus} from "../../AppState/LoadingStatus";
import {StatefulObject} from "../../AppState/StatefulObject";

const Blinker: any = Keyframes.Spring({
    blinkSuccess: [
        {backgroundColor: '#006622'},
        {backgroundColor: '#66ac20'},
        {backgroundColor: '#006622'},
        {backgroundColor: '#66ac20'},
        {backgroundColor: '#006622'}
    ],
    blinkError: [
        {backgroundColor: '#661400'},
        {backgroundColor: '#c85050'},
        {backgroundColor: '#661400'},
        {backgroundColor: '#c85050'},
        {backgroundColor: '#661400'},
        {backgroundColor: '#c85050'},
        {backgroundColor: '#661400'}
    ],
    blinkLoading: [
        {backgroundColor: '#9b5d00'},
        {backgroundColor: '#ffc363'},
        {backgroundColor: '#9b5d00'},
    ]
});

class FeedbackBarComponent extends React.Component<any, any> {
    private subs: Subscription[] = [];

    constructor(props: any) {
        super(props);

        this.state = {
            action: 'blinkSuccess'
        }
    }

    componentDidMount() {
        this.subs.push(
            ActiveHiveState.subgraph.statusUpdatedEvent.subscribe((status) => {
                this.activateBlinker(status, ActiveHiveState.subgraph);
            })
        );
        this.subs.push(
            ActiveHiveState.activeHiveManifest.statusUpdatedEvent.subscribe((status) => {
                this.activateBlinker(status, ActiveHiveState.activeHiveManifest);
            })
        );
        this.subs.push(
            ActiveHiveState.lastAddedItem.statusUpdatedEvent.subscribe((status) => {
                this.activateBlinker(status, ActiveHiveState.lastAddedItem);
            })
        );
        this.subs.push(
            ActiveHiveState.foundPoints.statusUpdatedEvent.subscribe((status) => {
                this.activateBlinker(status, ActiveHiveState.foundPoints);
            })
        );
        this.subs.push(
            ActiveHiveState.newPoint.statusUpdatedEvent.subscribe((status) => {
                this.activateBlinker(status, ActiveHiveState.newPoint);
            })
        );
    }

    componentWillUnmount() {
        for(let sub of this.subs) {
            sub.unsubscribe();
        }
        this.subs = [];
    }

    render() {
        return (
            <Blinker state={this.state.action} config={{duration: 150}}>
                {(props: any) => (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: props.backgroundColor,

                    }}>.</div>
                )}
            </Blinker>
        )
    }

    private activateBlinker(status: LoadingStatus, target: StatefulObject<any>) {
        if (status === LoadingStatus.Pending) {
            this.setStateToPending();
        } else if (status === LoadingStatus.Error) {
            this.setStateToFail();
            this.displayError(target.error);
        } else {
            this.setStateToSuccess();
        }
    }

    private setStateToSuccess() {
        this.setState({
            action: 'blinkSuccess'
        });
    }

    private setStateToPending() {
        this.setState({
            action: 'blinkLoading'
        });
    }

    private setStateToFail() {
        this.setState({
            action: 'blinkError'
        });
    }

    private displayError(error: string) {
        console.log(error);
    }
}

export default FeedbackBarComponent;

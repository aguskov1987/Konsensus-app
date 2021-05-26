import React from "react";
import StatementFinderCreator from "../StatementFinderCreator/StatementFinderCreator";
import GraphCanvas from "../GraphCanvas/GraphCanvas";
import {withRouter} from "react-router-dom";
import {History} from 'history'
import {ActiveHiveState, UserState} from "../../AppState/State";
import {Subscription} from "rxjs";
import {UserService} from "../../Services/UserService";
import {User} from "../../AppState/User";
import {LoadingStatus} from "../../AppState/LoadingStatus";
import {HiveManifest} from "../../AppState/HiveManifest";


class HiveGraph extends React.Component<any, any> {
    private history: History;
    private statusSub: Subscription = new Subscription();
    private userSub: Subscription = new Subscription();
    private hiveSub: Subscription = new Subscription();

    constructor(props: any) {
        super(props);
        this.history = props.history;

        this.state = {
            userLoadingStatus: LoadingStatus.Ready,
            user: new User(),
            activeHiveName: ''
        }
    }

    componentDidMount() {
        this.statusSub = UserState.user.status.subscribe((status) => {
            this.setState({
                userLoadingStatus: status
            })
        })

        this.userSub = UserState.user.notifier.subscribe((user: User) => {
            this.setState({
                user: user
            });
            if (!user.defaultHiveId) {
                this.history.push("/yard");
            } else {
                ActiveHiveState.loadDefaultHive(user.defaultHiveId);
            }
        });

        this.hiveSub = ActiveHiveState.activeHiveManifest.notifier.subscribe((manifest: HiveManifest) => {
            this.setState({
                activeHiveName: manifest.title
            })
        })

        if (!UserService.isJwtValid()) {
            this.history.push("/enter");
        } else {
            UserState.loadUser();
        }
    }

    componentWillUnmount() {
        this.statusSub.unsubscribe();
        this.userSub.unsubscribe();
        this.hiveSub.unsubscribe();
    }

    render() {
        return (
            <div style={{width: '100%', height: '100%'}}>
                <div style={{height: 50, backgroundColor: '#353535'}}>
                    <div style={{width: '50%', float: 'left', color: 'white', marginTop: 10, marginLeft: 10}}>
                        {this.state.activeHiveName}
                    </div>
                    <div style={{width: 'calc(50% - 10px)', float: 'left', marginTop: 7}}>
                        <StatementFinderCreator/>
                    </div>
                </div>
                <GraphCanvas/>
            </div>
        )
    }
}

export default withRouter(HiveGraph);